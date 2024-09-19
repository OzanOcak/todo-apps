## REACT

```console
npm create vite@latest todo-app -- --template react-ts
cd todo-app && npm install
npm run dev
```

App.tsx

```ts
type Priority = 'p1' | 'p2' | 'p3';

type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: Priority;
};

function App() {
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Learn React',
      isCompleted: true,
      priority: 'p1',
    },
  ];

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

Then we need to create a label for accessibility and text input for adding to list

```ts
<h1>Tasks</h1>
<label htmlFor='task-input'>Add Task: </label>
<input id='task-input' />
<button onClick={() =>  console.log('Add'); }>
    Add
</button>
```

if we add below properties in input component we can console it as output in terminal

```ts
<h1>Tasks</h1>
<label htmlFor='task-input'>Add Task: </label>
<input id='task-input' value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
<button onClick={() =>  console.log(taskname); }>
    Add
</button>
```
