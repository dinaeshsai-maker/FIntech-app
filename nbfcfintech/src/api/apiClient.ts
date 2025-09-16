import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: 'https://mock-api.example.com',
  timeout: 10000,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // You can centralize 401 handling here later
    return Promise.reject(error);
  }
);

export default apiClient;

export type MockUser = {
  id: string;
  email: string;
  name: string;
};

export async function mockLogin(
  email: string,
  password: string
): Promise<{ token: string; user: MockUser }> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 700));
  if (!email || !password) {
    throw new Error('Invalid credentials');
  }
  return {
    token: 'mock-jwt-token-123',
    user: { id: 'u_1', email, name: 'John Doe' },
  };
}

