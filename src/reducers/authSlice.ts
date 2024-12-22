import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

type User = {
  email: string;
  familyName: string;
  givenName: string;
  id: string;
  name: string;
  photo: string;
};

export interface AuthState {
  idToken: string;
  serverAuthCode: string;
  user: User;
}

const initialState: AuthState = {
  idToken: '',
  serverAuthCode: '',
  user: {
    email: '',
    familyName: '',
    givenName: '',
    id: '',
    name: '',
    photo: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const payload: AuthState = action.payload;
      state.idToken = payload.idToken;
      state.serverAuthCode = payload.serverAuthCode;
      state.user = payload.user;
    },
    clearAuth: state => {
      state.idToken = initialState.idToken;
      state.serverAuthCode = initialState.serverAuthCode;
      state.user = initialState.user;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setAuth, clearAuth} = authSlice.actions;

export default authSlice.reducer;
