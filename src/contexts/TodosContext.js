import { createContext, useReducer} from "react";
import todosRrduser from "../reducers/todosReuser"
export const TodosContext = createContext([])

const TodosProvider = ({children}) => {
      const [todosState, todosDispatch] = useReducer(todosRrduser,[])
    
    return (
      <TodosContext.Provider value={{todosState:todosState, todosDispatch:todosDispatch  }}>
      {children}
      </TodosContext.Provider>
    )
}
export default TodosProvider