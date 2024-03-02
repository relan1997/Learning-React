import {createSlice} from  '@reduxjs/toolkit'

const initialState= {
    status:false, //tells us whether the user has been logged in or not
    userData:null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login: (state,action)=>{  //action se payload milta hai and state apni mutatable value hai jispe action kaam karta hai
            state.status=true;
            state.userData=action.payload.userData
        },
        logout:(state,action)=>{
            state.status=false;
            state.userData=null;
        }  //the functions of login and logout are the ACTIONS of the authSlice
    }
});

export const {login,logout} =authSlice.actions

export default authSlice.reducer