import React, { useState, useEffect } from "react";

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3001/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (newTask.trim()) {
      try {
        const response = await fetch("http://localhost:3001/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: newTask }),
        });
        const data = await response.json();
        console.log(data.message);
        setNewTask("");
        fetchTodos();
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  const toggleTodoCompletion = async (id: number, completed: boolean) => {
    try {
      await fetch(`http://localhost:3001/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }),
      });
      fetchTodos();
    } catch (error) {
      console.error("Error toggling todo completion:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/todos/${id}`, {
        method: "DELETE",
      });
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodoCompletion(todo.id, todo.completed)}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.task}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <p>
        Completed tasks: {todos.filter((todo) => todo.completed).length} /{" "}
        {todos.length}
      </p>
    </div>
  );
};

export default TodoList;
