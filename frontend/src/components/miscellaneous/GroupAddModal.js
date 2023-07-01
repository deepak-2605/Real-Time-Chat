import React from "react";

const groupAddModal = ({ isOpen,onClose }) => {
  return (
    <div>
      {isOpen && (
        <div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-1/2 p-0 rounded shadow-lg border-black border-4">
              <div className="bg-green-300 flex h-16 items-center justify-center">
                <h2 className="text-2xl font-bold text-center mb-4">
                  Modify the text
                </h2>
              </div>
              <div className="flex items-center justify-center mb-2">
                <img
                  //src={profilePic}
                  alt="user image"
                  className="w-36 h-36 object-cover"
                  style={{ borderRadius: 72 }}
                />
              </div>
              <p className="text-center">Email Id : </p>
              <button
                className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default groupAddModal;
