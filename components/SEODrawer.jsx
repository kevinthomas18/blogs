// components/SEODrawer.js
const SEODrawer = ({ isOpen, onClose, seoData, onSEOChange, onSEOUpdate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      <div className="bg-white w-96 h-full shadow-lg overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Manage SEO</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Meta Title</label>
            <input
              type="text"
              name="metaTitle"
              value={seoData.metaTitle}
              onChange={onSEOChange}
              className="block w-full text-sm p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Meta Description
            </label>
            <textarea
              name="metaDescription"
              value={seoData.metaDescription}
              onChange={onSEOChange}
              rows="4"
              className="block w-full text-sm p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Keywords</label>
            <input
              type="text"
              name="keywords"
              value={seoData.keywords}
              onChange={onSEOChange}
              className="block w-full text-sm p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={onSEOUpdate}
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

export default SEODrawer;
