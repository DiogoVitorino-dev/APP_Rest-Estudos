import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { SignIn } from '@/components/auth';
import { ModalError, View } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/store/Hooks';
import { cleanError, selectError } from '@/store/slices/AuthSlice';
import { signIn } from '@/store/thunks/AuthThunks';
import { IUsuarioSignIn } from '@/models/Usuario';
import { SignInProvider } from '@/contexts/auth';

export default function Entrar() {	
	const [modalVisible,setModalVisible] = useState<boolean>(true);

	const dispatch = useAppDispatch();
	const error = useAppSelector(selectError);

	const handlePressLogin = (usuario:IUsuarioSignIn) => dispatch(signIn(usuario));

	const handleDismissModalError = () => {
		setModalVisible(false);
		dispatch(cleanError());
	};

	useEffect(()=>{
		console.log('a',error);
		
		if (error) 
			setModalVisible(true);
	},[error]);
	
 	return (
		<SignInProvider>
			<View style={styles.container}>
				<SignIn onPressLogin={handlePressLogin} />				
				<ModalError 
					error={error} 
					visible={modalVisible} 
					onDismiss={handleDismissModalError} />					
			</View>
		</SignInProvider>
	);
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		flexDirection:'column',
		justifyContent:'center',		
		width:'100%',
		margin:'auto',
		padding:15
	},
	
	header:{	
		fontSize:26
	}
});
