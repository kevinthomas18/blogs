import React from "react";

const Modal = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  // Handle outside click to close the modal
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-container") {
      onClose();
    }
  };

  return (
    <div
      id="modal-container"
      onClick={handleOutsideClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
