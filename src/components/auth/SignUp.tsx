import React from 'react';
import {StyleSheet} from 'react-native';
import { StyledView, OpenText, View, Button, LinkText } from '@/shared/components';
import Colors from '@/constants/Colors';
import { useTheme } from '@react-navigation/native';
import { Input } from './Input';
import { IUser } from '@/models';
import { useSignUpContext } from '@/contexts/Auth';
import { ENamesPages } from '@/constants/ENamesPages';

interface IProps {
	onPressSignUp: (user:IUser) => void
	isLoading:boolean
}

export function SignUp({onPressSignUp,isLoading}:IProps) {
	const {
		email,
		password,
		username,
		passwordConfirm,
		setUsername,
		setEmail,
		setPassword,
		setPasswordConfirm,
		errorEmail,
		errorUsername,
		errorPassword,
		errorPasswordConfirm,
		validateFields
	} = useSignUpContext();

	const theme = useTheme();

	const validateBeforeSignUp = () => {
		const result = validateFields();
		if (result) onPressSignUp({email,password,username});
	};
	
	return (
	 <StyledView style={styles.container}>			
			<OpenText style={[styles.title,{
				color:Colors[theme.dark ? 'dark' : 'light'].text
			}]}>Criar conta</OpenText>			
			
			<OpenText style={styles.subtitle}>Seu nome</OpenText>
			<Input 
				textInputProps={{					
					value:username,
					textContentType:'familyName',
					onChangeText:text => setUsername(text),					
				}}
				errorMessage={errorUsername}
				style={styles.input}
			/>

			<OpenText style={styles.subtitle}>Endereço de e-mail</OpenText>
			<Input 
				textInputProps={{					
					value:email,
					textContentType:'emailAddress',
					onChangeText:text => setEmail(text),				
				}}
				errorMessage={errorEmail}
				style={styles.input}
			/>

			<OpenText style={styles.subtitle}>Senha</OpenText>		
			<Input 
				textInputProps={{
					placeholder:'Pelo menos 6 caracteres',
					secureTextEntry:true,										
					value:password,
					onChangeText:text => setPassword(text),												
				}}
				errorMessage={errorPassword}
				style={styles.input}				
			/>
			
			
			<OpenText style={styles.subtitle}>Digite novamente a senha</OpenText>			
			<Input 
				textInputProps={{						
					secureTextEntry:true,										
					value:passwordConfirm,
					onChangeText:text => setPasswordConfirm(text),												
				}}
				errorMessage={errorPasswordConfirm}
				style={styles.input}				
			/>
			

			<Button 
				title='Criar conta'					
				titleStyle={{fontWeight:'bold'}}
				disabled={
					!email || !password || !username || !passwordConfirm
						? true 
						: false
				}
				loading={isLoading}
				backgroundColor={Colors[theme.dark ? 'dark' : 'light'].button}
				rippleColor={Colors[theme.dark ? 'dark' : 'light'].buttonSelected}
				onPress={() => validateBeforeSignUp()} 
			/>

			<View style={styles.signUpLink}>				
				<OpenText>Já tem uma conta?</OpenText>				
				<LinkText 
					title='Fazer login' 
					href={`/${ENamesPages.entrar}`}					
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

	input:{
		marginBottom:10,
		backgroundColor:'transparent'
	},

	title:{	
		fontSize:28,
		fontWeight:'bold',	
		marginBottom:15
	},
	
	subtitle:{	
		fontSize:16,
		fontWeight:'bold',
		opacity:0.9,	
		marginBottom:5
	},

	signUpLink:{
		flexDirection:'row',
		backgroundColor:'transparent',
		marginTop:10
	}
});