import { SignIn } from '@/components/auth';
import { ModalError, View } from '@/shared/components';
import { SignInProvider, TUserSignIn, useAuth } from '@/contexts/auth';
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';


export default function Entrar() {	
	const {signIn,loading,error} = useAuth();
	const [modalVisible,setModalVisible] = useState<boolean>(true);

	const handlePressLogin = async (user:TUserSignIn) => {
		await signIn(user);		
	};

	useEffect(()=>{
		if (error) 
			setModalVisible(true);
	},[error]);
	
 	return (
		<SignInProvider>
			<View style={styles.container}>
				<SignIn onPressLogin={handlePressLogin} isLoading={loading} />				
				<ModalError 
					error={error} 
					visible={modalVisible} 
					onDismiss={() => setModalVisible(!modalVisible)} />					
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
