import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

const DreamStreamer = ({ signOut }) => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  // Fetch all albums on load
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('https://hcqsf0khjj.execute-api.us-east-1.amazonaws.com/dev/albums');
        setAlbums(response.data.albums);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  // Function to play the selected track
  const playTrack = (trackUrl, index) => {
    if (audio) {
      audio.pause();
    }

    const newAudio = new Audio(trackUrl);
    newAudio.play();
    setAudio(newAudio);
    setCurrentTrackIndex(index);
    setIsPlaying(true);

    newAudio.addEventListener('ended', () => {
      setIsPlaying(false);
    });
  };

  // Function to toggle play/pause
  const togglePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Play the next track
  const playNextTrack = () => {
    if (selectedAlbum && currentTrackIndex < selectedAlbum.tracks.length - 1) {
      playTrack(selectedAlbum.tracks[currentTrackIndex + 1].trackUrl, currentTrackIndex + 1);
    }
  };

  // Play the previous track
  const playPreviousTrack = () => {
    if (selectedAlbum && currentTrackIndex > 0) {
      playTrack(selectedAlbum.tracks[currentTrackIndex - 1].trackUrl, currentTrackIndex - 1);
    }
  };

  // Select an album and show its tracks
  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
    setCurrentTrackIndex(0); // Reset to the first track when an album is selected
  };

  if (!albums.length) return <p>Loading albums...</p>;

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
        {/* Sidebar - Album List */}
        <aside className="w-1/4 bg-gray-800 p-4">
          <h2 className="text-lg font-bold mb-4">Albums</h2>
          <ul className="space-y-4">
            {albums.map((album) => (
              <li key={album.albumId} onClick={() => handleAlbumClick(album)} className="cursor-pointer">
                <img
                  src={album.albumArtUrl}
                  alt={album.albumName}
                  className="w-40 h-40 rounded-lg hover:opacity-80 transition duration-200"
                />
                <p className="text-center mt-2">{album.albumName}</p>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content Area - Show Tracks after an Album is Selected */}
        <main className="flex-grow p-6">
          {selectedAlbum ? (
            <>
              {/* Album Info */}
              <section className="mb-8">
                <div className="flex items-center">
                  <img
                    src={selectedAlbum.albumArtUrl}
                    alt="Album Art"
                    className="w-40 h-40 rounded-lg mr-6"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">{selectedAlbum.albumName}</h2>
                    <p className="text-gray-400">Artists: {selectedAlbum.artists.join(', ')}</p>
                    <p className="text-gray-400">Band Composition: {selectedAlbum.bandComposition}</p>
                    <p className="text-gray-400">Album Year: {selectedAlbum.albumYear}</p>
                  </div>
                </div>
              </section>

              {/* Track List */}
              <section>
                <h3 className="text-lg font-bold mb-4">Tracks</h3>
                <ul className="space-y-2">
                  {selectedAlbum.tracks.map((track, index) => (
                    <li
                      key={index}
                      className={`bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition duration-200 cursor-pointer ${index === currentTrackIndex ? 'bg-gray-700' : ''}`}
                      onClick={() => playTrack(track.trackUrl, index)}
                    >
                      <p className="font-semibold">{track.trackName}</p>
                      <p className="text-gray-400">Label: {track.trackLabel}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          ) : (
            <p>Please select an album to view the tracks.</p>
          )}
        </main>
      </div>

      {/* Music Player */}
      {selectedAlbum && (
        <footer className="bg-gray-800 p-4 fixed bottom-0 w-full">
          <div className="flex items-center justify-between">
            {/* Album Art and Track Info */}
            <div className="flex items-center">
              <img
                src={selectedAlbum.albumArtUrl}
                alt="Album Art"
                className="w-12 h-12 rounded-lg mr-4"
              />
              <div>
                <p className="text-sm font-semibold">{selectedAlbum.tracks[currentTrackIndex].trackName}</p>
                <p className="text-xs text-gray-400">Artists: {selectedAlbum.artists.join(', ')}</p>
              </div>
            </div>

            {/* Player Controls */}
            <div className="flex items-center space-x-4">
              <button
                className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-200"
                onClick={playPreviousTrack}
              >
                <FaStepBackward className="text-white" />
              </button>
              <button
                className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-200"
                onClick={togglePlayPause}
              >
                {isPlaying ? <FaPause className="text-white" /> : <FaPlay className="text-white" />}
              </button>
              <button
                className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-200"
                onClick={playNextTrack}
              >
                <FaStepForward className="text-white" />
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default DreamStreamer;
