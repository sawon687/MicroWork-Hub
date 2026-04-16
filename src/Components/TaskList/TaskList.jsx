import React from "react";
import TaskCard from '../TaskCard/TaskCard';
import { getTaskData } from '../../app/all-tasks/page';


const TaskList = async ({ search, page, category }) => {
    console.log('searach',search,'page',page,'ctegor',category)
  const data = await getTaskData(search || "", page || 1, category || "");

  const taskdata = data?.result || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 w-full">
      {taskdata.length > 0 ? (
        taskdata.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No tasks found
        </p>
      )}
    </div>
  );
};

export default TaskList;