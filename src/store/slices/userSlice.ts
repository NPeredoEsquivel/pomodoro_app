import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store";
import {User} from "../interfaces";

const initialState: User = {
    email: '',
    password: '',
}

interface UpdateUser {
    email: string;
    password: string;
}

const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        setLoggedUser(state: UpdateUser, action: PayloadAction<UpdateUser>){
            const {email, password} = action.payload;
            return {
                ...state,
                email,
                password,
            }
        }
    }
})

export const {setLoggedUser} = userSlice.actions;
export const selectLoggedUser = (state: RootState) => state.loggedUser;
export default userSlice.reducer;

