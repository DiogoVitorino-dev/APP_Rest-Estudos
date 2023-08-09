import { SignIn } from '@/components/auth';
import { View } from '@/shared/components';
import { SignInProvider } from '@/contexts/Auth';
import { useAuth } from '@/contexts/Auth/Auth';
import { IUser } from '@/models';
import { StyleSheet } from 'react-native';

export default function Entrar() {	
	
	const {signIn} = useAuth();

	const handlePressLogin = (user:Omit<IUser,'username'>) => {
		signIn(user);
	};
	
 	return (
		<SignInProvider>
			<View style={styles.container}>
				<SignIn onPressLogin={handlePressLogin} isLoading />			
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
