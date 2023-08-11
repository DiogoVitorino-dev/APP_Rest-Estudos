import React from 'react';
import {StyleSheet} from 'react-native';
import { StyledView, OpenText, View, Button, LinkText } from '@/shared/components';
import Colors from '@/constants/Colors';
import { useTheme } from '@react-navigation/native';
import { ENamesPages } from '@/constants/ENamesPages';
import { TUserSignIn, useSignInContext } from '@/contexts/auth';
import { InputEmail, InputPassword } from '../../shared/inputs';

interface IProps {
	onPressLogin: (user:TUserSignIn) => void
	isLoading:boolean
}

export function SignIn({onPressLogin,isLoading}:IProps) {
	const {
		email,
		password,
		setEmail,
		setPassword,
		errorEmail,
		errorPassword,
		validateFields
	} = useSignInContext();

	const theme = useTheme();

	const validateBeforeLogin = () => {
		const result = validateFields();
		if (result) onPressLogin({email,password});
	};
	
	return (
	 <StyledView style={styles.container}>			
			<OpenText style={[styles.title,{
				color:Colors[theme.dark ? 'dark' : 'light'].text
			}]}>
				Fazer login
			</OpenText>	
					
			<InputEmail 
				onChangeText={(text) => setEmail(text)}
				value={email}
				error={errorEmail}
			/>
			
			<InputPassword 
				onChangeText={(text) => setPassword(text)}
				value={password}
				error={errorPassword}
				showPasswordButtonVisible
			/>	

			<Button 
				title='Login'					
				titleStyle={{fontWeight:'bold'}}
				style={styles.loginButton}
				mode='elevated'				
				disabled={
					!email || !password
						? true 
						: false
				}
				loading={isLoading}
				backgroundColor={Colors[theme.dark ? 'dark' : 'light'].button}
				rippleColor={Colors[theme.dark ? 'dark' : 'light'].buttonSelected}
				onPress={() => validateBeforeLogin()} 
			/>		
			
			<View style={styles.signUpLink}>				
				<OpenText>Novo por aqui?</OpenText>				
				<LinkText 
					title='Criar conta' 
					href={`/${ENamesPages.cadastrar}`}
					titleStyle={{
						color:Colors[theme.dark ? 'dark' : 'light'].tint,
						fontWeight:'bold'
					}}
					style={{marginLeft:3}}
				/>
			</View>
		
	 </StyledView>
	);
};

const styles = StyleSheet.create({
	container:{		
		flexDirection:'column',
		justifyContent:'center',
		maxWidth:500,
		width:'100%',
		margin:'auto',		
		padding:15,		
	},
	
	loginButton:{
		marginTop:15,		
	},

	title:{	
		fontSize:28,
		fontWeight:'bold',	
		marginBottom:15
	},

	signUpLink:{
		flexDirection:'row',
		marginTop:10,
		backgroundColor:'transparent',
	}
});