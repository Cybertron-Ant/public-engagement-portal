# Firebase Infrastructure Layer

This directory contains the Firebase infrastructure implementation following DDD principles.

## Services

- `auth.ts`: Authentication service implementation
- `firestore.ts`: Firestore database operations
- `storage.ts`: Cloud Storage operations
- `index.ts`: Firebase initialization and configuration

## Configuration

Firebase configuration is handled through environment variables for security. Required variables:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable required services:
   - Authentication (Email/Password and Google Sign-in)
   - Firestore Database
   - Storage
3. Copy Firebase configuration to your `.env` file
4. Initialize Firebase in your app using the provided services

## Usage

### Authentication
```typescript
import { signIn, signUp, signOut, signInWithGoogle } from './auth'

// Sign in with email
const user = await signIn(email, password)

// Sign up new user
const newUser = await signUp(email, password)

// Sign in with Google
const googleUser = await signInWithGoogle()

// Sign out
await signOut()
```

### Firestore
```typescript
import { getCollection, createDocument, updateDocument, deleteDocument } from './firestore'

// Get collection data
const items = await getCollection('items')

// Create document
await createDocument('items', 'doc-id', { name: 'Item' })

// Update document
await updateDocument('items', 'doc-id', { name: 'Updated Item' })

// Delete document
await deleteDocument('items', 'doc-id')
```

### Storage
```typescript
import { uploadFile, deleteFile, getFileUrl } from './storage'

// Upload file
const { url, path } = await uploadFile('images/photo.jpg', file)

// Get file URL
const url = await getFileUrl('images/photo.jpg')

// Delete file
await deleteFile('images/photo.jpg')
```

## Security Rules

Ensure proper security rules are set up in Firebase Console for:
- Firestore Database
- Storage
- Authentication