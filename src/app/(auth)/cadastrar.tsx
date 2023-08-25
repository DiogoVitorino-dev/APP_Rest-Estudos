import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { SignUp } from '@/components/auth';
import { ModalError, View } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/store/Hooks';
import { signIn, signUp } from '@/store/thunks/AuthThunks';
import { selectError } from '@/store/slices/AuthSlice';
import { IUsuarioSignUp } from '@/models/Usuario';
import { SignUpProvider } from '@/contexts/auth';

export default function Cadastrar() {	
	const [modalVisible,setModalVisible] = useState<boolean>(true);

	const error = useAppSelector(selectError);
	const dispatch = useAppDispatch();

	const handlePressSignUp = async (usuario:IUsuarioSignUp) => {
		await dispatch(signUp(usuario)).unwrap();
		if (!error) 
			dispatch(signIn({...usuario}));
	};

	useEffect(()=>{
		if (error) 
			setModalVisible(true);
	},[error]);

	return (
		<SignUpProvider>
			<View style={styles.container}>
				<SignUp onPressSignUp={handlePressSignUp} />
				<ModalError 
					error={error} 
					visible={modalVisible} 
					onDismiss={() => setModalVisible(!modalVisible)} />					
			</View>	
		</SignUpProvider>			
	);
};

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
