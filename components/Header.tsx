import React from 'react';
import { APP_TITLE, AppLogoIcon } from '../constants';
import Button from './ui/Button';
import { User } from '@supabase/supabase-js';

interface HeaderProps {
  currentUser: User | null;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogoutClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLoginClick, onSignupClick, onLogoutClick }) => {
  return (
    <header className="bg-surface-container sticky top-0 z-30">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-outline">
           <div className="flex items-center">
            <a href="/" aria-label={`${APP_TITLE} - Home`}>
              <AppLogoIcon className="h-7 w-auto text-primary" />
            </a>
          </div>
          <div className="flex items-center space-x-3">
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;