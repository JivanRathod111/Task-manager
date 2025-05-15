import React, { useState } from "react";
import {
  Circle,
  LayoutList,
  FileText,
  Inbox,
  Tv,
  MessageSquare,
  Trash,
} from "lucide-react";

const SidebarIcons = () => {
  const [active, setActive] = useState("layout");

  const navItems = [
    { id: "layout", icon: <LayoutList size={18} /> },
    { id: "file", icon: <FileText size={18} /> },
    { id: "inbox", icon: <Inbox size={18} /> },
    { id: "tv", icon: <Tv size={18} /> },
    { id: "chat", icon: <MessageSquare size={18} /> },
  ];

  return (
    <div className="h-full w-[65px] bg-white border-r flex flex-col items-center justify-between py-3 sticky top-0 border-white">
      
      <div className="flex flex-col items-center gap-3">
        <div className="p-1.5 rounded-full bg-violet-100 mb-[20px]">
          <Circle className="text-violet-600" size={26} />
        </div>

        
        <div className="flex flex-col gap-3 mt-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`p-1.5 rounded-md transition ${
                active === item.id
                  ? "bg-violet-100 text-violet-600"
                  : "text-gray-500 hover:text-violet-600"
              }`}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <Trash size={18} className="text-gray-400 hover:text-red-500" />
      </div>
    </div>
  );
};

export default SidebarIcons;
