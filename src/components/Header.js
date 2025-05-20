import { AlignLeft, Edit, ImageIcon, Key, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";

function Header({ 
  onCreateMeme, 
  onShowApiSettings, 
  darkMode, 
  toggleDarkMode, 
  isSidebarOpen, 
  toggleSidebar 
}) {   
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);    
  
  return (     
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'} p-4 shadow-lg sticky top-0 z-30`}>       
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-3 md:hidden flex items-center justify-center p-2 rounded-md bg-opacity-20 bg-white hover:bg-opacity-30"
            aria-label="Toggle sidebar"
          >
            <AlignLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold flex items-center">
            <ImageIcon className="mr-2" />
            <span className="font-extrabold">Meme</span>
            <span className="font-light">Stash</span>
          </h1>
        </div>
          
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-3 items-center">
          <button
            onClick={toggleDarkMode}
            className="flex items-center bg-opacity-20 bg-white hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={onCreateMeme}
            className="flex items-center bg-green-600 hover:bg-green-700 rounded-md px-4 py-2 transition-colors duration-200 shadow-md"
          >
            <Edit size={16} className="mr-2" />
            <span className="hidden sm:inline">Create Meme</span>
          </button>
          <button
            onClick={onShowApiSettings}
            className="flex items-center bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md px-4 py-2 transition-all duration-200"
          >
            <Key size={16} className="mr-2" />
            <span className="hidden sm:inline">API Settings</span>
          </button>
        </div>
          
        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-md bg-opacity-20 bg-white hover:bg-opacity-30"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
        
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-2 space-y-3">
          <button
            onClick={() => {
              toggleDarkMode();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center bg-opacity-20 bg-white hover:bg-opacity-30 rounded-md p-3 transition-all duration-200"
          >
            {darkMode ? <Sun size={18} className="mr-2" /> : <Moon size={18} className="mr-2" />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={() => {
              onCreateMeme();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 rounded-md p-3 transition-colors duration-200 shadow-md"
          >
            <Edit size={16} className="mr-2" />
            Create Meme
          </button>
          <button
            onClick={() => {
              onShowApiSettings();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md p-3 transition-all duration-200"
          >
            <Key size={16} className="mr-2" />
            API Settings
          </button>
        </div>
      )}
    </div>   
  ); 
}  

export default Header;