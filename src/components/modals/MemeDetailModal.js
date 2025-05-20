import { Download, Folder, Save, Send, ThumbsUp, X } from "lucide-react";

export default function MemeDetailModal({
  isOpen,
  onClose,
  meme,
  folders,
  isAddToFolderMode,
  onAddToFolder,
  onToggleAddToFolder,
  onDownload,
  onShare,
  isSaved,
  onToggleSave
}) {
  if (!isOpen || !meme) return null;

  return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
  <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
    {/* Header */}
    <div className="flex justify-between items-center p-4 border-b">
      <h2 className="text-xl font-semibold truncate">{meme.title}</h2>
      <button 
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700"
      >
        <X size={20} />
      </button>
    </div>
    
    {/* Scrollable content */}
    <div className="flex-1 overflow-y-auto p-4">
      {/* Meme Image */}
      <div className="mb-4 flex justify-center">
        <div className="relative">
          <img 
            src={meme.url} 
            alt={meme.title} 
            className="max-h-[60vh] w-full object-contain rounded-md"
          />
          {meme.topText && (
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold text-center w-full px-2 text-shadow">
              {meme.topText}
            </div>
          )}
          {meme.bottomText && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold text-center w-full px-2 text-shadow">
              {meme.bottomText}
            </div>
          )}
        </div>
      </div>
      
      {/* Tags */}
      {meme.tags && meme.tags.length > 0 && (
        <div className="flex flex-wrap mb-4 gap-1">
          {meme.tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
    
    {/* Footer Buttons */}
    <div className="p-4 border-t">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={onToggleAddToFolder}
            className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2 text-sm sm:text-base"
          >
            <Save size={16} className="mr-1" /> Save to Folder
          </button>
          <button 
            onClick={onDownload}
            className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2 text-sm sm:text-base"
          >
            <Download size={16} className="mr-1" /> Download
          </button>
          <button 
            onClick={onShare}
            className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2 text-sm sm:text-base"
          >
            <Send size={16} className="mr-1" /> Share
          </button>
        </div>
        
        <button 
          onClick={onToggleSave}
          className="flex items-center bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded-md px-3 py-2 text-sm sm:text-base"
        >
          <ThumbsUp size={16} className="mr-1" />
          {isSaved ? 'Unsave' : 'Save'}
        </button>
      </div>
      
      {/* Add to Folder Modal */}
      {isAddToFolderMode && (
        <div className="mt-4 border-t pt-4">
          <h3 className="text-lg font-medium mb-3">Add to Folder</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {folders.map(folder => (
              <button
                key={folder.id}
                onClick={() => onAddToFolder(folder.id)}
                className={`flex items-center p-2 rounded-md text-sm sm:text-base ${
                  meme.folder === folder.id 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <Folder 
                  size={16} 
                  className={`mr-2 ${
                    folder.color === 'yellow' ? 'text-yellow-500' :
                    folder.color === 'green' ? 'text-green-500' :
                    folder.color === 'red' ? 'text-red-500' :
                    folder.color === 'purple' ? 'text-purple-500' :
                    'text-blue-500'
                  }`} 
                />
                <span className="truncate">{folder.name}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button 
              onClick={onToggleAddToFolder}
              className="px-3 py-1 text-gray-500 hover:text-gray-700 text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
</div>
  );
}