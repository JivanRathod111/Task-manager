import React, { useState } from "react";
import {
  Circle,
  LayoutList,
  FileText,
  Inbox,
  Tv,
  MessageSquare,
  Trash,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const SidebarIcons = () => {
  const [active, setActive] = useState("layout");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { id: "layout", label: "Dashboard", icon: LayoutList },
    { id: "file", label: "Files", icon: FileText },
    { id: "inbox", label: "Inbox", icon: Inbox },
    { id: "tv", label: "Monitor", icon: Tv },
    { id: "chat", label: "Chat", icon: MessageSquare },
  ];

  return (
    <>
   
      <div
        className={`fixed top-0 left-0 h-screen w-[65px] z-40 bg-white border-r flex flex-col justify-between items-center py-3 transition-transform duration-300 border-white
        ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        
        <div className="flex flex-col items-center gap-3">
          <div className="p-1.5 rounded-full bg-violet-100 mb-[20px]">
            <Circle className="text-violet-600" size={26} />
          </div>

         
          <div className="flex flex-col gap-3">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`p-2 rounded-md transition ${
                  active === id
                    ? "bg-violet-100 text-violet-600"
                    : "text-gray-500 hover:text-violet-600"
                }`}
                title={label}
              >
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>

       
        <div className="mb-10">
          <Trash
            size={20}
            className="text-gray-400 hover:text-red-500"
            title="Trash"
          />
        </div>
      </div>

   
      <button
        className="sm:hidden fixed top-3 left-3 z-50 bg-white p-2 rounded-full shadow-md border"
        onClick={() => setIsMobileOpen((prev) => !prev)}
      >
        {isMobileOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
    </>
  );
};

export default SidebarIcons;
