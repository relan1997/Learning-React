import {createContext,useContext} from 'react'

export const TodoContext = createContext({
    todos:[
        {
            id:1,
            todo:"Todo Msg",
            completed:false
        }
    ],
    addTodo: (todo)=>{}, // hum function ki definition yaha define nahi karte hai woh usually define tumhare App.jsx mai hoti hai
    updateTodo:(todo,id)=>{},
    deleteTodo:(id)=>{},
    toggleComplete:(id)=>{}
})

export const TodoProvider=TodoContext.Provider;

export const useTodo=()=>{
    return useContext(TodoContext);
}