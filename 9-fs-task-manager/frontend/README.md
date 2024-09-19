## React zero to hero

#### Developing UI

```ts
export default function App() {
  const handleSubmit = (e: React.FormEvent) => {
    console.log(newTask);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-text">New Task:</label>
        <input id="input-text" type="text" />
        <button>ADD</button>
      </form>
    </div>
  );
}
```

We need to add `e.preventDefault();` in handleSubmit to avoid refreshing the page. Input should have `value={newTask} onChange={(e) => setNewTask(e.target.value)}` properties to be able to store data in the memory via useState hook.

UseState hook originally is a closure which allow us access to memory to save data and it enable encapsulation so we can only modify the paricular space via setNewTask function of the use State. So we need to define a useState hook` const [newTask, setNewTask] = useState<string>("");` within the top of App function.

- Note that if we don't assign empty string as a default value to useState hook, it will give error.

Now we can start creating the list, first we need temporily a storage for our list

```ts
const [tasks, setTasks] = useState<Task[]>([
  { id: 1, title: "study react", isCompleted: false },
]);
```

Then we need to add a new task to the list with useState function instead of `console.log()`.

- Note that tasks type is array so whatever value setTask takes must be an array and we get previous arry with `...` operator then add new object at the end of it.

```ts
setTasks([
  ...tasks,
  { id: new Date().getTime(), title: newTask, isCompleted: false },
]);
setNewTask("");
```

Last line of the code to clean up the text input after submiting the data.
