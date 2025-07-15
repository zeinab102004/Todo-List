import { v4 as uuidv4 } from 'uuid';

export default function reducer(currentTodos=[], action){
switch(action.type){
    case "added":{
            const newTodo ={
            id: uuidv4(),
            title: action.payload.newTitle,
            description: "",
            completed: false,
          }
          const updatedTodos =[...currentTodos, newTodo]
          
          localStorage.setItem("todosState", JSON.stringify(updatedTodos))
         return updatedTodos;
    }
    case "Delete":{
    const updatedTodos = currentTodos.filter((item)=>{ 
        return item.id !== action.payload.id})
    localStorage.setItem("todosState", JSON.stringify(updatedTodos))
     return updatedTodos
    }
    case "Edit":{
             
        const updatedTodos = currentTodos.map((t)=>{
            if (t.id ===  action.payload.id ){
                return {...t, title: action.payload.title, description:action.payload.description}
            }else{
                return t
            }
        })
     localStorage.setItem("todosState", JSON.stringify(updatedTodos))
    return updatedTodos
        
    }
    case "git":{
    const storgeTodos=JSON.parse(localStorage.getItem("todosState")) ??[]
     return storgeTodos
    }
    case "Complete":{
        const updatedTodos = currentTodos.map(t => t.id === action.payload.id ? {
          ...t, completed: !t.completed}:
          t)
        localStorage.setItem("todosState", JSON.stringify(updatedTodos))
        return updatedTodos
    }
    default:{
        throw Error("unknown Action" + action.type);
        
    }
}
}