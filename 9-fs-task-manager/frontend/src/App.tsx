import React, { useEffect, useState } from "react";
import "./App.css";

type Task = { id: number; title: string; isCompleted: boolean };

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "study react", isCompleted: true },
  ]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [newTask, setNewTask] = useState<string>("");
  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks([
      ...tasks,
      { id: new Date().getTime(), title: newTask, isCompleted: false },
    ]);
    setNewTask("");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Task Manager
        </h1>

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
        <div className="filters flex justify-around mb-4">
          <button
            onClick={() => setFilteredTasks(tasks.filter((task) => task))}
            className="text-blue-500 hover:underline"
          >
            all tasks
          </button>
          <button
            onClick={() =>
              setFilteredTasks(
                tasks.filter((task) => task.isCompleted === true)
              )
            }
            className="text-blue-500 hover:underline"
          >
            completed tasks
          </button>
          <button
            onClick={() =>
              setFilteredTasks(
                tasks.filter((task) => task.isCompleted === false)
              )
            }
            className="text-blue-500 hover:underline"
          >
            uncompleted tasks
          </button>
        </div>
        <div className="task_list">
          <ul className="list-disc pl-5">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="text-gray-700 mb-2 py-1 bg-slate-200 list-none rounded-md"
              >
                <div className="flex px-2 justify-between">
                  <div className="flex">
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() =>
                        setTasks(
                          filteredTasks.map((t) =>
                            t.id === task.id
                              ? {
                                  ...t,
                                  isCompleted: !t.isCompleted,
                                }
                              : t
                          )
                        )
                      }
                      className="mx-4"
                    />
                    <p>{task.title}</p>
                  </div>
                  <button
                    onClick={() =>
                      setTasks(tasks.filter((t) => task.id !== t.id))
                    }
                    className="bg-red-600 text-white rounded-lg px-2"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
