import { useState } from 'react';

type Priority = 'p1' | 'p2' | 'p3';

type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: Priority;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [taskItem, setTaskItem] = useState<string>('');

  function handleAddItem() {
    const trimmedTaskItem = taskItem.trim();

    if (!trimmedTaskItem) {
      return;
    }
    setTasks([
      ...tasks,
      { id: new Date().getTime(), title: trimmedTaskItem, isCompleted: false },
    ]);
    setTaskItem('');
  }

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <>
      <h1>Task</h1>
      <label className="sr-only-" htmlFor="task-input">
        Add Task:
      </label>
      <input
        value={taskItem}
        onChange={(e) => setTaskItem(e.target.value)}
        id="task-input"
        onKeyDown={onInputKeyDown}
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
