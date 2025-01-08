import React from 'react';
import { 
	IonContent, 
	IonFooter, 
	IonTitle, 
	IonToolbar,
	IonPage,
	IonMenuButton,
	IonHeader,
	IonButtons
} from '@ionic/react';
import { IonIcon } from '@ionic/react';
import { logOut } from 'ionicons/icons';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'

function Dashboard() {
	const title = 'Capstone'
	const { logout } = useContext(AuthContext)

  	return (
	    <>
	      <IonPage>
		      <IonHeader>
		        <IonToolbar>
		          <IonTitle>Header Toolbar</IonTitle>
		        </IonToolbar>
		      </IonHeader>

		      <IonContent fullscreen>
		        <IonHeader collapse="condense">
		          <IonToolbar>
		            <IonTitle size="medium">{title}</IonTitle>
		          </IonToolbar>
		        </IonHeader>
		      </IonContent>

		      <IonFooter>
		      	<IonToolbar>
		      		<IonTitle onClick={logout}>
		           		<IonIcon
		           		size="large"
		           		color="medium" 
		           		icon={logOut}></IonIcon>
		      		</IonTitle>
		        </IonToolbar>
		      </IonFooter>
	    </IonPage>
	    </>
  );
}
export default Dashboard;