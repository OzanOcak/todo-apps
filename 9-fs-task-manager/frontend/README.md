## React zero to hero

### Developing a Task Manager

In this tutorial, we will build a simple Task Manager application using React. We'll cover how to manage state with the useState hook, handle form submissions, and dynamically update the UI with user input.

#### Step 1: Setting Up the Component

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

#### Step 2: Initialize State for New Task Input

UseState hook originally is a closure which allow us to access to memory to save data and it enables encapsulation so we can only modify the paricular space via setNewTask function of the use State. So we need to define a useState hook` const [newTask, setNewTask] = useState<string>("");` within the top of App function.

- Note that if we don't assign empty string as a default value to useState hook, it will give error.

#### Step 3: Initialize State for the Task List

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

#### Step 5: Display the Task List

We can now render our list of tasks using the map function:

```ts
<ul>
  {tasks.map((task) => (
    <li key={task.id}>{task.title}</li>
  ))}
</ul>
```

#### Step 6: Understanding Side Effects

After adding checkbox and delete button, we can start implementing the logic of the app. All we need modifying the list, however we also have filter buttons which should't modify the original list.Therefore we need to create new list for mofificaion and assign tasks list as initial value.
`const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);`

This new create llist will be mapped in the ui.

We also need to use **useEffect** for side effects because we need to modify filtered tasks list if any change happens with tasks
`  useEffect(() => { setFilteredTasks(tasks); }, [tasks]);`

For delete button we can modify the original list since we don't need to query deleted task: `onClick={() => setTasks(filteredTasks.filter((t) => task.id !== t.id))}`

For toggling checkbox input, we should need to be able uncheck the checkbox but we still modify the original list with setTasks method.

```ts
setTasks(
  filteredTasks.map((t) =>
    t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
  )
);
```

Finally we can implement logic of filter buttons.

```ts
  <button onClick={() =>
     setFilteredTasks(tasks.filter((task) => task))}> all tasks
  </button>
  <button onClick={() =>
     setFilteredTasks( tasks.filter((task) => task.isCompleted === true))}>completed tasks
  </button>
  <button onClick={() =>
     setFilteredTasks( tasks.filter((task) => task.isCompleted === false))}>uncompleted tasks
  </button>
```

Now our simple app is ready, all we need to is displaying filtersList with **_map_** function.

#### Dividing the App into components

If we want improve, add new features and/or test the application, we will have very hard time since the code base got larger sor we will divide it into the components.

we create 4 components and one type class, since we dont use a state management aproach, we use prop drilling for passing properties to child components, we also move some of states to child components. Our App.tsx file is much cleare now, we only have our temperorily database and useEffect to be notified any change in the tasks.

```ts
type Task = { id: number; title: string; isCompleted: boolean };

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "study react", isCompleted: true },
  ]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 mt-4 w-11/12 md:w-8/12">
        <TaskForm tasks={tasks} setTasks={setTasks} />
        <FilterButtons tasks={tasks} setFilteredTasks={setFilteredTasks} />
        <TaskList setTasks={setTasks} filteredTasks={filteredTasks} />
      </div>
    </div>
  );
}
```

#### Adding Edit Button

To add an edit button to task items, we need basic if statement to check if the edit button is clicked. Fist we need to create a boolean expression to create the logic` const [edit, setEdit] = useState<boolean>(false);` then we can create our program.

```ts
{
  edit ? (
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
  );
}
```

But above code has a big problem; if one of the edit button is clicked, all the tasks in item will be in edit mode therefor we need to send an id to find which one is clicked. There are 2 possible aproach for doing this; which are controlled and uncontrolled components.

#### Controlled and uncontrolled components

In React, the concepts of controlled and uncontrolled components refer to how form elements manage their state. Here’s a breakdown of the differences, along with examples and a discussion on which might be better in various scenarios.

##### Controlled Components

**_Definition:_** In controlled components, the form data is handled by the React component state. The input value is always derived from the state, and changes to the input are handled via event handlers that update the state.

- Pros:

Single Source of Truth: The component state is the single source of truth, making it easier to manage and validate form data.
Predictable: Changes are predictable because they flow through the React state management.
Easier Validation: You can validate input on the fly as the state updates.

- Cons:

More Boilerplate: Requires more code to manage the state and handle updates.
Example:

```ts
import React, { useState } from "react";

function ControlledInput() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Controlled Input"
      />
      <p>Value: {value}</p>
    </div>
  );
}
```

##### Uncontrolled Components

**_Definition_**: In uncontrolled components, form data is handled by the DOM itself. You typically use refs to access the input values when needed.

- Pros:

Less Boilerplate: You write less code since you don’t need to manage the component state for every input.
More Like Traditional HTML: It behaves more like standard HTML forms, which can be simpler for developers familiar with HTML.

- Cons:

Multiple Sources of Truth: The input value exists in the DOM and is not directly tied to the component state, which can lead to inconsistencies.
Harder to Validate: Validation must be handled at the time of reading the value, which can complicate the logic.

```ts
import React, { useRef } from "react";

function UncontrolledInput() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Input Value: " + inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} placeholder="Uncontrolled Input" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

- Which One is Better?
  The choice between controlled and uncontrolled components depends on your use case:

Controlled Components:
Better for complex forms where you need to validate input, manage multiple fields, or respond to changes in real-time.
Recommended for most applications that require dynamic control over form data.
Uncontrolled Components:
Useful for simple forms or when integrating with non-React libraries that expect to manipulate the DOM directly.
Can be faster to implement for basic use cases but may lead to issues in larger, more complex applications.
