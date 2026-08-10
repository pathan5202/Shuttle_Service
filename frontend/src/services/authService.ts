import apiClient from '../api/axios';
import { User, Role } from '../types';

interface BackendLoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    authenticated: boolean;
  };
}

export interface LoginCredentials {
  email?: string;
  password?: string;
  role?: Role;
}

export interface RegisterUserData {
  firstName: string;
  lastName: string;
  employeeId: string;
  email: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {

    const response =
        await apiClient.post<BackendLoginResponse>(
            "/auth/login",
            {
                email: credentials.email,
                password: credentials.password
            }
        );

    const data = response.data.data;

    const user: User = {

        id: data.id,

        name: `${data.firstName} ${data.lastName}`,

        email: data.email,

        role: data.role,

        department: "",

        employeeId: "",

        phone: "",

        status: "ACTIVE",

        createdAt: new Date().toISOString()

    };

    return {

        token: data.token,

        user,

        message: response.data.message

    };

},

  register: async (userData: RegisterUserData): Promise<{ message: string; user?: User }> => {
    try {
      const response = await apiClient.post<{ message: string; user?: User }>('/auth/register', userData);
      return response.data;
    } catch (error) {
        throw error;
    }
  },

  testAuthentication: async (): Promise<{ authenticated: boolean; user?: User; status: string }> => {
    try {
      const response = await apiClient.get<{ authenticated: boolean; user?: User; status: string }>('/auth/test');
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        return {
          authenticated: true,
          status: 'Connection OK',
        };
      }
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore errors on logout
    }
  },
};
