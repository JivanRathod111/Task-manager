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
    <div className="flex flex-wrap justify-between items-center p-3 bg-white shadow-sm m-1 rounded-lg gap-2 relative">
     
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg w-full md:w-64">
        <FiSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-sm text-gray-700 w-full"
        />
      </div>

  
      <div className="flex items-center gap-4 ml-auto">
        <FiMail className="text-gray-500 text-lg md:text-xl cursor-pointer" />
        <FiBell className="text-gray-500 text-lg md:text-xl cursor-pointer" />
        <button onClick={handleLogout}>
          <FiLogOut className="text-gray-500 text-lg md:text-xl cursor-pointer" />
        </button>

        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-yellow-200 flex items-center justify-center">
              <span className="text-lg md:text-2xl">👩🏼‍💻</span>
            </div>
            <div className="hidden md:block">
              <div className="font-semibold text-sm text-black">
                Alexandra C.
              </div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
