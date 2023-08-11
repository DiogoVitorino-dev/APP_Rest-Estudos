import { ModalError, SignUp } from '@/components/auth';
import { View } from '@/shared/components';
import { SignUpProvider, TUserSignUp, useRegister } from '@/contexts/Auth';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ENamesPages } from '@/constants/ENamesPages';

export default function Cadastrar() {
	const {signUp,loading,error} = useRegister();	
	const [modalVisible,setModalVisible] = useState<boolean>(true);

	const router = useRouter();

	const handlePressSignUp = async (user:TUserSignUp) => {
		await signUp(user);
		navigateToSignIn();
	};

	useEffect(()=>{
		if (error) 
			setModalVisible(true);
	},[error]);

	const navigateToSignIn = useCallback(() => {
		if (!error && !loading)
			if(router.canGoBack())
				router.back();
			else
				router.push(`/${ENamesPages.entrar}`);
	},[loading,error]);	

	return (		
		<SignUpProvider>
			<View style={styles.container}>
				<SignUp onPressSignUp={handlePressSignUp} isLoading={loading} />
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
