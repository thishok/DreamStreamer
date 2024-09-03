import React from 'react';

const DreamStreamer = ({ signOut }) => {
  return (
    <div className="w-full h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to DreamStreamer</h1>
      {/* Your music player code will go here */}
      <button
        onClick={signOut}
        className="mt-5 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
      >
        Sign Out
      </button>
    </div>
  );
};

export default DreamStreamer;
