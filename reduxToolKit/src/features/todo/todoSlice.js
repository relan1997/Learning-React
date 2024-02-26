import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState={
    todos:[{id:1,text:'Hello World'}]
}

export const todoSlice=createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            const todo={
                id:nanoid(),  //gives a unique id to each new element that's to be added
                text:action.payload
            }
            state.todos.push(todo);
        },
        removeTodo:(state,action)=>{
            state.todos=state.todos.filter((todo)=> todo.id!==action.payload);
        },
        updateTodo:(state,action)=>{
            state.todos=state.todos.map((todo)=>{
                return todo.id===action.payload.id?{...todo,message:action.payload.message}:todo;
            })
        }
    }
})

export const {addTodo,removeTodo,updateTodo} =todoSlice.actions;

export default todoSlice.reducer;