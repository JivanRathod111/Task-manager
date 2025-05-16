import React, { useState } from 'react';
import {
  FiPlus,
  FiRotateCw,
  FiMaximize2,
  FiSliders,
  FiMenu,
  FiX,
} from 'react-icons/fi';

const tabs = ['Description', 'Board', 'Notes', 'Test'];

const BoardNavbar = () => {
  const [activeTab, setActiveTab] = useState('Board');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const avatars = [
    { id: 'user1' },
    { id: 'user2' },
    { id: 'user3' },
  ];

  return (
    <div className="w-full p-3 bg-white shadow-sm rounded-lg border-gray-100 m-1  relative">
      

      <div className="absolute top-4 right-4 md:hidden z-20">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-700 text-2xl"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

  
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <img src="/img1.jpg" alt="Project" className="w-8 h-8" />
          </div>
          <div>
            <div className="w-[280px] md:w-[30em] h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '68%' }} />
            </div>
            <p className="text-sm text-gray-500 mt-1">68% complete</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={`https://i.pravatar.cc/40?u=${avatar.id}`}
                alt="avatar"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            ))}
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm text-gray-700 font-medium border-2 border-white">
              +1
            </div>
          </div>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FiPlus className="text-sm" />
            Add board
          </button>
        </div>
      </div>

      
      <div
        className={`mt-6 transition-all duration-300 ${
          isMenuOpen ? 'block' : 'hidden'
        } md:block`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
     
          <div className="flex gap-6 border-b border-gray-200 pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-lg font-medium pb-2 border-b-2 transition-all duration-300 ${
                  activeTab === tab
                    ? 'border-indigo-500 text-black'
                    : 'border-transparent text-gray-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

 
          <div className="flex items-center gap-4 text-xl text-gray-600 mt-4 md:mt-0">
            <FiRotateCw className="cursor-pointer" />
            <FiMaximize2 className="cursor-pointer" />
            <FiSliders className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardNavbar;
