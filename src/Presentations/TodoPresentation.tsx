import { ThemeProvider, createTheme, CssBaseline, Card, CardContent, Button, Typography } from "@mui/material";
import ModalContainer from "../Containers/ModalContainer";
import "../Styles/Cards.css";


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

const TodoPresentation: React.FC<TodoListProps> = ({
  todos,
  onToggleStatus,
}) => {
  return (
    <div className="container">
      <div className="contenedorCards">
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

                <Typography variant="body2" className="controles">
                  <Button
                    size="small"
                    variant={todo.status == true ? "outlined" : "contained"}
                    color={todo.status == true ? "success" : "error"}
                    onClick={() => onToggleStatus(todo.id)}
                    >
                    {todo.status == true ? "completada" : "pendiente"}
                  </Button>

                  <ModalContainer taskId={todo.id}/>

                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TodoPresentation;
