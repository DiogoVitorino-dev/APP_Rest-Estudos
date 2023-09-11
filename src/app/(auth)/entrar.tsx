import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { SignIn } from '@/components/auth';
import { ModalError, View } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { cleanAuthError } from '@/store/slices/AuthSlice';
import { signIn } from '@/store/thunks/AuthThunks';
import { IUsuarioSignIn } from '@/models';
import { SignInProvider } from '@/contexts/auth';
import { selectAuthError } from '@/store/selectors/AuthSelector';

export default function Entrar() {	
	const [modalVisible,setModalVisible] = useState<boolean>(true);

	const dispatch = useAppDispatch();
	const error = useAppSelector(selectAuthError);

	const handlePressLogin = (usuario:IUsuarioSignIn) => dispatch(signIn(usuario));

	const handleDismissModalError = () => {
		setModalVisible(false);
		dispatch(cleanAuthError());
	};

	useEffect(() => {
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
