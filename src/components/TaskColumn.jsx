import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, onAdd }) => {
  const { setNodeRef, isOver } = useDroppable({ id: title });

  return (
    <div
      ref={setNodeRef}
      className={`w-72 rounded-md transition-colors  p-2 ${
        isOver ? 'bg-blue-50' : ''
      }`}
    >
      <div className="flex items-center justify-between px-2 pb-2">
        <div className="text-sm font-bold uppercase">{title}</div>
        <div className="w-12 text-center text-sm text-gray-600 bg-white rounded-xl p-1">
          {tasks.length}
        </div>
      </div>

      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
      <button
        onClick={onAdd}
        className="w-full mt-3 bg-white border border-dashed border-gray-300 text-gray-500 text-sm font-medium py-2 rounded-sm hover:bg-gray-100"
      >
        + Add Task
      </button>
    </div>
  );
};

export default TaskColumn;
