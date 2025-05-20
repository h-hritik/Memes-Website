import { useEffect, useState } from "react";

// Import components
import Header from "./Header";
import MemeContent from "./MemeContent";
import ApiSettingsModal from "./modals/ApiSettingsModal";
import MemeDetailModal from "./modals/MemeDetailModal";
import MemeGeneratorModal from "./modals/MemeGeneratorModal";
import ShareOptionsModal from "./modals/ShareOptionsModal";
import Sidebar from "./Sidebar";
import VideoMemeGallery from "./VideoMemeGallery";

function MemeGallery() {
  // API data state
  const [memes, setMemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // UI state
  const [savedMemes, setSavedMemes] = useState(() => {
    const saved = localStorage.getItem('savedMemes');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [folders, setFolders] = useState(() => {
    const saved = localStorage.getItem('memeFolders');
    return saved ? JSON.parse(saved) : [
      { id: "favorites", name: "Favorites", color: "yellow" },
      { id: "funny", name: "Funny", color: "green" },
      { id: "reactions", name: "Reactions", color: "red" },
      { id: "custom", name: "My Custom Memes", color: "purple" }
    ];
  });
  
  // Responsive & Theme states
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showApiSettings, setShowApiSettings] = useState(false);
  
  // Meme generator state
  const [currentMeme, setCurrentMeme] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [showMemeGenerator, setShowMemeGenerator] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  
  // Meme detail state
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [showMemeDetail, setShowMemeDetail] = useState(false);
  const [addToFolderMode, setAddToFolderMode] = useState(false);
  
  // Share state
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Responsive sidebar setup
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    // Set initial state based on window size
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Fetch memes from the API
  useEffect(() => {
    setIsLoading(true);
    fetch('https://api.imgflip.com/get_memes')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch memes');
        return res.json();
      })
      .then(data => {
        if (data.success) {
          setMemes(data.data.memes.map(meme => ({
            ...meme,
            id: meme.id.toString(),
            title: meme.name,
            url: meme.url,
            tags: ['imgflip']
          })));
        } else {
          throw new Error(data.error_message || 'Failed to load memes');
        }
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  // Save to localStorage whenever savedMemes changes
  useEffect(() => {
    localStorage.setItem('savedMemes', JSON.stringify(savedMemes));
  }, [savedMemes]);

  // Save folders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('memeFolders', JSON.stringify(folders));
  }, [folders]);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Get random meme template
  const getRandomMeme = () => {
    if (memes.length > 0) {
      const randomIndex = Math.floor(Math.random() * memes.length);
      setCurrentMeme(memes[randomIndex]);
      setTopText("");
      setBottomText("");
      setSelectedFile(null);
      setFilePreview(null);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Set as current meme
      setCurrentMeme({
        id: `file-${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
        url: URL.createObjectURL(file),
        isCustomFile: true
      });
      setTopText("");
      setBottomText("");
    }
  };

  // Save the generated meme
  const saveMeme = () => {
    if (!currentMeme) return;
    
    const newMeme = {
      id: `custom-${Date.now()}`,
      title: currentMeme.isCustomFile 
        ? currentMeme.title 
        : `${currentMeme.title} - Custom`,
      url: currentMeme.isCustomFile ? filePreview : currentMeme.url,
      originalTemplate: currentMeme.isCustomFile ? null : currentMeme.id,
      topText,
      bottomText,
      createdAt: new Date().toISOString(),
      folder: "custom",
      tags: ["custom", ...(currentMeme.tags || [])]
    };
    
    setSavedMemes(prev => [newMeme, ...prev]);
    setShowMemeGenerator(false);
    setSelectedFile(null);
    setFilePreview(null);
    alert("Meme saved to My Custom Memes folder!");
  };

  // Filter memes based on selected folder and search term
  const getFilteredMemes = () => {
    let filteredMemes = selectedFolder === "all" 
      ? [...savedMemes, ...memes.filter(m => !savedMemes.some(sm => sm.originalTemplate === m.id))]
      : selectedFolder === "api" 
        ? memes
        : savedMemes.filter(meme => meme.folder === selectedFolder);
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredMemes = filteredMemes.filter(meme => 
        meme.title.toLowerCase().includes(term) || 
        (meme.tags && meme.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }
    
    return filteredMemes;
  };

  // Calculate folder counts
  const getFolderCount = (folderId) => {
    if (folderId === 'all') return savedMemes.length + memes.length;
    if (folderId === 'api') return memes.length;
    return savedMemes.filter(meme => meme.folder === folderId).length;
  };

  // Add meme to folder
  const addMemeToFolder = (folderId) => {
    if (!selectedMeme) return;
    
    const updatedMeme = {
      ...selectedMeme,
      folder: folderId
    };
    
    // If it's already in savedMemes, update it, otherwise add it
    if (savedMemes.some(m => m.id === selectedMeme.id)) {
      setSavedMemes(prev => 
        prev.map(m => m.id === selectedMeme.id ? updatedMeme : m)
      );
    } else {
      // If it's from the API, create a saved version
      const newSavedMeme = {
        ...selectedMeme,
        id: `saved-${Date.now()}-${selectedMeme.id}`,
        folder: folderId,
        savedAt: new Date().toISOString()
      };
      setSavedMemes(prev => [newSavedMeme, ...prev]);
    }
    
    setAddToFolderMode(false);
    setShowMemeDetail(false);
    setSelectedFolder(folderId);
  };

  // Handle meme click
  const handleMemeClick = (meme) => {
    setSelectedMeme(meme);
    setShowMemeDetail(true);
  };

  // Create folder function
  const handleCreateFolder = () => {
    const folderName = prompt('Enter folder name:');
    if (folderName && folderName.trim()) {
      const colors = ['yellow', 'green', 'red', 'purple', 'blue'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      const newFolder = {
        id: `folder-${Date.now()}`,
        name: folderName.trim(),
        color: randomColor
      };
      
      setFolders(prev => [...prev, newFolder]);
    }
  };
  
  // Delete folder function
  const handleDeleteFolder = (folderId) => {
    if (window.confirm('Are you sure you want to delete this folder? Memes will be moved to All Memes.')) {
      setFolders(prev => prev.filter(folder => folder.id !== folderId));
      // Move memes from deleted folder to "all"
      setSavedMemes(prev => prev.map(meme => 
        meme.folder === folderId ? {...meme, folder: 'all'} : meme
      ));
    }
  };

  // Share meme function
  const shareMeme = async () => {
    if (!selectedMeme) return;
    
    try {
      // First try to share as a file if possible
      if (navigator.canShare && navigator.canShare({ files: [] })) {
        // Convert data URL to blob if needed
        let blob;
        if (selectedMeme.url.startsWith('data:')) {
          const response = await fetch(selectedMeme.url);
          blob = await response.blob();
        } else {
          // For external URLs, we need to fetch them first
          const response = await fetch(selectedMeme.url);
          blob = await response.blob();
        }
        
        const file = new File([blob], `${selectedMeme.title}.jpg`, { type: 'image/jpeg' });
        
        await navigator.share({
          title: selectedMeme.title,
          text: 'Check out this meme!',
          files: [file],
        });
      } 
      // Fallback to regular share API
      else if (navigator.share) {
        await navigator.share({
          title: selectedMeme.title,
          text: 'Check out this meme!',
          url: selectedMeme.url,
        });
      } 
      // Final fallback - show share options modal
      else {
        setShowShareOptions(true);
      }
    } catch (err) {
      console.error('Error sharing:', err);
      setShowShareOptions(true);
    }
  };

  // Share to specific platform
  const shareToPlatform = (platform) => {
    let shareUrl = '';
    const encodedUrl = encodeURIComponent(selectedMeme.url);
    const encodedTitle = encodeURIComponent(selectedMeme.title);
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  // Download meme as image
  const downloadMeme = async () => {
    try {
      let blob;
      if (selectedMeme.url.startsWith('data:')) {
        // For data URLs
        const response = await fetch(selectedMeme.url);
        blob = await response.blob();
      } else {
        // For regular URLs
        const response = await fetch(selectedMeme.url);
        blob = await response.blob();
      }
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedMeme.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading meme:', err);
      alert('Failed to download the meme. Please try again.');
    }
  };

  // Copy meme to clipboard
  const copyMemeToClipboard = async () => {
    try {
      let blob;
      if (selectedMeme.url.startsWith('data:')) {
        // For data URLs
        const response = await fetch(selectedMeme.url);
        blob = await response.blob();
      } else {
        // For regular URLs
        const response = await fetch(selectedMeme.url);
        blob = await response.blob();
      }
      
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      alert('Meme copied to clipboard!');
    } catch (err) {
      console.error('Error copying meme:', err);
      alert('Failed to copy the meme. Please try the download option instead.');
    }
  };

  const filteredMemes = getFilteredMemes();

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <Header 
        onCreateMeme={() => {
          setShowMemeGenerator(true);
          getRandomMeme();
        }}
        onShowApiSettings={() => setShowApiSettings(true)}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      
      <div className="flex-1 flex relative">
        <Sidebar 
          folders={folders}
          selectedFolder={selectedFolder}
          onSelectFolder={setSelectedFolder}
          getFolderCount={getFolderCount}
          selectedMeme={selectedMeme}
          onShareMeme={shareMeme}
          onCreateMeme={(type) => {
            setShowMemeGenerator(true);
            getRandomMeme();
          }}
          onCreateFolder={handleCreateFolder}
          onDeleteFolder={handleDeleteFolder}
          darkMode={darkMode}
          videoMemes={[]}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        
        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={toggleSidebar}
          ></div>
        )}
        
        {/* Main content with dynamic margin based on sidebar state */}
        <div className={`flex-1 p-4 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-0 md:ml-72' : 'ml-0 md:ml-16'}`}>
          {selectedFolder === "videos" ? (
            <VideoMemeGallery 
              onShareMeme={(meme) => {
                setSelectedMeme(meme);
                setShowShareOptions(true);
              }}
            />
          ) : (
            <MemeContent 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              isLoading={isLoading}
              error={error}
              filteredMemes={filteredMemes}
              onMemeClick={handleMemeClick}
              selectedMeme={selectedMeme}
              darkMode={darkMode}
            />
          )}
        </div>
      </div>
      
      {/* Modals */}
      <ApiSettingsModal 
        isOpen={showApiSettings}
        onClose={() => setShowApiSettings(false)}
        darkMode={darkMode}
      />
      
      <MemeGeneratorModal 
        isOpen={showMemeGenerator}
        onClose={() => {
          setShowMemeGenerator(false);
          setSelectedFile(null);
          setFilePreview(null);
        }}
        currentMeme={currentMeme}
        filePreview={filePreview}
        topText={topText}
        onTopTextChange={setTopText}
        bottomText={bottomText}
        onBottomTextChange={setBottomText}
        onRandomMeme={getRandomMeme}
        onFileChange={handleFileChange}
        onSaveMeme={saveMeme}
        darkMode={darkMode}
      />
      
      <MemeDetailModal 
        isOpen={showMemeDetail}
        onClose={() => {
          setShowMemeDetail(false);
          setAddToFolderMode(false);
        }}
        meme={selectedMeme}
        folders={folders}
        isAddToFolderMode={addToFolderMode}
        onAddToFolder={addMemeToFolder}
        onToggleAddToFolder={() => setAddToFolderMode(!addToFolderMode)}
        onDownload={downloadMeme}
        onShare={shareMeme}
        isSaved={savedMemes.some(m => m.id === selectedMeme?.id)}
        onToggleSave={() => {
          if (savedMemes.some(m => m.id === selectedMeme.id)) {
            setSavedMemes(prev => prev.filter(m => m.id !== selectedMeme.id));
          } else {
            const newSavedMeme = {
              ...selectedMeme,
              id: `saved-${Date.now()}-${selectedMeme.id}`,
              savedAt: new Date().toISOString()
            };
            setSavedMemes(prev => [newSavedMeme, ...prev]);
          }
        }}
        darkMode={darkMode}
      />
      
      <ShareOptionsModal 
        isOpen={showShareOptions}
        onClose={() => setShowShareOptions(false)}
        onShareToPlatform={shareToPlatform}
        onDownload={downloadMeme}
        onCopyToClipboard={copyMemeToClipboard}
        meme={selectedMeme}
        darkMode={darkMode}
      />
    </div>
  );
}

export default MemeGallery;