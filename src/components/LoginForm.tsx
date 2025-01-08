import React, { useState } from 'react'
import { 
	IonPage,
	IonContent,
	IonCard,
	IonListHeader,
	IonCardHeader,
	IonCardTitle,
	IonCardContent,
	IonItem,
	IonList,
	IonInput,
	IonSelectOption,
	IonSelect,
	IonButton,
	IonHeader,
	IonToolbar,
	IonTitle 
} from '@ionic/react'
import './LoginForm.css';
import api from '../api/axiosInstance'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'

const loginForm: React.FC = () => {
	const { setUser, user, isAuthenticated, logout } = useContext(AuthContext);
	const [email, setEmail] = useState('');
  	const [password, setPassword] = useState('');
  	const [error, setError] = useState();


	const handleLogin = async () => {
    try {
      api.get('/sanctum/csrf-cookie', {
      	headers: {
      		'X-Requested-With': 'XMLHttpRequest',
      	}
      }).then(response => {
      	api.post('/api/login', { email, password }).then(({ data }) => {
      		setUser(data.user)
      		localStorage.setItem('auth_token', data.access_token);
      	})
      }) 
    } catch (error) {
      console.error(error.response?.data || 'Login failed');
    }
  };

  	error && console.log(error)

	return (
		<IonPage>
			<IonContent className='ion-padding'>
				<div className='centered-content'>
					<IonCard>
						<IonCardHeader>
							<IonCardTitle>Login</IonCardTitle>
						</IonCardHeader>
						<IonCardContent>
							<IonList>
								<IonItem style={{ marginBottom: '12px' }}>
							        <IonInput 
							        	label="ID Number" 
							        	type='text'
							        	value={email}
          								onIonChange={(e) => setEmail(e.detail.value!)}
							        	/>
							        {/* Select Section*/}
							    </IonItem>
								<IonItem>
									 <IonInput
							          placeholder="Password"
							          type="password"
							          value={password}
							          onIonChange={(e) => setPassword(e.detail.value!)}
							        />
									{/*<IonSelect label="Select Section" labelPlacement="floating">
										<IonSelectOption value="apple">IOS</IonSelectOption>
										<IonSelectOption value="banana">NAT</IonSelectOption>
										<IonSelectOption value="orange">PAYTEE</IonSelectOption>
									</IonSelect>*/}
								</IonItem>
							</IonList>
							{ isAuthenticated ? (
								<IonButton 
									onClick={logout} 
									style={{ marginTop: '12px' }} 
									expand="block" 
									color='dark'>Logout</IonButton>)
								: <IonButton onClick={handleLogin} style={{ marginTop: '12px' }} expand="full" color='dark'>Login</IonButton>}
							
						</IonCardContent>
					</IonCard>
				</div>
			</IonContent>
		</IonPage>
		)
}
export default loginForm;