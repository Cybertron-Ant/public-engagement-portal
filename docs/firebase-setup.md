# Firebase Setup Guide

## Initial Setup

1. Create a Firebase Project
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Click "Add Project"
   - Enter your project name
   - Enable/disable Google Analytics as needed
   - Click "Create Project"

2. Register Your Web Application
   - In the Firebase Console, click the web icon (`</>`)
   - Register app with a nickname
   - Copy the Firebase configuration object

## Authentication Setup

1. Enable Authentication Methods
   ```bash
   # Navigate to Authentication > Sign-in method
   - Enable Email/Password
   - Configure additional providers as needed (Google, GitHub, etc.)
   ```

2. Configure Authentication in Your App
   ```typescript
   // src/infrastructure/firebase/auth.ts
   import { initializeAuth } from 'firebase/auth';
   import { app } from './index';

   export const auth = initializeAuth(app);
   ```

## Firestore Setup

1. Create Database
   - Go to Firestore Database in Firebase Console
   - Click "Create Database"
   - Choose production/test mode
   - Select database location

2. Security Rules
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Public read access, authenticated write access
       match /{document=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

3. Configure Firestore in Your App
   ```typescript
   // src/infrastructure/firebase/firestore.ts
   import { getFirestore } from 'firebase/firestore';
   import { app } from './index';

   export const db = getFirestore(app);
   ```

## Storage Setup

1. Enable Storage
   - Go to Storage in Firebase Console
   - Click "Get Started"
   - Configure security rules
   - Choose storage location

2. Security Rules
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

3. Configure Storage in Your App
   ```typescript
   // src/infrastructure/firebase/storage.ts
   import { getStorage } from 'firebase/storage';
   import { app } from './index';

   export const storage = getStorage(app);
   ```

## Environment Variables

1. Create `.env` file in project root:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

2. Initialize Firebase
   ```typescript
   // src/infrastructure/firebase/index.ts
   import { initializeApp } from 'firebase/app';

   const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
     appId: import.meta.env.VITE_FIREBASE_APP_ID
   };

   export const app = initializeApp(firebaseConfig);
   ```

## Collection Structure

Configure your Firestore collections structure:

```typescript
// src/infrastructure/firebase/collections.ts
export const collections = {
  users: 'users',
  submissions: 'submissions',
  reports: 'reports'
};
```

## Error Handling

Implement proper error handling for Firebase operations:

```typescript
try {
  // Firebase operation
} catch (error) {
  if (error instanceof FirebaseError) {
    // Handle specific Firebase errors
    switch (error.code) {
      case 'auth/invalid-email':
        // Handle invalid email
        break;
      case 'auth/user-not-found':
        // Handle user not found
        break;
      default:
        // Handle other Firebase errors
    }
  } else {
    // Handle other errors
  }
}
```

## Testing

1. Set up Firebase Emulator for local testing:
   ```bash
   npm install -g firebase-tools
   firebase init emulators
   firebase emulators:start
   ```

2. Configure your app to use emulators in development:
   ```typescript
   if (process.env.NODE_ENV === 'development') {
     connectFirestoreEmulator(db, 'localhost', 8080);
     connectAuthEmulator(auth, 'http://localhost:9099');
     connectStorageEmulator(storage, 'localhost', 9199);
   }
   ```

## Security Best Practices

1. Always use environment variables for Firebase config
2. Implement proper security rules
3. Use Firebase App Check in production
4. Regularly backup Firestore data
5. Monitor Firebase usage and set quotas
6. Implement proper error handling
7. Use Firebase Performance Monitoring

## Deployment

1. Set up Firebase Hosting:
   ```bash
   firebase init hosting
   ```

2. Deploy your application:
   ```bash
   npm run build
   firebase deploy
   ```

For more information, visit the [Firebase Documentation](https://firebase.google.com/docs).
