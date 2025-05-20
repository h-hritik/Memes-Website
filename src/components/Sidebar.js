// import { Edit, Folder, ImageIcon, Send } from "lucide-react";

//  function Sidebar({
//   folders,
//   selectedFolder,
//   onSelectFolder,
//   getFolderCount,
//   selectedMeme,
//   onShareMeme,
//   onCreateMeme
// }) {
//   return (
//     <div className="w-64 bg-white rounded-lg shadow-md p-4 mr-4">
//       <h2 className="text-lg font-semibold mb-4">My Meme Folders</h2>
//       <ul className="space-y-2">
//         <li 
//           onClick={() => onSelectFolder("all")}
//           className={`flex justify-between items-center p-2 rounded-md cursor-pointer ${
//             selectedFolder === "all" ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
//           }`}
//         >
//           <div className="flex items-center">
//             <Folder size={16} className="mr-2 text-blue-500" />
//             <span>All Memes</span>
//           </div>
//           <span className="bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1">
//             {getFolderCount('all')}
//           </span>
//         </li>
//         <li 
//           onClick={() => onSelectFolder("api")}
//           className={`flex justify-between items-center p-2 rounded-md cursor-pointer ${
//             selectedFolder === "api" ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
//           }`}
//         >
//           <div className="flex items-center">
//             <ImageIcon size={16} className="mr-2 text-indigo-500" />
//             <span>Template Library</span>
//           </div>
//           <span className="bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1">
//             {getFolderCount('api')}
//           </span>
//         </li>
        
//         {folders.map(folder => (
//           <li 
//             key={folder.id}
//             onClick={() => onSelectFolder(folder.id)}
//             className={`flex justify-between items-center p-2 rounded-md cursor-pointer ${
//               selectedFolder === folder.id ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
//             }`}
//           >
//             <div className="flex items-center">
//               <Folder 
//                 size={16} 
//                 className={`mr-2 ${
//                   folder.color === 'yellow' ? 'text-yellow-500' :
//                   folder.color === 'green' ? 'text-green-500' :
//                   folder.color === 'red' ? 'text-red-500' :
//                   folder.color === 'purple' ? 'text-purple-500' :
//                   'text-blue-500'
//                 }`} 
//               />
//               <span>{folder.name}</span>
//             </div>
//             <span className="bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1">
//               {getFolderCount(folder.id)}
//             </span>
//           </li>
//         ))}
//       </ul>
      
//       <div className="mt-8">
//         <h2 className="text-lg font-semibold mb-4">Actions</h2>
//         <button 
//           onClick={onCreateMeme}
//           className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 mb-2"
//         >
//           <Edit size={16} className="mr-2" /> Create New Meme
//         </button>
//         <button 
//           onClick={onShareMeme}
//           disabled={!selectedMeme}
//           className={`flex items-center justify-center w-full ${
//             selectedMeme 
//               ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
//               : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//           } rounded-md px-4 py-2`}
//         >
//           <Send size={16} className="mr-2" /> Share Meme
//         </button>
//       </div>
//     </div>
//   );
// }
// export default Sidebar;
import { ChevronLeft, ChevronRight, Edit, Folder, ImageIcon, Plus, Send, Trash, Video } from "lucide-react";

