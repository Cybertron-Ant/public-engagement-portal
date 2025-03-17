import { SignInButton, SignOutButton, useAuth } from "@clerk/clerk-react";

export const AuthButton = () => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? (
    <SignOutButton>
      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
        Sign Out
      </button>
    </SignOutButton>
  ) : (
    <SignInButton>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
        Sign In
      </button>
    </SignInButton>
  );
};