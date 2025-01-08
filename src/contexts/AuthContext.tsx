import React, {
	useEffect,
	useState,
	createContext,
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
	let isAuthenticated = !!accessToken;
	console.log(isAuthenticated)
	const logout = async () => {
		if (!isAuthenticated) {
			alert('No token found');
			return;
		}

		try {
			await api.get('/sanctum/csrf-cookie');

			api.post('/api/logout', {}, {
				headers: {
					'Authorization': `Bearer ${accessToken}` 
				}
			}).then(() => {
				localStorage.removeItem('auth_token');
				setUser(null)
				window.location.href = "/";
			})

		} catch(error) {
			console.error(error)
		}
	}
	return (
		<AuthContext.Provider value={{ user, setUser, logout, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
}

