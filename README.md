# Notes App Documentation

## Overview

The **Notes App** is a React Native application built using the [Expo framework](https://expo.dev). It allows users to create, edit, and delete notes. The app integrates with [Appwrite](https://appwrite.io/) for backend services such as authentication and database management.

## Features

- User authentication (login, registration, and logout).
- Create, edit, and delete notes.
- Persistent storage of notes using Appwrite.
- Responsive design for mobile and web platforms.
- File-based routing using `expo-router`.

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd react-native-todo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a .env file in the root directory and add the following variables:

   ```env
   EXPO_PUBLIC_APPWRITE_ENDPOINT=<Your Appwrite Endpoint>
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=<Your Appwrite Project ID>
   EXPO_PUBLIC_APPWRITE_DB_ID=<Your Appwrite Database ID>
   EXPO_PUBLIC_APPWRITE_COL_NOTES_ID=<Your Appwrite Notes Collection ID>
   ```

4. Start the app:

   ```bash
   npx expo start
   ```

---

## Project Structure

The project follows a modular structure for better maintainability:

```
react-native-todo/
├── app/                     # Main application directory
│   ├── components/          # Reusable components (e.g., NoteList, NoteItem, AddNoteModal)
│   ├── contexts/            # Context providers (e.g., AuthContext)
│   ├── notes/               # Notes-related screens and layouts
│   ├── auth/                # Authentication screens and layouts
│   ├── _layout.jsx          # Root layout for the app
│   ├── index.jsx            # Home screen
├── services/                # Backend services (e.g., Appwrite integration)
├── assets/                  # Static assets (e.g., images)
├── .expo/                   # Expo-specific configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Project dependencies and scripts
├── README.md                # Project documentation
```

---

## Key Components

### 1. **Authentication**
   - **File:** `contexts/AuthContext.js`
   - Handles user authentication using Appwrite's `Account` service.
   - Provides `login`, `register`, and `logout` methods.

### 2. **Notes Management**
   - **File:** `services/noteService.js`
   - Manages CRUD operations for notes using Appwrite's `Databases` service.

### 3. **UI Components**
   - **NoteList:** Displays a list of notes.
   - **NoteItem:** Represents a single note with edit and delete options.
   - **AddNoteModal:** Modal for adding new notes.

---

## Scripts

- **Start the app:**

  ```bash
  npm start
  ```

- **Run tests:**

  ```bash
  npm test
  ```

- **Reset the project:**

  ```bash
  npm run reset-project
  ```

---

## Environment Variables

The app requires the following environment variables to connect to Appwrite:

- `EXPO_PUBLIC_APPWRITE_ENDPOINT`: Appwrite API endpoint.
- `EXPO_PUBLIC_APPWRITE_PROJECT_ID`: Appwrite project ID.
- `EXPO_PUBLIC_APPWRITE_DB_ID`: Appwrite database ID.
- `EXPO_PUBLIC_APPWRITE_COL_NOTES_ID`: Appwrite collection ID for notes.

---

## Deployment

1. Build the app for production:

   ```bash
   eas build --platform <platform>
   ```

2. Submit the app to app stores:

   ```bash
   eas submit --platform <platform>
   ```

---

## Troubleshooting

- **Authentication Issues:**
  Ensure the Appwrite endpoint and project credentials are correctly set in the .env file.

- **Notes Not Loading:**
  Verify that the Appwrite database and collection IDs are correct and that the user has the necessary permissions.

---

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Appwrite Documentation](https://appwrite.io/docs)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)

---

## License

This project is licensed under the MIT License.