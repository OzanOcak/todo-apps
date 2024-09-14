import { useState } from 'react';

type Priority = 'p1' | 'p2' | 'p3';

type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: Priority;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Learn React', isCompleted: true },
    { id: 2, title: 'Create React Tutorial', isCompleted: true },
    { id: 3, title: 'Develop React Project', isCompleted: false },
  ]);

  const [taskItem, setTaskItem] = useState<string>('');

  function handleAddItem() {
    setTasks([...tasks, { id: 1, title: taskItem, isCompleted: false }]);
  }

  return (
    <>
      <h1>Task</h1>
      <label className="sr-only" htmlFor="task-imput">
        Add Task:
      </label>
      <input
        value={taskItem}
        onChange={(e) => setTaskItem(e.target.value)}
        id="task-input"
      />
      <button onClick={handleAddItem}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
