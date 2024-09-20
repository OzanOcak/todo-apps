import { useState } from "react";
import { Task } from "../types";

type TaskFormProps = {
  tasks: Task[];
  setTasks: (task: Task[]) => void;
};

export default function TaskForm({ tasks, setTasks }: TaskFormProps) {
  const [newTask, setNewTask] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks([
      ...tasks,
      { id: new Date().getTime(), title: newTask, isCompleted: false },
    ]);
    setNewTask("");
  };
  return (
    <div className="taskForm">
      <h1 className="text-2xl font-semibold text-center mb-4">Task Manager</h1>

      <form onSubmit={handleSubmit} className="flex mb-4">
        <label htmlFor="input-text">New Task:</label>
        <input
          id="input-text"
          type="text"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
          className="flex-grow border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new task"
        />
        <button className="bg-blue-500 text-white rounded-r-md py-2 px-4 hover:bg-blue-600">
          ADD
        </button>
      </form>
    </div>
  );
}
