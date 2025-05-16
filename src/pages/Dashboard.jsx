import React, { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SidebarIcons from '../components/SidebarIcons';
import TopNavbar from '../components/TopNavbar';
import BoardNavbar from '../components/BoardNavbar';
import DashboardPanel from '../components/DashboardPanel';
import TaskColumn from '../components/TaskColumn';
import TaskFormModal from '../components/TaskFormModal';

import TaskCard from '../components/TaskCard'; 
import supabase from '../utils/supabase';

const columns = ['New', 'In progress', 'Review', 'Done'];

const Dashboard = () => {
  const [columnsData, setColumnsData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [activeTask, setActiveTask] = useState(null);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) {
      console.error('Error fetching tasks:', error);
      return;
    }

    const grouped = {};
    columns.forEach((col) => (grouped[col] = []));
    data.forEach((task) => {
      const col = task.status || 'New';
      if (!grouped[col]) grouped[col] = [];
      grouped[col].push(task);
    });
    setColumnsData(grouped);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragStart = ({ active }) => {
    const taskId = active.id;
    for (const col of columns) {
      const task = columnsData[col].find((t) => t.id === taskId);
      if (task) {
        setActiveTask(task);
        break;
      }
    }
  };

  const handleDragEnd = async ({ active, over }) => {
    setActiveTask(null);
    if (!over) return;
  
    const activeId = active.id;
    const overId = over.id;
  
    let sourceCol, targetCol;
    for (const col of columns) {
      if (columnsData[col].some((t) => t.id === activeId)) sourceCol = col;
    }

    if (columns.some(col => columnsData[col].some(t => t.id === overId))) {
      for (const col of columns) {
        if (columnsData[col].some((t) => t.id === overId)) {
          targetCol = col;
          break;
        }
      }
    } else if (columns.includes(overId)) {

      targetCol = overId;
    }
  
    if (!sourceCol || !targetCol || sourceCol === targetCol) return;
  
    const taskIndex = columnsData[sourceCol].findIndex((t) => t.id === activeId);
    const task = columnsData[sourceCol][taskIndex];
    const updatedTask = { ...task, status: targetCol };
  
    const newColumns = { ...columnsData };
    newColumns[sourceCol].splice(taskIndex, 1);
    newColumns[targetCol] = [updatedTask, ...newColumns[targetCol]];
    setColumnsData(newColumns);
  
    await supabase.from('tasks').update({ status: targetCol }).eq('id', task.id);
  };
  

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <aside className="flex flex-col sticky top-0 h-screen z-10 bg-white border-r border-gray-100">
        <div className="flex">
          <div className="w-16 pt-6">
            <SidebarIcons />
          </div>
          <div className="hidden md:block">
  <DashboardPanel />
</div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <BoardNavbar onAddTask={() => setOpenModal(true)} />

        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 px-6 py-4 overflow-x-auto">
            {columns.map((col) => (
         <SortableContext
         key={col}
         items={(columnsData[col] || []).map((t) => t.id)}
         strategy={verticalListSortingStrategy}
       >
         <TaskColumn
           title={col}
           tasks={columnsData[col] || []}
           onAdd={() => setOpenModal(true)}
         />
       </SortableContext>
       
            ))}
          </div>

          <DragOverlay dropAnimation={{ duration: 250, easing: 'ease-in-out' }}>
            {activeTask ? (
              <TaskCard task={activeTask} dragPreview />
            ) : null}
          </DragOverlay>
        </DndContext>

        {openModal && (
          <TaskFormModal
            onClose={() => setOpenModal(false)}
            onTaskCreated={fetchTasks}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
