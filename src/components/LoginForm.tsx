import React, { useState, useEffect } from 'react'
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
	IonTitle,
	useIonLoading	
} from '@ionic/react'
import './LoginForm.css';
import api from '../api/axiosInstance'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom';

const loginForm: React.FC = () => {
	const history = useHistory();
	const { setUser, user, isAuthenticated, logout } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState();
	const [present, dismiss] = useIonLoading();

	const handleLogin = async () => {
		present({
          message: 'Logging in...',
         });
		try {
			await api.get('/sanctum/csrf-cookie', {
				headers: {
					'X-Requested-With': 'XMLHttpRequest'
				}
			});

			const { data } = await api.post('/api/login', { email, password })

			if (data.user && data.access_token) {
				dismiss()
				setUser(data.user)
				localStorage.setItem('auth_token', data.access_token);
				history.push('/dashboard');
			} else {
				alert('Invalid credentials or login failed.');
				dismiss()
			}

		} catch (error) {
			const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
			alert(errorMessage);
			dismiss()
		}
	};

	return (
		<IonPage>	
		  <IonContent className='ion-padding'>
		    <div className='centered-content'>
		      <h2>Login</h2>
		      <IonCard>
		        <IonCardHeader>
		          {/*<IonCardTitle>Login</IonCardTitle>*/}
		        </IonCardHeader>
		        <IonCardContent>
		          <IonList>
		            <IonItem style={{ marginBottom: '12px' }}>
		              <IonInput
		                placeholder="Email"
		                type='email'
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
		          : <IonButton
		            onClick={handleLogin}
		            style={{ marginTop: '12px' }}
		            expand="block"
		            color='dark'>Login</IonButton>}
		        </IonCardContent>
		      </IonCard>
		    </div>
		  </IonContent>
		</IonPage>

	)}
export default loginForm;