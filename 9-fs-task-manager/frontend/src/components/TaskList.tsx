import { Task } from "../types";
import TaskListItem from "./TaskListItem";

type TaskListProps = {
  setTasks: (tasks: Task[]) => void;
  filteredTasks: Task[];
};

export default function TaskList({ setTasks, filteredTasks }: TaskListProps) {
  return (
    <div className="task_list">
      <ul className="list-disc pl-5">
        {filteredTasks.length > 0
          ? filteredTasks.map((task) => (
              <li
                key={task.id}
                className="text-gray-700 mb-2 py-1 bg-slate-200 list-none rounded-md"
              >
                <TaskListItem
                  task={task}
                  setTasks={setTasks}
                  filteredTasks={filteredTasks}
                />
              </li>
            ))
          : " -- Ooops, no tasks to show! --"}
      </ul>
    </div>
  );
}
