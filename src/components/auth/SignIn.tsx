
import {StyleSheet} from 'react-native';
import { useTheme } from '@react-navigation/native';

import Colors from '@/constants/Colors';
import { StyledView, OpenText, View, Button, LinkText } from '@/shared/components';
import { ENamesPages } from '@/constants/ENamesPages';
import { useSignInContext } from '@/contexts/auth';
import { InputEmail, InputPassword } from '../../shared/inputs';
import { useAppSelector } from '@/store/Hooks';
import { IUsuarioSignIn } from '@/models/Usuario';
import { selectAuthStatus } from '@/store/selectors/AuthSelector';

interface IProps {
	onPressLogin: (user:IUsuarioSignIn) => void
}

export function SignIn({onPressLogin}:IProps) {
	const {
		email,
		senha,
		setEmail,
		setSenha,
		errorEmail,
		errorSenha,
		validateFields
	} = useSignInContext();
	
	const status = useAppSelector(selectAuthStatus);
	const theme = useTheme();

	const beforeLogin = () => {
		const result = validateFields();
		if (result) onPressLogin({email,senha});
	};
	
	return (
	 <StyledView style={styles.container}>			
			<OpenText style={styles.title}>
				Fazer login
			</OpenText>	
					
			<InputEmail 
				onChangeText={(text) => setEmail(text)}
				placeholder='E-mail'
				value={email}
				error={errorEmail}
			/>
			
			<InputPassword 
				onChangeText={(text) => setSenha(text)}
				placeholder='Senha'
				value={senha}
				error={errorSenha}
				showPasswordButtonVisible
			/>	

			<Button 
				title='Login'					
				titleStyle={{fontWeight:'bold'}}
				style={styles.loginButton}
				mode='elevated'				
				disabled={
					!email || !senha
						? true 
						: false
				}
				loading={status === 'loading'}				
				onPress={beforeLogin} 
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