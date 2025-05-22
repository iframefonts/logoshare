





import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LogoGrid from './components/LogoGrid';
import LogoTable from './components/LogoTable';
import AddLogoModal from './components/AddLogoModal';
import LogoPreviewModal from './components/LogoPreviewModal';
import ShareOptionsModal from './components/ShareOptionsModal';
// LoginModal and SignUpModal are removed
import { Logo, NewLogoData } from './types';
import { NAV_ITEMS, SearchIcon, PlusIcon, Bars3Icon, Squares2X2Icon, SAMPLE_LOGOS } from './constants';
import Button from './components/ui/Button';
import TextField from './components/ui/TextField';

// Firebase Auth related imports are removed

type ViewMode = 'grid' | 'list';

const App: React.FC = () => {
  const [allLogos, setAllLogos] = useState<Logo[]>([]);
  const [displayedLogos, setDisplayedLogos] = useState<Logo[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeNavItem, setActiveNavItem] = useState<string>(NAV_ITEMS[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  
  // Auth state removed
  // const [currentUser, setCurrentUser] = useState<User | null>(null);
  // const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  // const [authError, setAuthError] = useState<string | null>(null);

  // Modal states
  const [isAddLogoModalOpen, setIsAddLogoModalOpen] = useState<boolean>(false);
  const [selectedLogoForPreview, setSelectedLogoForPreview] = useState<Logo | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [logoForSharing, setLogoForSharing] = useState<Logo | null>(null);
  const [isShareOptionsModalOpen, setIsShareOptionsModalOpen] = useState<boolean>(false);
  // Login/Signup modal states removed
  // const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  // const [isSignupModalOpen, setIsSignupModalOpen] = useState<boolean>(false);

  // Firebase Auth Listener removed
  
  useEffect(() => {
    // Initialize with sample logos.
    setAllLogos(SAMPLE_LOGOS);
  }, []);

  // Auth Handlers removed

  const handleToggleAddLogoModal = () => {
    // No longer checks for currentUser
    setIsAddLogoModalOpen(prev => !prev);
  };

  const handleOpenPreviewModal = (logoToPreview: Logo | null | undefined) => {
    if (logoToPreview && logoToPreview.id) { 
      setSelectedLogoForPreview(logoToPreview);
      setIsPreviewModalOpen(true);
    } else {
      console.warn("Attempted to open preview modal with invalid or null logo data.");
      setSelectedLogoForPreview(null);
      setIsPreviewModalOpen(false);
    }
  };

  const handleClosePreviewModal = () => {
    setIsPreviewModalOpen(false);
    setTimeout(() => setSelectedLogoForPreview(null), 300); // Delay for modal close animation
  };

  const openShareOptionsModal = (logo: Logo) => {
    if (logo && logo.id) { 
      setLogoForSharing(logo);
      setIsShareOptionsModalOpen(true);
    } else {
      console.warn("Attempted to open share modal with invalid or null logo data.");
    }
  };

  const closeShareOptionsModal = () => {
    setIsShareOptionsModalOpen(false);
    setTimeout(() => setLogoForSharing(null), 300); // Delay for modal close animation
  };

  const handleAddNewLogo = async (newLogoUIData: NewLogoData, status: 'Draft' | 'Published') => {
    // No longer checks for currentUser
    setIsLoading(true); 
    
    const newLogo: Logo = {
      id: `local-${Date.now().toString()}-${Math.random().toString(36).substring(2, 9)}`,
      name: newLogoUIData.name,
      imageUrl: `https://picsum.photos/seed/${Date.now().toString()}/400/300`, 
      fontsUsed: newLogoUIData.fonts.map(f => f.name),
      colors: newLogoUIData.colors.map(c => ({ name: c.name, hex: c.hex_code })),
      style: undefined, // Or handle style input if added to form
      client: newLogoUIData.clientName,
      categoryName: newLogoUIData.categoryName || 'Uncategorized',
      status: status,
      designer: newLogoUIData.designer,
      studio: newLogoUIData.studio,
      licences: newLogoUIData.licencesDetails,
      description: newLogoUIData.description,
      tags: [], // Or handle tags input if added to form
      externalLinks: newLogoUIData.externalLinks || [],
      createdAt: new Date().toISOString(), 
    };

    setAllLogos(prevLogos => [newLogo, ...prevLogos]);
    console.log("New logo added to local state:", newLogo);
    // Simulate backend delay
    await new Promise(resolve => setTimeout(resolve, 500));
    handleToggleAddLogoModal(); 
    setIsLoading(false);
  };

  useEffect(() => {
    let filteredLogos = [...allLogos];
    
    if (activeNavItem === 'Recent') {
        filteredLogos.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA; // Sort descending for recent
        });
    } else if (activeNavItem === 'Trash') {
        filteredLogos = []; 
    } else if (activeNavItem === 'Starred') {
        filteredLogos = allLogos.slice(0, 2); 
    }

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filteredLogos = filteredLogos.filter(logo => 
        logo.name.toLowerCase().includes(lowerSearchTerm) ||
        (logo.client && logo.client.toLowerCase().includes(lowerSearchTerm)) ||
        (logo.categoryName && logo.categoryName.toLowerCase().includes(lowerSearchTerm)) ||
        (logo.tags && logo.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))) ||
        (logo.style && logo.style.toLowerCase().includes(lowerSearchTerm))
      );
    }
    
    setDisplayedLogos(filteredLogos);
  }, [allLogos, searchTerm, activeNavItem]);

  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    const handleScroll = () => {
      if (mainContent) {
        if (mainContent.scrollTop > 200) {
          setShowScrollTop(true);
        } else {
          setShowScrollTop(false);
        }
      }
    };
    mainContent?.addEventListener('scroll', handleScroll);
    return () => mainContent?.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    document.getElementById('main-content')?.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeItem={activeNavItem} setActiveItem={setActiveNavItem} />
        <main id="main-content" className="flex-1 p-6 overflow-y-auto relative bg-surface">
          <div className="mb-6"> {/* Container for all top controls including view toggles */}
            {/* Top row: Title and Search/Add Logo */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Left side: Title and description */}
              <div>
                <h2 className="text-2xl font-semibold text-surface-contrast">{activeNavItem}</h2>
                <p className="text-sm text-gray-500">Manage and view your logos.</p>
              </div>

              {/* Right side: Search and Add Logo Button */}
              <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                {/* Search Bar */}
                <div className="w-full sm:w-64">
                  <TextField
                    id="search"
                    placeholder="Search logos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={<SearchIcon className="w-4 h-4 text-gray-400" />}
                  />
                </div>
                {/* Add Logo Button */}
                <div className="flex-shrink-0">
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={handleToggleAddLogoModal} 
                    leftIcon={<PlusIcon className="w-4 h-4" />}
                    className="flex-shrink-0"
                    aria-label="Add new logo"
                  >
                    Add Logo
                  </Button>
                </div>
              </div>
            </div>

            {/* New Row for View Toggles - below the title/search/add row */}
            <div className="flex justify-start sm:justify-end mt-4">
              <div className="flex items-center gap-1 p-0.5 rounded-md"> {/* Removed bg-surface-variant */}
                <Button 
                    variant={'tertiary'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={`!p-1.5 ${
                      viewMode === 'list' 
                        ? 'bg-primary text-primary-contrast border-primary shadow-sm' 
                        : '!bg-transparent border-transparent text-gray-500 hover:bg-surface-container hover:text-primary'
                    }`}
                    aria-pressed={viewMode === 'list'}
                    aria-label="Switch to list view"
                >
                    <Bars3Icon className="w-4 h-4"/>
                </Button>
                <Button 
                    variant={'tertiary'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={`!p-1.5 ${
                      viewMode === 'grid' 
                        ? 'bg-primary text-primary-contrast border-primary shadow-sm' 
                        : '!bg-transparent border-transparent text-gray-500 hover:bg-surface-container hover:text-primary'
                    }`}
                    aria-pressed={viewMode === 'grid'}
                    aria-label="Switch to grid view"
                >
                    <Squares2X2Icon className="w-4 h-4"/>
                </Button>
              </div>
            </div>
          </div>

          {isLoading && <div className="text-center py-10">Loading logos...</div>}
          {!isLoading && viewMode === 'grid' && (
            <LogoGrid 
              logos={displayedLogos} 
              isLoading={isLoading} 
              onLogoSelect={handleOpenPreviewModal} 
            />
          )}
          {!isLoading && viewMode === 'list' && (
            <LogoTable 
              logos={displayedLogos} 
              isLoading={isLoading} 
              onLogoSelect={handleOpenPreviewModal}
              onShareLogo={openShareOptionsModal}
            />
          )}

          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-primary text-primary-contrast p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2"
              aria-label="Scroll to top"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          )}

          <AddLogoModal 
            isOpen={isAddLogoModalOpen} 
            onClose={handleToggleAddLogoModal} 
            onAddLogo={handleAddNewLogo}
          />

          <LogoPreviewModal
            isOpen={isPreviewModalOpen}
            onClose={handleClosePreviewModal}
            logo={selectedLogoForPreview}
            onOpenShareModal={openShareOptionsModal}
          />
          
          <ShareOptionsModal
            isOpen={isShareOptionsModalOpen}
            onClose={closeShareOptionsModal}
            logo={logoForSharing}
          />
          
        </main>
      </div>
    </div>
  );
};

export default App;