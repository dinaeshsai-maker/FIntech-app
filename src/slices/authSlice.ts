import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockLogin, MockUser } from '../api/apiClient';

export type AuthState = {
  token: string | null;
  user: MockUser | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  initialized: boolean; // storage hydration complete
};

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
  initialized: false,
};

export const initializeAuth = createAsyncThunk('auth/initialize', async () => {
  const token = await AsyncStorage.getItem('authToken');
  const userJson = await AsyncStorage.getItem('authUser');
  const user: MockUser | null = userJson ? JSON.parse(userJson) : null;
  return { token, user } as { token: string | null; user: MockUser | null };
});

export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await mockLogin(credentials.email, credentials.password);
      await AsyncStorage.setItem('authToken', result.token);
      await AsyncStorage.setItem('authUser', JSON.stringify(result.user));
      return result;
    } catch (err: any) {
      return rejectWithValue(err.message ?? 'Login failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await AsyncStorage.removeItem('authToken');
  await AsyncStorage.removeItem('authUser');
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        initializeAuth.fulfilled,
        (state, action: PayloadAction<{ token: string | null; user: MockUser | null }>) => {
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.isAuthenticated = Boolean(action.payload.token);
          state.status = 'idle';
          state.initialized = true;
        }
      )
      .addCase(initializeAuth.rejected, (state) => {
        state.status = 'idle';
        state.initialized = true;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ token: string; user: MockUser }>) => {
          state.status = 'succeeded';
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.isAuthenticated = true;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) ?? 'Login failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'idle';
      });
  },
});

export default authSlice.reducer;

