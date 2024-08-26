// components/ImageDrawer.js
const ImageDrawer = ({ isOpen, onClose, selectedImages, onImageChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      <div className="bg-white w-96 h-full shadow-lg overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Manage Images</h2>
          {["banner", "featured", "thumbnail"].map((type) => (
            <div key={type} className="mb-4">
              <label className="block text-sm font-medium mb-2">
                {type.charAt(0).toUpperCase() + type.slice(1)} Image
              </label>
              <input
                type="file"
                className="block w-full text-sm"
                onChange={(e) => onImageChange(e, type)}
              />
              {selectedImages[type] && (
                <img
                  src={selectedImages[type]}
                  alt={`Selected ${type}`}
                  className="mt-4 w-full h-40 object-cover rounded"
                />
              )}
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Alt Texts</label>
            <input type="text" className="block w-full text-sm" />
          </div>
          <button
            onClick={onClose}
            className="mt-4 mr-2 px-4 py-2 bg-blue-300 hover:bg-blue-400 rounded"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Close
          </button>
        </div>
      </div>
      <div className="flex-1 bg-black bg-opacity-50" onClick={onClose}></div>
    </div>
  );
};

export default ImageDrawer;
