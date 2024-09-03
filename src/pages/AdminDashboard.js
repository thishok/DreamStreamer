import React from 'react';

const AdminDashboard = ({ signOut }) => {
  return (
    <div className="w-full h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
      <button
        onClick={signOut}
        className="mt-5 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
      >
        Sign Out
      </button>
    </div>
  );
};

export default AdminDashboard;
