import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiMail, FiBell, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const TopNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm m-1 rounded-lg relative">
   
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg w-64">
        <FiSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-sm text-gray-700 w-full"
        />
      </div>

   
      <div className="flex items-center gap-6">
        <FiMail className="text-gray-500 text-xl cursor-pointer" />
        <FiBell className="text-gray-500 text-xl cursor-pointer" />

        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="w-9 h-9 rounded-full bg-yellow-200 flex items-center justify-center">
              <span className="text-2xl">👩🏼‍💻</span>
            </div>
            <div>
              <div className="font-semibold text-sm text-black">Alexandra C.</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>

   
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-b-50 hover:text-red-700 transition-all bg-violet-100 text-violet-600
                text-gray-500 hover:text-violet-600"
              >
                <FiLogOut className="text-base" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;

