import { useState } from "react";
import { Task } from "../types";

type TaskListItemProps = {
  task: Task;
  setTasks: (tasks: Task[]) => void;
  filteredTasks: Task[];
};

export default function TaskListItem({
  task,
  setTasks,
  filteredTasks,
}: TaskListItemProps) {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(task.title); // State for the input value

  const toggleCheckbox = () =>
    setTasks(
      filteredTasks.map((t) =>
        t.id === task.id
          ? {
              ...t,
              isCompleted: !t.isCompleted,
            }
          : t
      )
    );

  const saveEdit = () => {
    setTasks(
      filteredTasks.map((t) =>
        t.id === task.id ? { ...t, title: editTitle } : t
      )
    );
    setEdit(false); // Exit edit mode
  };

  return (
    <div className="flex px-2 justify-between">
      <div className="flex">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={toggleCheckbox}
          className="mx-4"
        />
        {edit ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        ) : (
          <p>{task.title}</p>
        )}
      </div>
      <div className="buttons">
        {!edit ? (
          <button
            onClick={() => {
              setEdit(true);
            }}
            className="bg-green-600 text-white rounded-lg px-5 mx-2"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={saveEdit}
              className="bg-blue-600 text-white rounded-lg px-2 ml-1"
            >
              Save
            </button>
            <button
              onClick={() => setEdit(false)}
              className="bg-red-600 text-white rounded-lg px-2 mx-1"
            >
              Cancel
            </button>
          </>
        )}
        <button
          onClick={() =>
            setTasks(filteredTasks.filter((t) => task.id !== t.id))
          }
          className="bg-red-600 text-white rounded-lg px-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
