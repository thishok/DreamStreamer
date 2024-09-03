import React from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

const DreamStreamer = ({ signOut }) => {
  return (
    <div className="w-full h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gray-800">
        <h1 className="text-2xl font-bold">DreamStreamer</h1>
        <button
          onClick={signOut}
          className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
        >
          Sign Out
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-1/4 bg-gray-800 p-4">
          <h2 className="text-lg font-bold mb-4">Genres</h2>
          <ul>
            <li className="mb-2 hover:text-gray-400 cursor-pointer">Metal</li>
            <li className="mb-2 hover:text-gray-400 cursor-pointer">Rock</li>
            <li className="mb-2 hover:text-gray-400 cursor-pointer">Pop</li>
            <li className="mb-2 hover:text-gray-400 cursor-pointer">Hip Hop</li>
            <li className="mb-2 hover:text-gray-400 cursor-pointer">Reggae</li>
            <li className="mb-2 hover:text-gray-400 cursor-pointer">Classical</li>
          </ul>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-6">
          {/* Search and Filter */}
          <div className="flex items-center justify-between mb-6">
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-xs p-2 bg-gray-700 text-white rounded"
            />
            <button className="ml-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
              Filter
            </button>
          </div>

          {/* Album Info */}
          <section className="mb-8">
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Album Art"
                className="w-40 h-40 rounded-lg mr-6"
              />
              <div>
                <h2 className="text-2xl font-bold">Album Title</h2>
                <p className="text-gray-400">Artist Name</p>
                <p className="text-gray-400">Band Composition: Lead Vocal, Guitar, Drums</p>
                <p className="text-gray-400">Album Year: 2024</p>
              </div>
            </div>
          </section>

          {/* Track List */}
          <section>
            <h3 className="text-lg font-bold mb-4">Tracks</h3>
            <ul className="space-y-2">
              <li className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition duration-200">
                <p className="font-semibold">Track 1 - Song Title</p>
                <p className="text-gray-400">Label: Label Name</p>
              </li>
              <li className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition duration-200">
                <p className="font-semibold">Track 2 - Song Title</p>
                <p className="text-gray-400">Label: Label Name</p>
              </li>
              <li className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition duration-200">
                <p className="font-semibold">Track 3 - Song Title</p>
                <p className="text-gray-400">Label: Label Name</p>
              </li>
              {/* Add more tracks as needed */}
            </ul>
          </section>
        </main>
      </div>

      {/* Music Player */}
      <footer className="bg-gray-800 p-4 fixed bottom-0 w-full">
        <div className="flex items-center justify-between">
          {/* Album Art and Track Info */}
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/50"
              alt="Album Art"
              className="w-12 h-12 rounded-lg mr-4"
            />
            <div>
              <p className="text-sm font-semibold">Song Title</p>
              <p className="text-xs text-gray-400">Artist Name</p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-200">
              <FaStepBackward className="text-white" />
            </button>
            <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-200">
              <FaPlay className="text-white" />
            </button>
            <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-200">
              <FaStepForward className="text-white" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-1/3">
            <span className="text-xs text-gray-400">1:32</span>
            <div className="w-full h-1 bg-gray-600 rounded-full">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '50%' }}></div>
            </div>
            <span className="text-xs text-gray-400">3:45</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DreamStreamer;
