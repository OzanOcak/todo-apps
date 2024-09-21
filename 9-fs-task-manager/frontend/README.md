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

#### Controlled and uncontrolled components

To add an edit button to task items, we need basic if statement to check if the edit button is clicked. Fist we need to create a boolean expression to create the logic` const [edit, setEdit] = useState<boolean>(false);` then we can create our program.

```ts
const [editTitle, setEditTitle] = useState<string>(task.title); // State for the input value

const saveEdit = () => {
  setTasks(
    filteredTasks.map((t) =>
      t.id === task.id ? { ...t, title: editTitle } : t
    )
  );
  setEdit(false); // Exit edit mode
};
```

All we need to do know is creating the logic of input with `<input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />` and calling saveEdit function when we click on save button.Ihis one was controlledcomponent, we can also use uncontrolled component

In React, the concepts of controlled and uncontrolled components refer to how form elements manage their state. Here’s a breakdown of the differences, along with examples and a discussion on which might be better in various scenarios.

```ts
  const inputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the input

  const saveEdit = () => {
    if (inputRef.current) {
      const updatedTitle = inputRef.current.value; // Get the value from the ref
      setTasks(
        filteredTasks.map((t) =>
          t.id === task.id ? { ...t, title: updatedTitle } : t
        )
      );
      setEdit(false); // Exit edit mode
    }
  };

  Then we need to create the logic in imput `<input type="text" ref={inputRef} />`

**Controlled Components** In controlled components, the form data is handled by the React component state. The input value is always derived from the state, and changes to the input are handled via event handlers that update the state.

- Pros:

Single Source of Truth: The component state is the single source of truth, making it easier to manage and validate form data.
Predictable: Changes are predictable because they flow through the React state management.
Easier Validation: You can validate input on the fly as the state updates.

- Cons:

More Boilerplate: Requires more code to manage the state and handle updates.

**Uncontrolled Components**: In uncontrolled components, form data is handled by the DOM itself. You typically use refs to access the input values when needed.

- Pros:

Less Boilerplate: You write less code since you don’t need to manage the component state for every input.
More Like Traditional HTML: It behaves more like standard HTML forms, which can be simpler for developers familiar with HTML.

- Cons:

Multiple Sources of Truth: The input value exists in the DOM and is not directly tied to the component state, which can lead to inconsistencies.
Harder to Validate: Validation must be handled at the time of reading the value, which can complicate the logic.

- Which One is Better?
  The choice between controlled and uncontrolled components depends on your use case:

Controlled Components:
Better for complex forms where you need to validate input, manage multiple fields, or respond to changes in real-time.
Recommended for most applications that require dynamic control over form data.
Uncontrolled Components:
Useful for simple forms or when integrating with non-React libraries that expect to manipulate the DOM directly.
Can be faster to implement for basic use cases but may lead to issues in larger, more complex applications.
```

#### useRef

The useRef hook is a built-in React hook that allows you to create a mutable object. This object persists for the full lifetime of the component. It can be used to store any mutable value, but it is most commonly used for accessing DOM elements directly.

**Key Features:**
Mutable Object: The object returned by useRef has a .current property that can be set and modified without causing re-renders.
Accessing DOM Elements: You can use useRef to directly reference a DOM element and manipulate it (e.g., focusing an input).
Preserves Value: The value stored in a ref does not trigger re-renders when updated, making it suitable for storing values that do not need to be part of the component's render cycle.
Use Cases for useRef
Accessing DOM Elements: Like focusing an input or measuring the size of an element.
Storing Mutable Values: Keeping track of values that will not cause a re-render, such as timers or interval IDs.
Persisting Values Across Renders: Keeping a value that needs to persist across renders without triggering a re-render when changed.

```ts
const inputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the input

const handleEditClick = () => {
  setEdit(true);
  setEditTitle(task.title); // Reset the title to current task title
  if (inputRef.current) {
    inputRef.current.focus(); // Focus on the input when editing starts
  }
};
```

Lastly we need to call handleEditClick within onClick function of Edit button and add ref into input jsx `ref={inputRef}`.
Below code doesn't work because the component uses useRef is not rendered in the beggining of app so we need to use usEffect

```ts
const handleClickEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
  setEditTitle(e.target.value);
  inputRef.current?.focus(); // it doesn't focus
};
```

When we click on edit button setEdit change the edit variable so we can use

```ts
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus();
}, [edit]);
```

Then we need to bind input with ref so it can focus every time edit is changed.

```ts
{edit ? (
          <input
            type="text"
            value={editTitle}
            ref={inputRef}
```
#### Local Storage

```ts
export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const localValue = localStorage.getItem("TASKS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  useEffect(() => {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
    setFilteredTasks(tasks);
  }, [tasks]);
```

#### Unit Test and TDD (Test Driven Development)

**_Unit Testing:_**
Focuses on testing individual components or functions in isolation to ensure they work as expected.
Typically written after the code is developed, although they can also be written concurrently.
Helps identify bugs and ensure that each unit of code performs correctly.

**_Test-Driven Development (TDD):_**
A development approach where tests are written before the actual code.
Follows a cycle of writing a failing test, implementing code to pass the test, and then refactoring.
Encourages better design and more modular code, as you structure your code to pass tests from the start.
**_Why Vitest Alone May Not Be Enough for Unit Testing_**
Limited Scope: While Vitest is a powerful testing framework, it primarily focuses on unit and integration testing. It may not offer the same level of functionality for component testing as frameworks specifically designed for UI components.
**_Integration with Libraries:_**
Using Vitest alone might not provide the optimized utilities for testing React components, such as handling user interactions and simulating the DOM.
**_Why Use React Testing Library_**
User-Centric: React Testing Library emphasizes testing components from a user's perspective, meaning tests are more aligned with how users interact with the application.
Simplicity: It encourages writing simpler tests that focus on how the component behaves rather than its implementation details, promoting better maintainability.
DOM Interaction: Provides utilities to query DOM nodes, simulate events, and assert user interactions, which are crucial for testing React applications effectively.
Best Practices: Encourages following best practices in testing React components, such as avoiding testing for implementation details and focusing on user behavior.
**_Summary_**
Unit Testing is about verifying the correctness of individual code units, while TDD is a methodology that integrates testing into the coding process.
Vitest is powerful for unit tests but lacks some UI-specific features needed for comprehensive React component testing.
React Testing Library enhances testing by focusing on user interactions and component behavior, making it a valuable tool in your testing toolkit.

**Setting up environment for testing**
Since out project is bootstraped by vite, we already have vitest installed but if you need to, you can download it with `npm install -D vitest`

- simple unit tests

1-create sum.ts file

```ts
export function sum(a: number, b: number) {
  return a + b;
}
```

2-create sum.test.ts file

```ts
import { expect, test } from "vitest";
import { sum } from "./sum";

test("adds 20 + 22 to equal 42", () => {
  expect(sum(20, 22)).toBe(42);
});
```

3- update script in package.json with `"test":"vitest"` and run `npm run test`

**_React Testing Library (RTL)_**

`npm install -D @testing-library/react` then `npm install -D jsdom`