function Sidebar({
  folders,
  selectedFolder,
  onSelectFolder,
  getFolderCount,
  selectedMeme,
  onShareMeme,
  onCreateMeme,
  onCreateFolder,
  onDeleteFolder,
  darkMode,
  videoMemes = [],
  isSidebarOpen,
  toggleSidebar
}) {
  return (
    <div className={`
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-16'} 
      ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'} 
      fixed md:static z-20 h-full shadow-md transition-all duration-300 ease-in-out
      ${isSidebarOpen ? 'w-72' : 'w-72 md:w-16'} 
      rounded-r-lg md:rounded-lg
    `}>
      <div className="flex justify-between items-center p-4">
        {isSidebarOpen && (
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            My Collections
          </h2>
        )}
        <button 
          onClick={toggleSidebar}
          className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ml-auto`}
        >
          {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      {isSidebarOpen ? (
        <div className="p-4 pt-0 overflow-y-auto h-[calc(100%-160px)]">
          <ul className="space-y-1 mb-6">
            <li 
              onClick={() => onSelectFolder("all")}
              className={`flex justify-between items-center p-3 rounded-md cursor-pointer transition-all duration-150 ${
                selectedFolder === "all" 
                  ? darkMode 
                    ? 'bg-indigo-900 text-indigo-100' 
                    : 'bg-indigo-100 text-indigo-700' 
                  : darkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <Folder size={16} className={`mr-3 ${darkMode ? 'text-indigo-300' : 'text-indigo-500'}`} />
                <span>All Memes</span>
              </div>
              <span className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} text-xs rounded-full px-2 py-1`}>
                {getFolderCount('all') + videoMemes.length}
              </span>
            </li>
            
            <li 
              onClick={() => onSelectFolder("images")}
              className={`flex justify-between items-center p-3 rounded-md cursor-pointer transition-all duration-150 ${
                selectedFolder === "images" 
                  ? darkMode 
                    ? 'bg-indigo-900 text-indigo-100' 
                    : 'bg-indigo-100 text-indigo-700' 
                  : darkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <ImageIcon size={16} className={`mr-3 ${darkMode ? 'text-purple-300' : 'text-purple-500'}`} />
                <span>Image Memes</span>
              </div>
              <span className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} text-xs rounded-full px-2 py-1`}>
                {getFolderCount('images')}
              </span>
            </li>

            <li 
              onClick={() => onSelectFolder("videos")}
              className={`flex justify-between items-center p-3 rounded-md cursor-pointer transition-all duration-150 ${
                selectedFolder === "videos" 
                  ? darkMode 
                    ? 'bg-indigo-900 text-indigo-100' 
                    : 'bg-indigo-100 text-indigo-700' 
                  : darkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <Video size={16} className={`mr-3 ${darkMode ? 'text-blue-300' : 'text-blue-500'}`} />
                <span>Video Memes</span>
              </div>
              <span className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} text-xs rounded-full px-2 py-1`}>
                {videoMemes.length}
              </span>
            </li>
          </ul>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Custom Folders</h3>
              <button 
                onClick={onCreateFolder}
                className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                title="Create new folder"
              >
                <Plus size={14} />
              </button>
            </div>
            
            <ul className="space-y-1">
              {folders.map(folder => (
                <li 
                  key={folder.id}
                  onClick={() => onSelectFolder(folder.id)}
                  className={`flex justify-between items-center p-3 rounded-md cursor-pointer group transition-all duration-150 ${
                    selectedFolder === folder.id 
                      ? darkMode 
                        ? 'bg-indigo-900 text-indigo-100' 
                        : 'bg-indigo-100 text-indigo-700' 
                      : darkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <div 
                      className={`w-3 h-3 rounded-full mr-3 ${
                        folder.color === 'yellow' ? 'bg-yellow-500' :
                        folder.color === 'green' ? 'bg-green-500' :
                        folder.color === 'red' ? 'bg-red-500' :
                        folder.color === 'purple' ? 'bg-purple-500' :
                        'bg-blue-500'
                      }`} 
                    />
                    <span>{folder.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} text-xs rounded-full px-2 py-1 mr-2`}>
                      {getFolderCount(folder.id)}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteFolder(folder.id);
                      }}
                      className={`opacity-0 group-hover:opacity-100 p-1 rounded-full ${
                        darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                      } transition-opacity duration-200`}
                      title="Delete folder"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Actions</h2>
            <button 
              onClick={() => onCreateMeme('image')}
              className={`flex items-center justify-center w-full ${
                darkMode 
                  ? 'bg-green-700 hover:bg-green-600' 
                  : 'bg-green-600 hover:bg-green-700'
              } text-white rounded-md px-4 py-2 mb-2 transition-colors duration-200`}
            >
              <Edit size={16} className="mr-2" /> Create Image Meme
            </button>
            <button 
              onClick={() => onCreateMeme('video')}
              className={`flex items-center justify-center w-full ${
                darkMode 
                  ? 'bg-blue-700 hover:bg-blue-600' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white rounded-md px-4 py-2 mb-3 transition-colors duration-200`}
            >
              <Video size={16} className="mr-2" /> Create Video Meme
            </button>
            <button 
              onClick={onShareMeme}
              disabled={!selectedMeme}
              className={`flex items-center justify-center w-full transition-all duration-200 ${
                selectedMeme 
                  ? darkMode
                    ? 'bg-indigo-700 hover:bg-indigo-600 text-white' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : darkMode
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } rounded-md px-4 py-2`}
            >
              <Send size={16} className="mr-2" /> Share Selected Meme
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center pt-4 space-y-6">
          <button 
            onClick={() => onSelectFolder("all")}
            className={`p-3 rounded-md transition-all duration-150 ${
              selectedFolder === "all" 
                ? darkMode 
                  ? 'bg-indigo-900 text-indigo-100' 
                  : 'bg-indigo-100 text-indigo-700' 
                : darkMode 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-100'
            }`}
            title="All Memes"
          >
            <Folder size={20} />
          </button>
          
          <button 
            onClick={() => onSelectFolder("images")}
            className={`p-3 rounded-md transition-all duration-150 ${
              selectedFolder === "images" 
                ? darkMode 
                  ? 'bg-indigo-900 text-indigo-100' 
                  : 'bg-indigo-100 text-indigo-700' 
                : darkMode 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-100'
            }`}
            title="Image Memes"
          >
            <ImageIcon size={20} />
          </button>

          <button 
            onClick={() => onSelectFolder("videos")}
            className={`p-3 rounded-md transition-all duration-150 ${
              selectedFolder === "videos" 
                ? darkMode 
                  ? 'bg-indigo-900 text-indigo-100' 
                  : 'bg-indigo-100 text-indigo-700' 
                : darkMode 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-100'
            }`}
            title="Video Memes"
          >
            <Video size={20} />
          </button>

          <div className="border-t w-8 my-4 border-gray-700"></div>

          <button 
            onClick={() => onCreateMeme('image')}
            className={`p-3 rounded-md ${
              darkMode 
                ? 'bg-green-700 hover:bg-green-600' 
                : 'bg-green-600 hover:bg-green-700'
            } text-white transition-colors duration-200`}
            title="Create Image Meme"
          >
            <Edit size={20} />
          </button>

          <button 
            onClick={() => onCreateMeme('video')}
            className={`p-3 rounded-md ${
              darkMode 
                ? 'bg-blue-700 hover:bg-blue-600' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition-colors duration-200`}
            title="Create Video Meme"
          >
            <Video size={20} />
          </button>

          <button 
            onClick={onShareMeme}
            disabled={!selectedMeme}
            className={`p-3 rounded-md transition-all duration-200 ${
              selectedMeme 
                ? darkMode
                  ? 'bg-indigo-700 hover:bg-indigo-600 text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : darkMode
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            title="Share Selected Meme"
          >
            <Send size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;