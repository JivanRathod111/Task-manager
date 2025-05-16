import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    touchAction: "none", 
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white rounded-sm shadow p-4 select-none touch-none"
    >
      <div className="flex items-center gap-2 mb-2">
        <img
          src={`https://i.pravatar.cc/40?u=${task.id}`}
          alt="avatar"
          className="w-6 h-6 rounded-full"
        />
        <h3 className="text-sm font-semibold">{task.name}</h3>
        <div className="ml-auto text-gray-400 cursor-pointer">⋮</div>
      </div>
      <p className="text-sm text-gray-500">{task.description}</p>
      <span
        className={`inline-block mt-3 px-3 py-1 text-xs rounded-full ${
          task.priority === "Must"
            ? "bg-red-100 text-red-500"
            : "bg-green-100 text-green-500"
        }`}
      >
        {task.priority}
      </span>
    </div>
  );
};

export default TaskCard;
