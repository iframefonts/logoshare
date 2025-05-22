import React from 'react';
import { APP_TITLE, AppLogoIcon } from '../constants'; // Import AppLogoIcon
// Button component is not used if auth buttons are removed
// import Button from './ui/Button';
// User type import removed as currentUser is removed
// import type { User } from 'firebase/auth'; 

interface HeaderProps {
  // Props related to authentication are removed
  // currentUser: User | null;
  // onLoginClick: () => void;
  // onSignupClick: () => void;
  // onLogoutClick: () => void;
}

const Header: React.FC<HeaderProps> = (/* Removed props */) => {
  return (
    <header className="bg-surface-container sticky top-0 z-30">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-outline">
           <div className="flex items-center">
            <a href="/" aria-label={`${APP_TITLE} - Home`}>
              <AppLogoIcon className="h-7 w-auto text-primary" /> {/* Use h-7 for a bit more padding within h-16 */}
            </a>
          </div>
          <div className="flex items-center space-x-3">
            {/* Authentication buttons are removed */}
            {/* Example:
            {currentUser ? (
              <>
                <span className="text-sm text-gray-600 hidden sm:block">
                  {currentUser.email}
                </span>
                <Button variant="tertiary" size="md" onClick={onLogoutClick}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="tertiary" size="md" onClick={onLoginClick}>
                  Login
                </Button>
                <Button variant="primary" size="md" onClick={onSignupClick}>
                  Sign Up
                </Button>
              </>
            )}
            */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;