// import { Grid, List, Search } from "lucide-react";
//  function MemeContent({
//   searchTerm,
//   onSearchChange,
//   viewMode,
//   onViewModeChange,
//   isLoading,
//   error,
//   filteredMemes,
//   onMemeClick,
//   selectedMeme
// }) {
//   return (
//     <div className="flex-1">
//       {/* Search and view controls */}
//       <div className="bg-white rounded-lg shadow-md p-4 mb-4">
//         <div className="flex justify-between items-center">
//           <div className="relative flex-1 max-w-md">
//             <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search memes..."
//               value={searchTerm}
//               onChange={(e) => onSearchChange(e.target.value)}
//               className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>
//           <div className="flex space-x-2">
//             <button 
//               onClick={() => onViewModeChange("grid")}
//               className={`p-2 rounded-md ${viewMode === "grid" ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'}`}
//             >
//               <Grid size={20} />
//             </button>
//             <button 
//               onClick={() => onViewModeChange("list")}
//               className={`p-2 rounded-md ${viewMode === "list" ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-100'}`}
//             >
//               <List size={20} />
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {/* Loading state */}
//       {isLoading && (
//         <div className="bg-white rounded-lg shadow-md p-8 text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//           <p className="mt-4 text-gray-500">Loading memes...</p>
//         </div>
//       )}
      
//       {/* Error state */}
//       {error && (
//         <div className="bg-white rounded-lg shadow-md p-8 text-center">
//           <div className="text-red-500 mb-2">Error loading memes</div>
//           <p className="text-sm text-gray-500">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
//           >
//             Retry
//           </button>
//         </div>
//       )}
      
//       {/* Memes display */}
//       {!isLoading && !error && (
//         filteredMemes.length > 0 ? (
//           <div className={`bg-white rounded-lg shadow-md p-4 ${viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" : "space-y-4"}`}>
//             {filteredMemes.map(meme => (
//               <MemeCard 
//                 key={meme.id}
//                 meme={meme}
//                 viewMode={viewMode}
//                 isSelected={selectedMeme?.id === meme.id}
//                 onClick={() => onMemeClick(meme)}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow-md p-8 text-center">
//             <div className="text-gray-500 mb-2">No memes found</div>
//             <p className="text-sm text-gray-400">Try adjusting your search or select a different folder</p>
//           </div>
//         )
//       )}
//     </div>
//   );
// }

// function MemeCard({ meme, viewMode, isSelected, onClick }) {
//   return (
//     <div 
//       onClick={onClick}
//       className={`cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition duration-200 ${
//         viewMode === "list" ? "flex items-center" : ""
//       } ${isSelected ? "ring-2 ring-indigo-500" : ""}`}
//     >
//       <div className={`${viewMode === "list" ? "w-24 h-24" : "w-full h-40"} relative`}>
//         <img 
//           src={meme.url} 
//           alt={meme.title}
//           className="w-full h-full object-cover" 
//         />
//         {meme.topText && (
//           <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-sm font-bold text-center w-full px-2 text-shadow">
//             {meme.topText}
//           </div>
//         )}
//         {meme.bottomText && (
//           <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-sm font-bold text-center w-full px-2 text-shadow">
//             {meme.bottomText}
//           </div>
//         )}
//       </div>
//       <div className={`p-3 ${viewMode === "list" ? "flex-1" : ""}`}>
//         <h3 className="font-medium text-gray-900 text-sm truncate">{meme.title}</h3>
//         <div className="flex flex-wrap mt-2 gap-1">
//           {meme.tags && meme.tags.map(tag => (
//             <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
//               #{tag}
//             </span>
//           ))}
//           {meme.folder && (
//             <span className={`text-xs px-2 py-1 rounded-full ${
//               meme.folder.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
//               meme.folder.color === 'green' ? 'bg-green-100 text-green-800' :
//               meme.folder.color === 'red' ? 'bg-red-100 text-red-800' :
//               meme.folder.color === 'purple' ? 'bg-purple-100 text-purple-800' :
//               'bg-blue-100 text-blue-800'
//             }`}>
//               {meme.folder.name || meme.folder}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// export default MemeContent;

import { Grid, List, Search, SlidersHorizontal } from "lucide-react";

