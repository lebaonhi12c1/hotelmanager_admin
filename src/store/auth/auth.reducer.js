import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    access_token: null,
    isLogin: localStorage.getItem('user')? true : false, 
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        
        setIsLogin: (state, action) => {
            state.isLogin = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setIsLogin } = authSlice.actions

export default authSlice.reducer