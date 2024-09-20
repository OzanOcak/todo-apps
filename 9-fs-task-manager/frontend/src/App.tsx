import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import FilterButtons from "./components/FilterButtons";
import TaskList from "./components/TaskList";

type Task = { id: number; title: string; isCompleted: boolean };

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "study react", isCompleted: true },
  ]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 mt-4 w-11/12 md:w-8/12">
        <TaskForm tasks={tasks} setTasks={setTasks} />
        <FilterButtons tasks={tasks} setFilteredTasks={setFilteredTasks} />
        <TaskList setTasks={setTasks} filteredTasks={filteredTasks} />
      </div>
    </div>
  );
}
