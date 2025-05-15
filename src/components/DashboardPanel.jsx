import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
  return (
    <div className="w-[205px] bg-white p-3 flex flex-col gap-4 h-screen overflow-hidden m-3">
   
      <div className="text-lg font-bold text-gray-800">Projects</div>

      
      <div className="flex flex-col gap-2">
        {projects.map((project) => (
          <div
            key={project.name}
            className={`flex items-center  px-3 py-1.5 rounded-md text-sm font-medium ${
              project.active
                ? "bg-violet-500 text-white"
                : "bg-white text-gray-800 border border-gray-100"
            }`}
          >
            <span className="text-lg">{project.icon}</span>
            <span>{project.name}</span>
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

      {/* Commits Box */}
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

      {/* Circular Time Chart */}
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
              pathColor: "#facc15", // yellow-300
              trailColor: "#bfdbfe", // blue-200
              textColor: "#1f2937",  // gray-800
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPanel;
