import React, { useEffect, useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

const projects = [
  { name: "Building enterprise", icon: "🏙️", active: true },
  { name: "Web platform", icon: "🌐" },
  { name: "Mac website", icon: "🍔" },
  { name: "Cosmetic web app", icon: "💅" },
];

const activityData = [
  { value: 30 },
  { value: 20 },
  { value: 25 },
  { value: 15 },
  { value: 25 },
  { value: 10 },
  { value: 5 },
];

const DashboardPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
     
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-violet-600 bg-white border border-gray-200 rounded-full p-1 shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <CircleChevronLeft size={20} />
        ) : (
          <CircleChevronRight size={20} />
        )}
      </button>

      <div
        className={`fixed md:static top-0 left-0 z-40 bg-white h-full md:h-screen overflow-y-auto md:overflow-hidden transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        w-60 md:w-[205px] p-4 flex flex-col gap-4 shadow md:shadow-none`}
      >
        <div className="text-lg font-bold text-gray-800">Projects</div>

        <div className="flex flex-col gap-2">
          {projects.map((project) => (
            <div
              key={project.name}
              className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium truncate ${
                project.active
                  ? "bg-violet-500 text-white"
                  : "bg-white text-gray-800 border border-gray-100"
              }`}
            >
              <span className="text-lg">{project.icon}</span>
              <span className="ml-2 truncate">{project.name}</span>
            </div>
          ))}
        </div>

       
        <div className="p-3 rounded-lg border border-gray-100 shadow-sm">
          <div className="text-center text-[10px] text-gray-500 font-medium">
            TOTAL TIME
          </div>
          <div className="text-center text-xl font-bold mt-1">
            2d <span className="text-base">3h</span>
          </div>
          <div className="mt-2 w-full h-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-[10px] text-gray-400 text-right mt-1">
              Activity ↑ 30%
            </p>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-gray-100 shadow-sm">
          <div className="text-center text-[10px] text-gray-500 font-medium mb-1">
            COMMITS
          </div>
          <div className="flex items-end justify-between h-14">
            {[20, 14, 14, 8, 8, 20, 14].map((h, i) => (
              <div
                key={i}
                className={`w-1 ${
                  i === 3 ? "bg-red-500" : "bg-violet-500"
                } rounded`}
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>

       
        <div className="p-3 rounded-lg border border-gray-100 shadow-sm">
          <div className="text-center text-[10px] text-gray-500 font-medium mb-1">
            TIME
          </div>
          <div className="w-20 h-20 mx-auto">
            <CircularProgressbar
              value={68}
              text={`68%`}
              styles={buildStyles({
                textSize: "28px",
                pathColor: "#facc15",
                trailColor: "#bfdbfe",
                textColor: "#1f2937",
              })}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPanel;
