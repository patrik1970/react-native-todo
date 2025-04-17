import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import NoteList from "../components/NoteList";
import AddNoteModal from "../components/AddNoteModal";
import noteService from "@/services/noteService";
import { ActivityIndicator } from "react-native-web";
import { use } from "react";

const NoteScreen = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/auth");
    } 
  }, [user, authLoading]);

  // Fetch notes from the database
  useEffect(() => {
    if (user) {
      fetchNotes();  
    }  
  }, [user]);

  const fetchNotes = async () => {
    setLoading(true);
    const response = await noteService.getNotes();
    if (response.error) {
      setError(response.error);
      Alert.alert("Error", response.error);
    } else {
      setNotes(response.data);
      setError(null);
    }
    setLoading(false);  
  }

  // Add New Note
  const addNote = async () => {
    if (newNote.trim() === '') return;
    const response = await noteService.addNote(newNote);
      if (response.error) {
        Alert.alert("Error", response.error);
      } else {
        setNotes([...notes, response.data]);
      }

    setNewNote("");
    setModalVisible(false);
  };

  // Delete Note
  const deleteNote = async (id) => {
    if (Platform.OS === 'web') {
      console.log('Web platform detected, deleting note...');
      const response = await noteService.deleteNote(id);
      if (response.error) {
        console.log("Error", response.error);
      } else {
          setNotes(notes.filter(note => note.$id !== id));
          console.log("Note deleted successfully");
      }
    } else {
      Alert.alert( 
        "Delete Note",
        "Are you sure you want to delete this note?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete", style: "destructive",
            onPress: async () => {
              const response = await noteService.deleteNote(id);
              console.log("Delete Note Response:", response);
              if (response.error) {
                Alert.alert("Error", response.error);
              } else {
                setNotes(notes.filter(note => note.$id !== id));
                console.log("Note deleted successfully");
              }
            },
          },
        ]
      );
    }    
  };

  // Edit Note
  const editNote = async (id, newText) => {
    if (!newText.trim()) {
      Alert.alert("Error", "Note text cannot be empty");
      return;
    } 
    const response = await noteService.updateNote(id, newText);
    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setNotes((prevNotes) => prevNotes.map((note) => note.$id === id ? { ...note, text: response.data.text } : note));
    }
  };
  
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{ error }</Text>}
          <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote}/>
        </>
      ) }

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>

      {/* Modal for adding a new note */}
      <AddNoteModal 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        newNote={newNote} 
        setNewNote={setNewNote} 
        addNote={addNote}
      /> 
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
});

export default NoteScreen;