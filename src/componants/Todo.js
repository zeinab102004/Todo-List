import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useContext }from 'react';
import {TodosContext} from '../contexts/TodosContext'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import TextField from '@mui/material/TextField';



export default function Todo({ todo}) {
    const {todosState, todosDispatch}=useContext(TodosContext)
  
    const [Delete, setDelete] = React.useState(false);
    const [Edit, setEdit] = React.useState(false);
    const [updateTodo, setupdateTodo] = React.useState({title:todo.title, description:todo.description });

    // handel open && close
  const handleDeleteOpen = () => {
    setDelete(true);
  };
   const handleDeleteClose = () => {
    setDelete(false);
  };
  const handleEditOpen = () => {
    setEdit(true);
  };
   const handleEditClose = () => {
    setEdit(false);
  };
    // handel function
function handelDeleteConfirm() {
  todosDispatch({ type: "Delete", payload: todo });  
}
    // Function to handle the completion of a todo
    
   function handleComplete() {
      todosDispatch({type:"Complete", payload:todo})   
    }

function handleEditComplete() {
  todosDispatch({
    type: "Edit",
    payload: {
      id: todo.id,
      title: updateTodo.title,
      description: updateTodo.description,
    },
  });
  handleEditClose(false);
}
    return (
        <>
            <Card className='card' sx={{ minWidth: 275, color: "white", backgroundColor: todo.completed ? "#388e3c" : "#283593", marginTop: 5, alignItems: "center", opacity: todo.completed ? 0.7 : 1, }}>
                <CardContent>
                  
                    <Grid container spacing={2}>
                        <Grid size={8}>
                            <Typography gutterBottom variant='h5' sx={{ textAlign: "right", marginBottom: "0", textDecoration:todo.completed ?"line-through" : "none"}}>
                                {todo.title}
                            </Typography>
                            <Typography gutterBottom variant='h6' sx={{ textAlign: "right" }}>
                                {todo.description}
                            </Typography>
                        </Grid>
                        <Grid size={4} sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <IconButton onClick={handleComplete} style={{
                          color:todo.completed ? "white":"#8bc34a",
                          background:todo.completed ? "#8bc34a":"white",
                          border:"solid #8bc34a 3px"
                          }}>
                          <CheckIcon />
                        </IconButton>
                            <IconButton onClick={handleEditOpen} className='btn' aria-label="edit" style={{ color: "#1769aa", background: "white", border: "3px solid #1769aa" }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton  onClick={handleDeleteOpen} className='btn' aria-label="delete" style={{ color: "#b23c17", background: "white", border: "3px solid #b23c17" }}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
      <Dialog style={{direction:"rtl"}}
        open={Delete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل أنت متأكد أنك تريد حذف هذه المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           اذ حذف هذه المهمة لن تتمكن من استعادتها مرة أخرى.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>الغاء</Button>
          <Button onClick={handelDeleteConfirm} autoFocus>
            حذف
          </Button>
        </DialogActions>
      </Dialog>

        <Dialog style={{direction:"rtl"}}
        open={Edit}
        onClose={handleEditClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل أنت متأكد أنك تريد حذف هذه المهمة؟"}
        </DialogTitle>
        <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="عنوان المهمة"
              fullWidth
              variant="standard"
              value={updateTodo.title}
              onChange={(e) => {
                setupdateTodo({ ...updateTodo, title: e.target.value });
              }}
            />
                        <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="التفاصيل"
              fullWidth
              variant="standard"
              value={updateTodo.description}
              onChange={(e) => {
                setupdateTodo({ ...updateTodo, description: e.target.value });
              }}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>الغاء</Button>
          <Button onClick={handleEditComplete}  autoFocus>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
        </>
    );
}