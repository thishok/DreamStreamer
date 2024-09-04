import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = ({ signOut }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // Fetch all albums on load
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

  // Delete album function
  const handleDeleteAlbum = async (albumId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this album?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://hcqsf0khjj.execute-api.us-east-1.amazonaws.com/dev/albums/${albumId}`);
      alert('Album deleted successfully');
      setAlbums(albums.filter(album => album.albumId !== albumId)); // Remove the deleted album from state
    } catch (error) {
      console.error('Error deleting album:', error);
      alert('Failed to delete album');
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white flex flex-col">
      <header className="flex justify-between p-4 bg-gray-800">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={signOut}
          className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
        >
          Sign Out
        </button>
      </header>

      {/* Manage Albums Section */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Manage Albums</h2>

        {/* All Albums */}
        <div>
          <h3 className="text-lg font-bold mb-2">All Albums</h3>
          {albums.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album) => (
                <div key={album.albumId} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  {/* Album Information */}
                  <div className="mb-4">
                    <img
                      src={album.albumArtUrl}
                      alt={album.albumName}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold">{album.albumName}</h3>
                    <p className="text-gray-400">Genre: {album.genre}</p>
                    <p className="text-gray-400">Year: {album.albumYear}</p>
                    <p className="text-gray-400">Artists: {album.artists.join(', ')}</p>
                  </div>

                  {/* Tracklist */}
                  <div className="mb-4">
                    <h4 className="text-lg font-bold mb-2">Tracks</h4>
                    <ul className="space-y-2">
                      {album.tracks.map((track, index) => (
                        <li key={index} className="bg-gray-700 p-3 rounded-lg">
                          <p className="font-semibold">{track.trackName}</p>
                          <p className="text-gray-400">Label: {track.trackLabel}</p>
                          <audio controls className="w-full mt-2">
                            <source src={track.trackUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Delete Button */}
                  <div className="text-center">
                    <button
                      onClick={() => handleDeleteAlbum(album.albumId)}
                      className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                    >
                      Delete Album
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
