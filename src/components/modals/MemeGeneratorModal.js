import { AlignCenter, AlignLeft, AlignRight, ArrowDown, ArrowUp, Bold, ChevronLeft, ChevronRight, Download, Italic, Layout, Moon, Palette, RefreshCw, RotateCw, Share2, Sliders, Smile, Sun, Upload, X, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function MemeGeneratorModal({
  isOpen,
  onClose,
  currentMeme,
  filePreview,
  topText = "",
  onTopTextChange,
  bottomText = "",
  onBottomTextChange,
  onRandomMeme,
  onFileChange,
  onSaveMeme,
  darkMode = false
}) {
  const [textColor, setTextColor] = useState('#ffffff');
  const [textStroke, setTextStroke] = useState(true);
  const [fontSize, setFontSize] = useState('medium');
  const [fontFamily, setFontFamily] = useState('Impact');
  const [step, setStep] = useState(1);
  const [customTexts, setCustomTexts] = useState([]);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [textAlign, setTextAlign] = useState('center');
  const [textBold, setTextBold] = useState(true);
  const [textItalic, setTextItalic] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [recentColors, setRecentColors] = useState(['#ffffff', '#ffff00', '#ff0000', '#00ff00', '#0000ff']);
  const [showEmojis, setShowEmojis] = useState(false);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0
  });
  
  const emojis = ["😂", "🤣", "😎", "🤔", "😍", "🙄", "😱", "🤯", "😭", "👍", "🎉", "🔥", "💯", "🙏", "⭐"];
  const imageRef = useRef(null);
  
  // Reset step when modal is opened or closed
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setZoomLevel(1);
      setRotation(0);
      setFilters({
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0
      });
    }
  }, [isOpen]);
  
  const fontSizeOptions = {
    xsmall: 'text-xs',
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl',
    xxlarge: 'text-2xl'
  };
  
  const fontFamilyOptions = [
    'Impact', 'Arial', 'Comic Sans MS', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia'
  ];
  
  const handleColorSelect = (color) => {
    setTextColor(color);
    // Add to recent colors if not already there
    if (!recentColors.includes(color)) {
      setRecentColors([color, ...recentColors.slice(0, 4)]);
    }
  };
  
  const addCustomText = () => {
    setCustomTexts([...customTexts, {
      id: Date.now(),
      text: "Custom text",
      x: 50,
      y: 50,
      color: textColor,
      fontSize: fontSize,
      fontFamily: fontFamily,
      stroke: textStroke,
      align: textAlign,
      bold: textBold,
      italic: textItalic
    }]);
  };
  
  const updateCustomText = (id, property, value) => {
    setCustomTexts(customTexts.map(text => {
      if (text.id === id) {
        return { ...text, [property]: value };
      }
      return text;
    }));
  };
  
  const removeCustomText = (id) => {
    setCustomTexts(customTexts.filter(text => text.id !== id));
  };

  const handleZoom = (direction) => {
    setZoomLevel(prev => {
      const newZoom = direction === 'in' ? prev + 0.1 : prev - 0.1;
      return Math.max(0.5, Math.min(3, newZoom));
    });
  };
  
  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };
  
  const adjustFilter = (filter, value) => {
    setFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };
  
  const filterStyle = {
    filter: `
      brightness(${filters.brightness}%) 
      contrast(${filters.contrast}%) 
      saturate(${filters.saturation}%)
      blur(${filters.blur}px)
    `
  };
  
  const handleDownload = () => {
    // Simulate download functionality
    alert("Meme download functionality would go here!");
  };
  
  const handleShare = () => {
    // Simulate share functionality
    alert("Meme share functionality would go here!");
  };
  
  const addEmoji = (emoji) => {
    // Add emoji to the end of top text
    onTopTextChange(topText + emoji);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-2 md:p-4 z-50 animate-fadeIn overflow-y-auto">
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-xl w-full max-w-4xl mx-2 transition-colors duration-200`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">
              {step === 1 ? "Choose Template" : "Customize Meme"}
            </h2>
            <button 
              onClick={() => darkMode ? false : true}
              className="ml-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          <button 
            onClick={onClose}
            className={`p-1 rounded-full ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'} transition-colors duration-150`}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 md:p-6">
          {step === 1 && (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-2/3">
                <div className="flex flex-wrap gap-2 mb-4">
                  <button 
                    onClick={onRandomMeme}
                    className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 transition-colors duration-200 text-sm md:text-base"
                  >
                    <RefreshCw size={16} className="mr-1" /> Random
                  </button>
                  
                  <label className="flex items-center bg-green-600 hover:bg-green-700 text-white rounded-md px-3 py-2 cursor-pointer transition-colors duration-200 text-sm md:text-base">
                    <Upload size={16} className="mr-1" /> Upload
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={onFileChange}
                      className="hidden"
                    />
                  </label>
                  
                  <button 
                    onClick={handleDownload}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-2 transition-colors duration-200 text-sm md:text-base"
                    disabled={!currentMeme && !filePreview}
                  >
                    <Download size={16} className="mr-1" /> Save
                  </button>
                  
                  <button 
                    onClick={handleShare}
                    className="flex items-center bg-purple-600 hover:bg-purple-700 text-white rounded-md px-3 py-2 transition-colors duration-200 text-sm md:text-base"
                    disabled={!currentMeme && !filePreview}
                  >
                    <Share2 size={16} className="mr-1" /> Share
                  </button>
                </div>
                
                <div className="mb-4 flex justify-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4 min-h-64">
                  <div className="relative max-w-full">
                    <img 
                      ref={imageRef}
                      src={filePreview || (currentMeme ? currentMeme.url : "/api/placeholder/300/300")} 
                      alt={currentMeme?.title || "Selected template"} 
                      className="max-h-64 w-auto object-contain rounded-md border shadow-md transform transition-transform"
                      style={{
                        ...filterStyle,
                        transform: `scale(${zoomLevel}) rotate(${rotation}deg)`
                      }}
                    />
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      <button 
                        onClick={() => handleZoom('out')}
                        className="bg-gray-800 text-white p-1 rounded-full opacity-70 hover:opacity-100"
                        aria-label="Zoom out"
                      >
                        <ZoomOut size={16} />
                      </button>
                      <button 
                        onClick={() => handleZoom('in')}
                        className="bg-gray-800 text-white p-1 rounded-full opacity-70 hover:opacity-100"
                        aria-label="Zoom in"
                      >
                        <ZoomIn size={16} />
                      </button>
                      <button 
                        onClick={handleRotate}
                        className="bg-gray-800 text-white p-1 rounded-full opacity-70 hover:opacity-100"
                        aria-label="Rotate"
                      >
                        <RotateCw size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/3">
                <h3 className="text-lg font-medium mb-3">Templates</h3>
                <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto p-1">
                  {Array(9).fill(0).map((_, i) => (
                    <div 
                      key={i} 
                      className="aspect-square bg-gray-200 dark:bg-gray-600 rounded cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center"
                    >
                      <div className="text-gray-500 dark:text-gray-300 text-xs">
                        Template {i+1}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-center">
                  <button 
                    onClick={() => setStep(2)}
                    disabled={!currentMeme && !filePreview}
                    className={`${
                      darkMode ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-indigo-600 hover:bg-indigo-700'
                    } text-white px-6 py-2 rounded-md transition-colors duration-200 shadow-md flex items-center disabled:opacity-50`}
                  >
                    Continue <ChevronRight size={16} className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {step === 2 && (currentMeme || filePreview) && (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-2/3">
                <div className="mb-4 flex justify-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4 min-h-64">
                  <div className="relative max-w-full">
                    <img 
                      ref={imageRef}
                      src={filePreview || (currentMeme ? currentMeme.url : "/api/placeholder/300/300")} 
                      alt={currentMeme?.title || "Selected template"} 
                      className="max-h-96 w-auto object-contain rounded-md border shadow-md transform transition-transform"
                      style={{
                        ...filterStyle,
                        transform: `scale(${zoomLevel}) rotate(${rotation}deg)`
                      }}
                    />
                    
                    {topText && (
                      <div 
                        className={`absolute top-2 left-1/2 transform -translate-x-1/2 ${fontSizeOptions[fontSize]} ${textBold ? 'font-bold' : ''} ${textItalic ? 'italic' : ''} w-full px-2 ${textStroke ? 'text-stroke' : ''}`}
                        style={{ 
                          color: textColor, 
                          fontFamily: fontFamily.replace(/\s+/g, '-'),
                          textShadow: textStroke ? '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0px 1px 0 #000, 1px 0px 0 #000, 0px -1px 0 #000, -1px 0px 0 #000' : 'none',
                          textAlign: textAlign
                        }}
                      >
                        {topText}
                      </div>
                    )}
                    
                    {bottomText && (
                      <div 
                        className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 ${fontSizeOptions[fontSize]} ${textBold ? 'font-bold' : ''} ${textItalic ? 'italic' : ''} w-full px-2 ${textStroke ? 'text-stroke' : ''}`}
                        style={{ 
                          color: textColor, 
                          fontFamily: fontFamily.replace(/\s+/g, '-'),
                          textShadow: textStroke ? '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0px 1px 0 #000, 1px 0px 0 #000, 0px -1px 0 #000, -1px 0px 0 #000' : 'none',
                          textAlign: textAlign
                        }}
                      >
                        {bottomText}
                      </div>
                    )}
                    
                    {customTexts.map(customText => (
                      <div 
                        key={customText.id}
                        className={`absolute ${fontSizeOptions[customText.fontSize]} ${customText.bold ? 'font-bold' : ''} ${customText.italic ? 'italic' : ''} w-full px-2 ${customText.stroke ? 'text-stroke' : ''}`}
                        style={{ 
                          color: customText.color,
                          fontFamily: customText.fontFamily.replace(/\s+/g, '-'),
                          textShadow: customText.stroke ? '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0px 1px 0 #000, 1px 0px 0 #000, 0px -1px 0 #000, -1px 0px 0 #000' : 'none',
                          textAlign: customText.align,
                          top: `${customText.y}%`,
                          left: `${customText.x}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        {customText.text}
                      </div>
                    ))}
                    
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      <button 
                        onClick={() => handleZoom('out')}
                        className="bg-gray-800 text-white p-1 rounded-full opacity-70 hover:opacity-100"
                        aria-label="Zoom out"
                      >
                        <ZoomOut size={16} />
                      </button>
                      <button 
                        onClick={() => handleZoom('in')}
                        className="bg-gray-800 text-white p-1 rounded-full opacity-70 hover:opacity-100"
                        aria-label="Zoom in"
                      >
                        <ZoomIn size={16} />
                      </button>
                      <button 
                        onClick={handleRotate}
                        className="bg-gray-800 text-white p-1 rounded-full opacity-70 hover:opacity-100"
                        aria-label="Rotate"
                      >
                        <RotateCw size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full lg:w-1/3">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Top Text
                      </label>
                      <button
                        onClick={() => setShowEmojis(!showEmojis)}
                        className={`text-xs flex items-center ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
                      >
                        <Smile size={14} className="mr-1" /> Emojis
                      </button>
                    </div>
                    <input
                      type="text"
                      value={topText}
                      onChange={(e) => onTopTextChange(e.target.value)}
                      placeholder="Add top text"
                      className={`w-full border ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300'
                      } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                  </div>
                  
                  {showEmojis && (
                    <div className="flex flex-wrap gap-1 mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                      {emojis.map(emoji => (
                        <button 
                          key={emoji}
                          onClick={() => addEmoji(emoji)}
                          className="text-lg hover:bg-gray-200 dark:hover:bg-gray-600 p-1 rounded"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Bottom Text
                    </label>
                    <input
                      type="text"
                      value={bottomText}
                      onChange={(e) => onBottomTextChange(e.target.value)}
                      placeholder="Add bottom text"
                      className={`w-full border ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300'
                      } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium flex items-center">
                        <Palette size={16} className="mr-2" /> Text Style
                      </h3>
                      <button
                        onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                        className={`text-xs ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} flex items-center`}
                      >
                        <Sliders size={14} className="mr-1" />
                        {showAdvancedOptions ? 'Basic' : 'Advanced'}
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium mb-1">Text Color</label>
                        <div className="flex flex-wrap gap-1">
                          {recentColors.map(color => (
                            <button
                              key={color}
                              onClick={() => handleColorSelect(color)}
                              style={{ backgroundColor: color }}
                              className={`w-6 h-6 rounded-full border ${color === textColor ? 'ring-2 ring-offset-1 ring-indigo-500' : 'border-gray-300'}`}
                              aria-label={`Select color ${color}`}
                            />
                          ))}
                          <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="w-6 h-6 border-0 rounded cursor-pointer"
                            aria-label="Custom color picker"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium mb-1">Alignment</label>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => setTextAlign('left')}
                              className={`p-1 rounded ${textAlign === 'left' ? 'bg-indigo-100 dark:bg-indigo-900' : ''}`}
                              aria-label="Align left"
                            >
                              <AlignLeft size={16} />
                            </button>
                            <button
                              onClick={() => setTextAlign('center')}
                              className={`p-1 rounded ${textAlign === 'center' ? 'bg-indigo-100 dark:bg-indigo-900' : ''}`}
                              aria-label="Align center"
                            >
                              <AlignCenter size={16} />
                            </button>
                            <button
                              onClick={() => setTextAlign('right')}
                              className={`p-1 rounded ${textAlign === 'right' ? 'bg-indigo-100 dark:bg-indigo-900' : ''}`}
                              aria-label="Align right"
                            >
                              <AlignRight size={16} />
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium mb-1">Style</label>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => setTextBold(!textBold)}
                              className={`p-1 rounded ${textBold ? 'bg-indigo-100 dark:bg-indigo-900' : ''}`}
                              aria-label="Toggle bold"
                            >
                              <Bold size={16} />
                            </button>
                            <button
                              onClick={() => setTextItalic(!textItalic)}
                              className={`p-1 rounded ${textItalic ? 'bg-indigo-100 dark:bg-indigo-900' : ''}`}
                              aria-label="Toggle italic"
                            >
                              <Italic size={16} />
                            </button>
                            <label className="flex items-center ml-1">
                              <input
                                type="checkbox"
                                checked={textStroke}
                                onChange={() => setTextStroke(!textStroke)}
                                className="rounded text-indigo-600 focus:ring-indigo-500 mr-1 h-3 w-3"
                              />
                              <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Outline</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium mb-1">Font Size</label>
                          <select
                            value={fontSize}
                            onChange={(e) => setFontSize(e.target.value)}
                            className={`w-full border text-xs ${
                              darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'border-gray-300'
                            } rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                          >
                            <option value="xsmall">X-Small</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            <option value="xlarge">X-Large</option>
                            <option value="xxlarge">XX-Large</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium mb-1">Font Family</label>
                          <select
                            value={fontFamily}
                            onChange={(e) => setFontFamily(e.target.value)}
                            className={`w-full border text-xs ${
                              darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'border-gray-300'
                            } rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                          >
                            {fontFamilyOptions.map(font => (
                              <option key={font} value={font}>{font}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <button
                        onClick={addCustomText}
                        className={`w-full flex items-center justify-center ${
                          darkMode 
                            ? 'bg-indigo-700 hover:bg-indigo-600' 
                            : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
                        } px-2 py-1 rounded-md text-xs transition-colors duration-200 mt-1`}
                      >
                        <Layout size={14} className="mr-1" /> Add Custom Text
                      </button>
                    </div>
                    
                    {showAdvancedOptions && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                        <h3 className="text-sm font-medium mb-3">Image Adjustments</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <label className="text-xs">Brightness</label>
                              <span className="text-xs">{filters.brightness}%</span>
                            </div>
                            <input 
                              type="range" 
                              min="50" 
                              max="150" 
                              value={filters.brightness} 
                              onChange={(e) => adjustFilter('brightness', parseInt(e.target.value))}
                              className="w-full h-2"
                            />
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <label className="text-xs">Contrast</label>
                              <span className="text-xs">{filters.contrast}%</span>
                            </div>
                            <input 
                              type="range" 
                              min="50" 
                              max="150" 
                              value={filters.contrast} 
                              onChange={(e) => adjustFilter('contrast', parseInt(e.target.value))}
                              className="w-full h-2"
                            />
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <label className="text-xs">Saturation</label>
                              <span className="text-xs">{filters.saturation}%</span>
                            </div>
                            <input 
                              type="range" 
                              min="0" 
                              max="200" 
                              value={filters.saturation} 
                              onChange={(e) => adjustFilter('saturation', parseInt(e.target.value))}
                              className="w-full h-2"
                            />
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <label className="text-xs">Blur</label>
                              <span className="text-xs">{filters.blur}px</span>
                            </div>
                            <input 
                              type="range" 
                              min="0" 
                              max="5" 
                              step="0.1"
                              value={filters.blur} 
                              onChange={(e) => adjustFilter('blur', parseFloat(e.target.value))}
                              className="w-full h-2"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {customTexts.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <h3 className="text-sm font-medium mb-2">Custom Text Layers</h3>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {customTexts.map((text) => (
                          <div key={text.id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-600 p-2 rounded text-xs">
                            <div className="truncate max-w-xs" style={{ color: text.color }}>
                              {text.text || "Custom text"}
                            </div>
                            <div className="flex items-center space-x-1">
                              <button 
                                onClick={() => updateCustomText(text.id, 'y', text.y - 5)}
                                className="p-1 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500 rounded"
                                aria-label="Move up"
                              >
                                <ArrowUp size={12} />
                              </button>
                              <button 
                                onClick={() => updateCustomText(text.id, 'y', text.y + 5)}
                                className="p-1 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500 rounded"
                                aria-label="Move down"
                              >
                                <ArrowDown size={12} />
                              </button>
                              <button 
                                onClick={() => removeCustomText(text.id)}
                                className="p-1 text-red-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded"
                                aria-label="Remove text"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between pt-4">
                    <button 
                      onClick={() => setStep(1)}
                      className={`flex items-center ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600' 
                          : 'bg-gray-200 hover:bg-gray-300'
                      } px-4 py-2 rounded-md transition-colors duration-200 text-sm`}
                    >
                      <ChevronLeft size={16} className="mr-1" /> Back
                    </button>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={onClose}
                        className={`px-4 py-2 border text-sm ${
                          darkMode 
                            ? 'border-gray-600 hover:bg-gray-700' 
                            : 'border-gray-300 hover:bg-gray-50'
                        } rounded-md transition-colors duration-200`}
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={onSaveMeme}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200 shadow-md text-sm"
                      >
                        Save Meme
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}