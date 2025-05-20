import { Download, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import ShareOptionsModal from './modals/ShareOptionsModal'; // Make sure this path is correct

export default function VideoMemeGallery({ onShareMeme }) {
  const [videoMemes, setVideoMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleShareClick = (meme) => {
    setSelectedMeme(meme);
    setIsShareModalOpen(true);
  };

  const handleDownload = (url, filename) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'video-meme.mp4';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const memeFiles = [
          'v1.mp4', 'v2.mp4', 'v3.mp4', 'v4.mp4', 'v5.mp4', 
          'v6.mp4', 'v7.mp4', 'v8.mp4', 'v9.mp4', 'v10.mp4',
          'v11.mp4', 'v12.mp4', 'v13.mp4', 'v14.mp4', 'v15.mp4',
          'v16.mp4', 'v17.mp4', 'v18.mp4', 'v19.mp4', 'v20.mp4',
          'v21.mp4', 'v22.mp4', 'v23.mp4', 'v24.mp4', 'v25.mp4',
          'v26.mp4', 'v27.mp4', 'v28.mp4', 'v29.mp4', 'v30.mp4',
          'v31.mp4', 'v32.mp4', 'v33.mp4', 'v34.mp4', 'v35.mp4',
          'v36.mp4', 'v37.mp4', 'v38.mp4', 'v39.mp4', 'v40.mp4',
          'v41.mp4', 'v42.mp4', 'v43.mp4', 'v44.mp4', 'v45.mp4',
          'v46.mp4', 'v47.mp4', 'v48.mp4', 'v49.mp4', 'v50.mp4',
          'v51.mp4', 'v52.mp4', 'v53.mp4', 'v54.mp4', 'v55.mp4',
          'v56.mp4', 'v57.mp4', 'v58.mp4', 'v59.mp4', 'v60.mp4',
          'v61.mp4', 'v62.mp4', 'v63.mp4', 'v64.mp4', 'v65.mp4',
          'v66.mp4', 'v67.mp4', 'v68.mp4', 'v69.mp4', 'v70.mp4',
          'v71.mp4'
        ];

        // Verify files exist
        const verifiedMemes = await Promise.all(
          memeFiles.map(async (file) => {
            const url = `/memes/${file}`;
            
            try {
              const response = await fetch(url, { method: 'HEAD' });
              if (!response.ok) return null;
              
              return {
                id: file.replace('.mp4', ''),
                title: file.replace('.mp4', '').replace(/VID-|WA/g, ' ').trim(),
                url,
                thumbnailUrl: '/placeholder-thumbnail.jpg'
              };
            } catch (err) {
              console.error(`Error checking file ${url}:`, err);
              return null;
            }
          })
        );

        setVideoMemes(verifiedMemes.filter(meme => meme !== null));
        setLoading(false);
      } catch (err) {
        setError('Failed to load videos');
        setLoading(false);
        console.error('Error loading videos:', err);
      }
    };

    loadVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        <p className="text-xl font-semibold">{error}</p>
        <p className="text-sm mt-2">Check console for details</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">Video Memes</h1>
      
      {videoMemes.length === 0 ? (
        <div className="text-center py-10">
          <p>No videos found in /memes folder</p>
          <p className="text-sm text-gray-500 mt-2">
            Please make sure your video files are in the public/memes directory
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videoMemes.map((meme) => (
            <div key={meme.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-[1.02]">
              <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                <video 
                  src={meme.url}
                  className="w-full h-full object-contain bg-black"
                  controls
                  preload="metadata"
                  poster={meme.thumbnailUrl}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200 line-clamp-1">
                  {meme.title}
                </h3>
                <div className="flex justify-between">
                  <button 
                    onClick={() => handleShareClick(meme)} 
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    aria-label="Share"
                  >
                    <Share2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDownload(meme.url, `${meme.title || 'meme'}.mp4`)}
                    className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                    aria-label="Download"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ShareOptionsModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        meme={selectedMeme}
        onDownload={() => {
          if (selectedMeme) {
            handleDownload(selectedMeme.url, `${selectedMeme.title || 'meme'}.mp4`);
          }
          setIsShareModalOpen(false);
        }}
        onCopyToClipboard={() => {
          if (selectedMeme) {
            navigator.clipboard.writeText(selectedMeme.url)
              .then(() => alert('Video URL copied to clipboard!'))
              .catch(() => alert('Failed to copy URL'));
          }
          setIsShareModalOpen(false);
        }}
      />
    </div>
  );
}