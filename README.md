# Public Engagement Portal

A comprehensive community engagement platform built with React, TypeScript, and Firebase, following Domain-Driven Design (DDD) principles.

**Live Demo:** [https://public-engagement-portal.netlify.app/](https://public-engagement-portal.netlify.app/)

## Team

- Antonio Fuller
- Nicholas McKay
- Rodger McKenzie

## Core Features

For detailed implementation guides, see our [Features Documentation](docs/features.md).

### Public Features
- Modern, responsive landing page
- Firebase Authentication ([setup guide](docs/firebase-setup.md))
- Protected routes with middleware

### Dashboard
- Interactive data visualization
- Monthly trend analysis
- Submissions tracking
- Data export capabilities

### Data Collection
- Public engagement form submissions
- File upload support
- Real-time validation
- Progress tracking

### User Management
- User profiles
- Authentication state management
- Role-based access control

## Tech Stack

For detailed Firebase configuration, see our [Firebase Infrastructure Guide](docs/firebase-setup.md).

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **State Management**: Custom stores
- **Data Visualization**: Charts and analytics
- **Form Handling**: Custom form components ([see component library](docs/component-library.md))
- **Routing**: React Router DOM
- **Code Quality**: ESLint + Prettier

## Project Structure

For complete development guidelines and patterns, see our [Development Guide](docs/development.md).

Following Domain-Driven Design (DDD) principles:

```
src/
├── features/           # Feature-based modules
│   ├── auth/          # Authentication
│   ├── dashboard/     # Analytics dashboard
│   ├── data-collection/ # Data collection forms
│   ├── landingPage/   # Public landing page
│   └── profile/       # User profile management
├── infrastructure/    # External service integration
│   ├── api/          # API client setup
│   └── firebase/     # Firebase configuration
├── shared/           # Shared components
│   ├── components/   # Reusable UI components
│   └── styles/       # Global styles
├── lib/             # Utility functions
└── middleware/      # Route protection
```

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Configure Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication, Firestore, and Storage
   - Get your Firebase configuration
   - See our [Firebase Setup Guide](docs/firebase-setup.md) for detailed instructions

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```
Access the application at `http://localhost:5173`

## Development

See our comprehensive [Development Guide](docs/development.md) for best practices and workflows.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
```

### Documentation

Comprehensive documentation is available in the `/docs` directory:
- [Component Library](docs/component-library.md) - UI components and usage
- [Firebase Setup](docs/firebase-setup.md) - Authentication and database setup
- [Features Guide](docs/features.md) - Feature implementations and architecture
- [Development Guidelines](docs/development.md) - Best practices and workflows

## Best Practices

See our [Development Guide](docs/development.md) for detailed best practices. Key points:
- Follow the established project structure
- Use TypeScript for type safety
- Implement proper error handling
- Write unit tests for critical paths
- Follow accessibility guidelines
- Use proper Git workflow
- Document new features and changes

## Contributing

1. Create a feature branch
2. Implement changes following our [development guidelines](docs/development.md)
3. Run tests and linting
4. Submit pull request
5. Request code review

## License

This project is private and confidential.
