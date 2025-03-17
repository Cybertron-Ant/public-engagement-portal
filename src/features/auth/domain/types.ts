import { ReactNode } from 'react';

export interface AuthenticatedUser {
  isSignedIn: boolean;
  isLoaded: boolean;
}

export interface ProtectedRouteProps {
  children: ReactNode;
}