import React from 'react';
import {StyleSheet} from 'react-native';
import { useTheme } from '@react-navigation/native';

import Colors from '@/constants/Colors';
import { StyledView, OpenText, View, Button, LinkText } from '@/shared/components';
import { ENamesPages } from '@/constants/ENamesPages';
import { InputEmail, InputPassword, InputUsername } from '../../shared/inputs';
import { useSignUpContext } from '@/contexts/auth';
import { useAppSelector } from '@/store/Hooks';
import { selectStatus } from '@/store/slices/AuthSlice';
import { IUsuarioSignUp } from '@/models/Usuario';

interface IProps {
	onPressSignUp: (usuario:IUsuarioSignUp) => void
}

export function SignUp({onPressSignUp}:IProps) {
	const {
		email,
		senha,
		nome,
		senhaConfirm,
		setNome,
		setEmail,
		setSenha,
		setSenhaConfirm,
		errorEmail,
		errorNome,
		errorSenha,
		errorSenhaConfirm,
		validateFields
	} = useSignUpContext();

	const theme = useTheme();
	const status = useAppSelector(selectStatus);

	const beforeSignUp = () => {
		if (validateFields()) 
			onPressSignUp({email,nome,senha});
	};
	
	return (
	 <StyledView style={styles.container}>			
			<OpenText style={styles.title}>Criar conta</OpenText>			
			
			<OpenText style={styles.subtitle}>Seu nome</OpenText>
			<InputUsername 
				onChangeText={(text) => setNome(text)}
				value={nome}
				error={errorNome}
			/>

			<OpenText style={styles.subtitle}>Endereço de e-mail</OpenText>			
			<InputEmail 
				onChangeText={(text) => setEmail(text)}
				value={email}
				error={errorEmail}
			/>		
			

			<OpenText style={styles.subtitle}>Senha</OpenText>
			<InputPassword
				placeholder='Pelo menos 6 caracteres' 
				onChangeText={(text) => setSenha(text)}
				value={senha}
				error={errorSenha}
				showPasswordButtonVisible
			/>				
			
			
			<OpenText style={styles.subtitle}>Digite novamente a senha</OpenText>
			<InputPassword				 
				onChangeText={(text) => setSenhaConfirm(text)}
				value={senhaConfirm}
				error={errorSenhaConfirm}				
			/>	

			<Button 
				title='Criar conta'					
				titleStyle={{fontWeight:'bold'}}
				disabled={
					!email || !senha || !nome || !senhaConfirm
						? true 
						: false
				}
				loading={status === 'loading'}				
				onPress={beforeSignUp} 
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