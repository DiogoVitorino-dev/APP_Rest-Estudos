import { SignUp } from '@/components/auth';
import { View } from '@/shared/components';
import { SignUpProvider } from '@/contexts/Auth';
import { IUser } from '@/models';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function Cadastrar() {
	const handlePressSignUp = (user:IUser) => {
		console.log(user);		
	};

	return (
		<SignUpProvider>
			<View style={styles.container}>
				<SignUp onPressSignUp={handlePressSignUp} isLoading />			
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
