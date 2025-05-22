import React, { useState, useEffect } from 'react';
import { Logo } from '../types';
import { CloseIcon, LinkIcon, ClipboardDocumentIcon, EnvelopeIcon } from '../constants';
import Button from './ui/Button';
import TextField from './ui/TextField';

interface ShareOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  logo: Logo | null;
}

const ShareOptionsModal: React.FC<ShareOptionsModalProps> = ({ isOpen, onClose, logo }) => {
  const [showContent, setShowContent] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [email, setEmail] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setShowContent(true));
      if (logo) {
        setShareLink(`${window.location.origin}/share/logo/${logo.id}`); // Example share link
      }
    } else {
      setShowContent(false);
      setLinkCopied(false); // Reset copied status on close
    }
  }, [isOpen, logo]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleCopyLink = async () => {
    if (!navigator.clipboard) {
      // Fallback for older browsers or insecure contexts
      console.warn('Clipboard API not available.');
      alert('Could not copy link. Please copy it manually.');
      return;
    }
    try {
      await navigator.clipboard.writeText(shareLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy link: ', err);
      alert('Failed to copy link.');
    }
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Invite sent to ${email} for logo ${logo?.name}`);
    // Placeholder for actual email sending logic
    setEmail(''); // Clear email field
    alert(`Invite sent to ${email} (simulated).`);
  };

  if (!isOpen && !showContent) return null;
  if (!logo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-options-modal-title"
      className={`fixed inset-0 z-[60] flex items-center justify-center transition-opacity duration-300 ease-in-out ${isOpen && showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/70" />

      <div
        className={`bg-surface-container rounded-lg shadow-xl w-full max-w-md m-4 transform transition-all duration-300 ease-in-out
                    ${isOpen && showContent ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-outline">
          <h2 id="share-options-modal-title" className="text-lg font-semibold text-surface-contrast">
            Share '{logo.name}'
          </h2>
          <Button
            variant="tertiary"
            size="sm"
            onClick={onClose}
            className="!p-1.5 !rounded-full hover:bg-surface-container-low"
            aria-label="Close share options"
          >
            <CloseIcon className="w-5 h-5 text-gray-600" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Copy Link Section */}
          <section>
            <h3 className="text-sm font-medium text-surface-contrast mb-1 flex items-center">
              <LinkIcon className="w-4 h-4 mr-2 text-gray-500" />
              Copy Link
            </h3>
            <p className="text-xs text-gray-500 mb-2">Anyone with this link can view the logo.</p>
            <div className="flex items-center space-x-2">
              <TextField
                id="shareableLink"
                value={shareLink}
                readOnly
                className="bg-surface-variant border-outline text-sm"
              />
              <Button
                variant="tertiary"
                onClick={handleCopyLink}
                leftIcon={<ClipboardDocumentIcon className="w-4 h-4" />}
                size="md"
                className="flex-shrink-0 !rounded-md"
              >
                {linkCopied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </section>

          {/* Invite by Email Section */}
          <section>
            <h3 className="text-sm font-medium text-surface-contrast mb-1 flex items-center">
              <EnvelopeIcon className="w-4 h-4 mr-2 text-gray-500" />
              Invite by Email
            </h3>
            <p className="text-xs text-gray-500 mb-2">Invite specific people to view or collaborate.</p>
            <form onSubmit={handleSendInvite} className="space-y-3">
              <TextField
                id="inviteEmail"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-sm"
              />
              <Button 
                type="submit" 
                variant="primary" 
                className="w-full sm:w-auto !rounded-md"
                disabled={!email.trim()}
              >
                Send Invite
              </Button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShareOptionsModal;
