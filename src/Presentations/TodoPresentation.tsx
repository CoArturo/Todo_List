import { Card, CardContent, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Todo } from "../Interfaces/Todo";
import ModalContainer from "../Containers/ModalContainer";
import "../Styles/Cards.css";
import { UserContext } from "../Context/UserContext";
import { themes } from '../Styles/Style-Components/Theme';

interface TodoListProps {
  todos: Todo[];
  onToggleStatus: (todoId: number) => void;
  titulo: string
}

const TodoPresentation: React.FC<TodoListProps> = ({
  todos,
  onToggleStatus,
  titulo
}) => {

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [Id, setId] = useState<number>(Number);

  const {usuario} = useContext(UserContext)
  const estiloUsuario = usuario.theme === 'Tema1' ? themes.Tema1 : usuario.theme === 'Tema2' ? themes.Tema2 : {};


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
        <div className="tituloC">
          <h2 style={{background: `${themes}`+ "." + `${estiloUsuario}`, color: `${themes}`+ "." + `${estiloUsuario}`}}>{titulo}</h2>
        </div>
        <div className="cartas">
          {todos.map((todo) => {
            return (
              <Card style={estiloUsuario} key={todo.id} sx={{ minWidth: 350 }} className="card">
                <CardContent style={estiloUsuario}>
                  <Typography
                    style={estiloUsuario}
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
                  
                  <Typography style={estiloUsuario} variant="h5" component="div">
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

                    <Button  onClick={()=>{cambiarId(todo.id)}}>Open modal</Button>
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>


        {/* logica del modal cambiada, esta en trabajo solo abre una sola vez */}
        <ModalContainer openModal={openModal} handleOpenModal={handleOpenModal} taskId={Id}/>
      
      </div>
    </div>
  );
};

export default TodoPresentation;
