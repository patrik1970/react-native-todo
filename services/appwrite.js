import { Client, Databases, Account } from 'react-native-appwrite';
import { Platform } from 'react-native';

const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT, // Your Appwrite Endpoint
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID, // Your project ID
  db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID, // Your database ID
  col: { notes: process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID }, // Your collection ID
};

const client = new Client()
  .setEndpoint(config.endpoint) // Your API Endpoint
  .setProject(config.projectId); // Your project ID

switch (Platform.OS) {
  case 'ios':
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID); // Your iOS platform
    break;
  case 'android':
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME); // Your Android platform
    break;
}  

const database = new Databases(client);
const account = new Account(client);

export { client, database, config, account };
