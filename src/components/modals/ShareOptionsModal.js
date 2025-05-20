import { Copy, Download, Facebook, Save, Share2, Twitter, X } from "lucide-react";
import { useState } from "react";

export default function ShareOptionsModal({
  isOpen,
  onClose,
  onShareToPlatform,
  onDownload,
  onCopyToClipboard,
  meme
}) {
  const [isSharing, setIsSharing] = useState(false);
  
  if (!isOpen || !meme) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const copyLink = () => {
    if (navigator.clipboard && meme.url) {
      navigator.clipboard.writeText(meme.url)
        .then(() => {
          const toast = document.createElement("div");
          toast.className = "fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg transition-opacity";
          toast.textContent = "Link copied to clipboard!";
          document.body.appendChild(toast);
          
          setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => document.body.removeChild(toast), 300);
          }, 2000);
        })
        .catch(() => alert("Failed to copy URL"));
      onClose();
    }
  };

  const shareVideo = async (platform) => {
    try {
      setIsSharing(true);
      
      if (!meme.url) {
        throw new Error("No video available to share");
      }

      // Fetch the video as a blob
      const response = await fetch(meme.url);
      const blob = await response.blob();
      
      // Create a file from the blob
      const file = new File([blob], `${meme.id || 'meme'}.mp4`, { type: blob.type });

      if (navigator.share && platform === 'native') {
        // Use native share API if available
        await navigator.share({
          title: meme.title || 'Check out this video meme!',
          files: [file],
        });
        onClose();
        return;
      }

      // For specific platforms, we'll need to use their sharing URLs
      switch (platform) {
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(meme.url)}`, '_blank');
          break;
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=Check%20out%20this%20video%20meme!&url=${encodeURIComponent(meme.url)}`, '_blank');
          break;
        case 'whatsapp':
          window.open(`https://wa.me/?text=Check%20out%20this%20video%20meme!%20${encodeURIComponent(meme.url)}`, '_blank');
          break;
        case 'telegram':
          window.open(`https://t.me/share/url?url=${encodeURIComponent(meme.url)}&text=Check%20out%20this%20video%20meme!`, '_blank');
          break;
        default:
          // Try native sharing as fallback
          if (navigator.share) {
            await navigator.share({
              title: meme.title || 'Check out this video meme!',
              url: meme.url
            });
          } else {
            throw new Error('No sharing method available');
          }
      }
      onClose();
    } catch (error) {
      console.error('Error sharing:', error);
      alert(`Failed to share: ${error.message}`);
    } finally {
      setIsSharing(false);
    }
  };

  // Check if device supports native sharing
  const supportsNativeShare = navigator.share !== undefined;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm transition-opacity duration-200"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-200 scale-100">
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Share Video Meme</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-5">
          {/* Preview section */}
          <div className="mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-3 flex justify-center">
            <div className="relative w-full bg-gray-200 dark:bg-gray-600 rounded overflow-hidden">
              {meme.url ? (
                <video 
                  src={meme.url}
                  poster={meme.thumbnailUrl || "/api/placeholder/400/320"}
                  controls
                  className="w-full max-h-48 object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-40">
                  <span className="text-gray-500 dark:text-gray-400">Preview not available</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Native share option (if available) */}
          {supportsNativeShare && (
            <div className="mb-6">
              <button
                onClick={() => shareVideo('native')}
                disabled={isSharing}
                className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 transition-colors duration-150 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Share2 size={18} className="mr-2" />
                <span>{isSharing ? 'Sharing...' : 'Share Video'}</span>
              </button>
            </div>
          )}
          
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Share to</h3>
          
          {/* Social media sharing options */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <button
              onClick={() => shareVideo('facebook')}
              disabled={isSharing}
              className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg p-3 transition-colors duration-150 disabled:opacity-50"
              aria-label="Share to Facebook"
            >
              <Facebook size={20} />
              <span className="text-xs mt-1">Facebook</span>
            </button>
            
            <button
              onClick={() => shareVideo('twitter')}
              disabled={isSharing}
              className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-400 dark:text-blue-300 rounded-lg p-3 transition-colors duration-150 disabled:opacity-50"
              aria-label="Share to Twitter"
            >
              <Twitter size={20} />
              <span className="text-xs mt-1">Twitter</span>
            </button>
            
            <button
              onClick={() => shareVideo('whatsapp')}
              disabled={isSharing}
              className="flex flex-col items-center justify-center bg-green-50 hover:bg-green-100 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-500 dark:text-green-400 rounded-lg p-3 transition-colors duration-150 disabled:opacity-50"
              aria-label="Share to WhatsApp"
            >
              <Share2 size={20} />
              <span className="text-xs mt-1">WhatsApp</span>
            </button>
            
            <button
              onClick={() => shareVideo('telegram')}
              disabled={isSharing}
              className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-500 dark:text-blue-400 rounded-lg p-3 transition-colors duration-150 disabled:opacity-50"
              aria-label="Share to Telegram"
            >
              <Share2 size={20} />
              <span className="text-xs mt-1">Telegram</span>
            </button>
          </div>
          
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Other options</h3>
          
          {/* Download and copy options */}
          <div className="space-y-3">
            <button
              onClick={onDownload}
              disabled={isSharing}
              className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg p-3 transition-colors duration-150 font-medium disabled:opacity-50"
            >
              <Download size={18} className="mr-2" />
              <span>Download Video</span>
            </button>
            
            {navigator.clipboard && navigator.clipboard.write && (
              <button
                onClick={onCopyToClipboard}
                disabled={isSharing}
                className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg p-3 transition-colors duration-150 font-medium disabled:opacity-50"
              >
                <Save size={18} className="mr-2" />
                <span>Copy to Clipboard</span>
              </button>
            )}
            
            <button
              onClick={copyLink}
              disabled={isSharing}
              className="flex items-center justify-center w-full bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-lg p-3 transition-colors duration-150 font-medium disabled:opacity-50"
            >
              <Copy size={18} className="mr-2" />
              <span>Copy Link</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}