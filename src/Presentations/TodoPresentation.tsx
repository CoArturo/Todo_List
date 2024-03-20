import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../App.css"


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
  onToggleStatus: (todoId: number) => void;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const TodoPresentation: React.FC<TodoListProps> = ({
  todos,
  onToggleStatus,
}) => {
  return (
    <div className="contenedorCards">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
      </ThemeProvider>
      {todos.map((todo) => {
        return (
          <Card key={todo.id} sx={{ minWidth: 350 }} className="card">
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {todo.tagId === 1
                  ? "Daily routine"
                  : todo.tagId === 2
                  ? "School"
                  : todo.tagId === 3
                  ? "Work"
                  : ""}
              </Typography>
              
              <Typography variant="h5" component="div">
                {todo.description}
              </Typography>

              <Typography variant="body2">

                <Button
                  size="small"
                  variant={todo.status == true ? "outlined" : "contained"}
                  color={todo.status == true ? "success" : "error"}
                  onClick={() => onToggleStatus(todo.id)}
                  >
                  {todo.status == true ? "completada" : "pendiente"}
                </Button>
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TodoPresentation;
