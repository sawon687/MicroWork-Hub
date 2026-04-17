import TaskCardSkeleton from './TaskCardSkeleton ';

 const TaskGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 py-12">
    {[...Array(9)].map((_, i) => (
      <TaskCardSkeleton key={i} />
    ))}
  </div>
);

export default TaskGridSkeleton;