import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white rounded-sm shadow p-4"
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
          task.priority === 'Must'
            ? 'bg-red-100 text-red-500'
            : 'bg-green-100 text-green-500'
        }`}
      >
        {task.priority}
      </span>
    </div>
  );
};

export default TaskCard;
