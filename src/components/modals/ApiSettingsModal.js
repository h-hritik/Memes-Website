import { X } from "lucide-react";

export default function ApiSettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">API Settings</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ImgFlip API Username
          </label>
          <input
            type="text"
            placeholder="Your ImgFlip username"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ImgFlip API Password
          </label>
          <input
            type="password"
            placeholder="Your ImgFlip password"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <p className="mt-1 text-xs text-gray-500">
            Required only if you want to use the caption API to generate actual meme images
          </p>
        </div>
        
        <div className="rounded-md bg-indigo-50 p-3 mb-4">
          <div className="text-sm text-indigo-800 font-medium mb-1">Example Code</div>
          <pre className="text-xs text-indigo-700 overflow-x-auto p-2 bg-indigo-100 rounded">
{`// Get meme templates
fetch('https://api.imgflip.com/get_memes')
  .then(res => res.json())
  .then(data => console.log(data));

// Caption a meme (requires auth)
fetch('https://api.imgflip.com/caption_image', {
  method: 'POST',
  body: new URLSearchParams({
    template_id: '181913649',
    username: 'your_username',
    password: 'your_password',
    text0: 'Top text',
    text1: 'Bottom text'
  })
})
.then(res => res.json())
.then(data => console.log(data));`}
          </pre>
        </div>
        
        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}