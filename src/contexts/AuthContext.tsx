import React, {
	createContext,
	useState,
	useContext,
	ReactNode
} from 'react'
import api from '../api/axiosInstance'

interface AuthContextType {
	user: any;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<any>(null);
	const accessToken = localStorage.getItem('auth_token');

	const logout = async () => {
		if (!accessToken) {
			alert('No token found');
			return;
		}

		try {
			await api.post('/api/logout', {}, {
				headers: {
					'Authorization': `Bearer ${accessToken}` 
				}
			});
			localStorage.removeItem('auth_token');
			setUser(null)
			
		} catch(error) {
			console.error(error)
		}
	}

	return (
		<AuthContext.Provider value={{ user, setUser, logout, isAuthenticated: !!user }}>
			{children}
		</AuthContext.Provider>
	);

}

