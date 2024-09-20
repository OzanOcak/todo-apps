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

  return (
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
        {edit ? (
          <input
            type="text"
            value={task.title}
            onChange={(e) =>
              setTasks(
                filteredTasks.map((t) =>
                  t.id === task.id ? { ...t, title: e.target.value } : t
                )
              )
            }
          />
        ) : (
          <p>{task.title}</p>
        )}
      </div>
      <div className="buttons">
        <button
          onClick={() => {
            setEdit(true);
          }}
          className="bg-green-600 text-white rounded-lg px-5 mx-2"
        >
          Edit
        </button>
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
