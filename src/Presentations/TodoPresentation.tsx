import { Card, CardContent, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Todo } from "../Interfaces/Todo";
import ModalContainer from "../Containers/ModalContainer";
import "../Styles/Cards.css";

interface TodoListProps {
  todos: Todo[];
  onToggleStatus: (todoId: number) => void;
}

const TodoPresentation: React.FC<TodoListProps> = ({
  todos,
  onToggleStatus,
}) => {

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [Id, setId] = useState<number>(Number);

  const cambiarId = (id: number) => {
    setId(id)
    handleOpenModal();
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };


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

                  <Button onClick={()=>{cambiarId(todo.id)}}>Open modal</Button>
                </Typography>
              </CardContent>
            </Card>
          );
        })}


        {/* logica del modal cambiada, esta en trabajo solo abre una sola vez */}
        <ModalContainer openModal={openModal} handleOpenModal={handleOpenModal} taskId={Id}/>
      
      </div>
    </div>
  );
};

export default TodoPresentation;
