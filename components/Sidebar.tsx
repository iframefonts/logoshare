import React from 'react';
import { NAV_ITEMS } from '../constants';
// Button component is not used here anymore, it was an example.
// import Button from './ui/Button';

interface SidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem }) => {
  return (
    <aside className="w-60 bg-surface-container border-r border-outline flex flex-col justify-between">
      <div>
        <nav className="p-4">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item} className="mb-1">
                <button
                  onClick={() => setActiveItem(item)}
                  className={`
                    w-full text-left px-3 py-2 rounded-md text-sm font-medium
                    transition-colors duration-150
                    ${
                      activeItem === item
                        ? 'bg-primary-light/20 text-primary font-semibold' // Make active item slightly bolder
                        : 'text-surface-contrast hover:bg-primary-light/10 hover:text-primary'
                    }
                  `}
                  aria-current={activeItem === item ? 'page' : undefined}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="p-4 mt-auto">
        <div className="bg-surface-variant p-4 rounded-lg">
          <h3 className="text-md font-semibold text-surface-contrast mb-1">Plan</h3>
          <p className="text-xs text-gray-600">Your current plan details here. Upgrade for more features.</p>
          {/* Example: <Button variant="tertiary" size="sm" className="w-full mt-2">View Plans</Button> */}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;