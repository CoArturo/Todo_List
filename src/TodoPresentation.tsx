import React, { useEffect, useState } from 'react'

interface Todo {
  idUser: number;
  id: number;
  description: string;
  status: boolean;
  date: string;
  tagId: number;
}

interface TodoListProps {
  todos: Todo[];
  onToggleStatus: (todoId: number) => void
}

const TodoPresentation: React.FC<TodoListProps> = ({todos, onToggleStatus}) => {
    return (
      <>
        <ul>
          {todos.map(todo => {
            return <li key={todo.id}>
              <input 
              type="checkbox" 
              checked={todo.status}
              onChange={() => onToggleStatus(todo.id)}/>
              {todo.description}
              </li>
          })}
        </ul>
      </>
    );
  };

export default TodoPresentation;
