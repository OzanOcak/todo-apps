## React zero to hero

### Developing a Task Manager-1

In this tutorial, we will build a simple Task Manager application using React. We'll cover how to manage state with the useState hook, handle form submissions, and dynamically update the UI with user input.

##### Step 1: Setting Up the Component

First, we need to create our main component, App. This component will contain our form for adding new tasks and display the list of tasks.

```ts
export default function App() {
  const handleSubmit = (e: React.FormEvent) => {
    console.log("newTask is added");
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

##### Step 2: Initialize State for New Task Input

UseState hook originally is a closure which allow us to access to memory to save data and it enables encapsulation so we can only modify the paricular space via setNewTask function of the use State. So we need to define a useState hook` const [newTask, setNewTask] = useState<string>("");` within the top of App function.

- Note that if we don't assign empty string as a default value to useState hook, it will give error.

##### Step 3: Initialize State for the Task List

Now we can start creating the list, first we need temporily a storage for our list

```ts
const [tasks, setTasks] = useState<Task[]>([
  { id: 1, title: "study react", isCompleted: false },
]);
```

#### Step 4: Handle Form Submission

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

##### Step 5: Display the Task List

We can now render our list of tasks using the map function:

```ts
<ul>
  {tasks.map((task) => (
    <li key={task.id}>{task.title}</li>
  ))}
</ul>
```
