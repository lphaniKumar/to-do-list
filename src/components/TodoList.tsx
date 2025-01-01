import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema, Todo } from '@/amplify/data/resource';

const client = generateClient<Schema>();

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await client.models.Todo.list({});
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const deleteTodo = async (id: string) => {
    await client.models.Todo.delete({ id });
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.content}
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
