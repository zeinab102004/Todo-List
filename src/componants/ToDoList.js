import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from '../componants/Todo'
import Grid from '@mui/material/Grid';
import { useState, useContext, useEffect, useMemo} from 'react';
import {TodosContext} from '../contexts/TodosContext'



  
export default function Header() {
  const {todosState, todosDispatch}=useContext(TodosContext)
 
    useEffect(()=>{
     todosDispatch({type:"git"})
      
    },[])

   const[displayedTodosTybe, setDisplayedTodosTybe]=useState("all")
      const completedTodos =useMemo(()=>{
       return todosState.filter((t)=>{
        return t.completed
      })
      },[todosState])
  
      const notCompletedTodos = useMemo(()=>{
        return todosState.filter((t)=>{

        return !t.completed
      })
      },[todosState])
      
      let todosToBeRenderd = todosState

      if (displayedTodosTybe === "completed") {
        todosToBeRenderd = completedTodos
      }else if(displayedTodosTybe === "not-completed"){
       todosToBeRenderd = notCompletedTodos
      }else{todosToBeRenderd = todosState}



    const [titleInput, setTitleInput ] = useState("");
    const todoJsx = todosToBeRenderd.map((item)=>{
      return <Todo key={item.id} todo={item} />
    })

function handelAdd() {
    todosDispatch({type:"added", payload:{newTitle:titleInput}})
  setTitleInput(""); 
  }


function changeDisplayedType(e) {
        setDisplayedTodosTybe(e.target.value)
      }
  return (
  <div>
      <Container maxWidth="sm">
    <Card  sx={{ minWidth: 550 }}>
      <CardContent>
        <Typography gutterBottom variant='h2'>
          مهامي
        </Typography>
        <Divider style={{marginBottom:"20px"}} />
        <ToggleButtonGroup 
      color="primary"
      value={displayedTodosTybe}
      exclusive
      onChange={changeDisplayedType}
      aria-label="Platform"
      >
      <ToggleButton  value="all">الكل</ToggleButton>
      <ToggleButton  value="completed">منجز</ToggleButton>
      <ToggleButton  value="not-completed">غير منجز</ToggleButton>
      
    </ToggleButtonGroup>

    {/* قائمة المهام داخل وعاء قابل للتمرير */}
    <Typography variant="subtitle1" sx={{margin: "10px 0"}}>
  عدد المهام: {todosState.length} | المنجزة: {completedTodos.length} | غير المنجزة: {notCompletedTodos.length}
</Typography>
 <div style={{maxHeight: '300px', overflowY: 'auto', marginTop: '20px', marginBottom: '20px'}}>
  {todosToBeRenderd.length === 0 ? (
    <Typography color="textSecondary">لا توجد مهام بعد</Typography>
  ) : (
    todoJsx
  )}
</div>
    
      </CardContent>

     <Grid container spacing={1} style={{marginTop:"20px"}}>
      <Grid size={8} sx={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
<input value={titleInput} onChange={(e)=>{
  setTitleInput (e.target.value);
}} type="text" placeholder='اضافة مهمة جديدة' style={{width:"100%", height:"50px", borderRadius:"5px", border:"1px solid #ccc"}} />
      </Grid>
      <Grid size={4} sx={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
        <button className='btn-add' disabled={titleInput.length <=0} onClick={()=>{handelAdd()}} style={{width:"100%", height:"50px", borderRadius:"5px", border:"1px solid #ccc",cursor: titleInput.length <= 0 ? "not-allowed" : "pointer", backgroundColor: titleInput.length <= 0 ? "#bdbdbd" : "#8bc34a", color:"white", fontSize:"16px"}}>
          اضافة
        </button>
      </Grid>
     </Grid>
      </Card>
    </Container>
  </div>
  );
}