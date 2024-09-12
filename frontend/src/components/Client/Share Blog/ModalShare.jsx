import React from "react";
import ReactDOM from "react-dom";

const ModalShare = ({ isOpen, onClose, blogLink, shareOnSocialMedia }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-[60%]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Share Blog</h2>
        <div className="mb-4">
          <p className="font-semibold my-2">Blog Link</p>
          <a
            href={blogLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {blogLink}
          </a>
        </div>
        <p className="font-semibold my-2">Share On Social Media</p>

        <div className="flex flex-row space-x-2">
          <button
            onClick={() => shareOnSocialMedia("facebook")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Share on Facebook
          </button>
          <button
            onClick={() => shareOnSocialMedia("twitter")}
            className="bg-blue-400 text-white px-4 py-2 rounded"
          >
            Share on Twitter
          </button>
          <button
            onClick={() => shareOnSocialMedia("linkedin")}
            className="bg-blue-800 text-white px-4 py-2 rounded"
          >
            Share on LinkedIn
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-300 px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ModalShare;
