import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store";
import {User} from "../interfaces";

const initialState: User = {
    username: '',
    password: '',
}

interface UpdateUser {
    username: string;
    password: string;
}

const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        setLoggedUser(state: UpdateUser, action: PayloadAction<UpdateUser>){
            const {username, password} = action.payload;
            return {
                ...state,
                username,
                password,
            }
        }
    }
})

export const {setLoggedUser} = userSlice.actions;
export const selectLoggedUser = (state: RootState) => state.loggedUser;
export default userSlice.reducer;