function MemeContent({
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  isLoading,
  error,
  filteredMemes,
  onMemeClick,
  selectedMeme,
  darkMode,
  onSortChange = () => {}, // provide default empty function
  sortOption = "newest" // provide default value
}) {
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "az", label: "A-Z" },
    { value: "za", label: "Z-A" }
  ];

  return (
    <div className="flex-1 overflow-hidden">
      {/* Search and view controls */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-md p-4 mb-4 border transition-colors duration-200`}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search memes..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`pl-10 pr-4 py-2 w-full border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-indigo-500' 
                  : 'border-gray-300 focus:ring-indigo-500'
              } rounded-md focus:outline-none focus:ring-2 transition-colors duration-200`}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex items-center">
              <SlidersHorizontal size={16} className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <select 
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value)}
                className={`${
                  darkMode 
                    ? 'bg-gray-700 text-gray-100 border-gray-600' 
                    : 'bg-white text-gray-800 border-gray-300'
                } border rounded-md py-1 pl-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base`}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-md p-1">
              <button 
                onClick={() => onViewModeChange("grid")}
                className={`p-2 rounded-md transition-colors duration-150 ${
                  viewMode === "grid" 
                    ? darkMode
                      ? 'bg-gray-600 text-indigo-300' 
                      : 'bg-white text-indigo-700 shadow-sm' 
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-600' 
                      : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="Grid view"
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
              <button 
                onClick={() => onViewModeChange("list")}
                className={`p-2 rounded-md transition-colors duration-150 ${
                  viewMode === "list" 
                    ? darkMode
                      ? 'bg-gray-600 text-indigo-300' 
                      : 'bg-white text-indigo-700 shadow-sm'  
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-600' 
                      : 'text-gray-600 hover:bg-gray-200'
                }`}
                title="List view"
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <div className={`${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'} rounded-lg shadow-md p-8 text-center transition-colors duration-200`}>
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${darkMode ? 'border-indigo-400' : 'border-indigo-600'} mx-auto`}></div>
          <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loading memes...</p>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className={`${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'} rounded-lg shadow-md p-8 text-center transition-colors duration-200`}>
          <div className="text-red-500 mb-2">Error loading memes</div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      )}
      
      {/* Memes display */}
      {!isLoading && !error && (
        filteredMemes.length > 0 ? (
          <div className={`${
            darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'
          } rounded-lg shadow-md p-4 transition-colors duration-200 overflow-auto ${
            viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-3"
          }`}>
            {filteredMemes.map(meme => (
              <MemeCard 
                key={meme.id}
                meme={meme}
                viewMode={viewMode}
                isSelected={selectedMeme?.id === meme.id}
                onClick={() => onMemeClick(meme)}
                darkMode={darkMode}
              />
            ))}
          </div>
        ) : (
          <div className={`${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'} rounded-lg shadow-md p-8 text-center transition-colors duration-200`}>
            <div className={darkMode ? 'text-gray-300' : 'text-gray-500'}>No memes found</div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-400'} mt-2`}>Try adjusting your search or filters</p>
          </div>
        )
      )}
    </div>
  );
}

function MemeCard({ meme, viewMode, isSelected, onClick, darkMode }) {
  return (
    <div 
      onClick={onClick}
      className={`cursor-pointer rounded-lg overflow-hidden ${
        darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
      } border hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 ${
        viewMode === "list" ? "flex items-center" : ""
      } ${isSelected ? 
        darkMode ? "ring-2 ring-indigo-400" : "ring-2 ring-indigo-500" 
        : ""}`}
      aria-selected={isSelected}
    >
      <div className={`${viewMode === "list" ? "w-24 h-24 flex-shrink-0" : "w-full aspect-square"} relative`}>
        <img 
          src={meme.url} 
          alt={meme.title}
          className="w-full h-full object-cover" 
          loading="lazy"
        />
        {meme.topText && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-sm font-bold text-center w-full px-2 text-shadow">
            {meme.topText}
          </div>
        )}
        {meme.bottomText && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-sm font-bold text-center w-full px-2 text-shadow">
            {meme.bottomText}
          </div>
        )}
      </div>
      <div className={`p-3 ${viewMode === "list" ? "flex-1 min-w-0" : ""}`}>
        <h3 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'} text-sm truncate`}>{meme.title}</h3>
        <div className="flex flex-wrap mt-2 gap-1">
          {meme.tags?.map(tag => (
            <span key={tag} className={`${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
            } text-xs px-2 py-1 rounded-full truncate max-w-full`}>
              #{tag}
            </span>
          ))}
          {meme.folder && (
            <span className={`text-xs px-2 py-1 rounded-full ${
              darkMode ? 
              (meme.folder === 'yellow' ? 'bg-yellow-900 text-yellow-300' :
               meme.folder === 'green' ? 'bg-green-900 text-green-300' :
               meme.folder === 'red' ? 'bg-red-900 text-red-300' :
               meme.folder === 'purple' ? 'bg-purple-900 text-purple-300' :
               'bg-blue-900 text-blue-300') :
              (meme.folder === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
               meme.folder === 'green' ? 'bg-green-100 text-green-800' :
               meme.folder === 'red' ? 'bg-red-100 text-red-800' :
               meme.folder === 'purple' ? 'bg-purple-100 text-purple-800' :
               'bg-blue-100 text-blue-800')
            }`}>
              {typeof meme.folder === 'object' ? meme.folder.name : meme.folder}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemeContent;
