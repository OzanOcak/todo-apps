import { Task } from "../types";

type FilterButtonsProps = {
  tasks: Task[];
  setFilteredTasks: (tasks: Task[]) => void;
};

export default function FilterButtons({
  tasks,
  setFilteredTasks,
}: FilterButtonsProps) {
  return (
    <div className="filters flex justify-around mb-4">
      <button
        onClick={() => setFilteredTasks(tasks.filter((task) => task))}
        className="text-blue-500 px-2 hover:bg-blue-400 hover:text-white hover:px-2 hover:rounded-md"
      >
        all tasks
      </button>
      <button
        onClick={() =>
          setFilteredTasks(tasks.filter((task) => task.isCompleted === true))
        }
        className="text-blue-500 px-2 hover:bg-blue-400 hover:text-white hover:px-2 hover:rounded-md"
      >
        completed tasks
      </button>
      <button
        onClick={() =>
          setFilteredTasks(tasks.filter((task) => task.isCompleted === false))
        }
        className="text-blue-500 px-2 hover:bg-blue-400 hover:text-white hover:px-2 hover:rounded-md"
      >
        uncompleted tasks
      </button>
    </div>
  );
}
