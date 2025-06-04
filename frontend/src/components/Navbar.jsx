import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      {/* Left Section: Logo + Search */}
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold">
          <Link to="/">NoteApp</Link>
        </div>
        <input
          type="text"
          placeholder="Search notes..."
          className="bg-gray-600 px-4 py-2 rounded"
        />
      </div>

      {/* Right Section: Auth Links */}
      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded">
              Login
            </Link>
            <Link to="/signup" className="bg-green-500 px-4 py-2 rounded">
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="mr-4">{user.name}</span>
            <button className="bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
