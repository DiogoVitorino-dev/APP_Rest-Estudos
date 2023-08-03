import { View } from '@/components/shared';
import Colors from '@/constants/Colors';
import { ENamesPages } from '@/constants/ENamesPages';
import { useAuth } from '@/contexts/Auth';
import { useRouter } from 'expo-router';
import { Button, StyleSheet, TextInput, useColorScheme } from 'react-native';

export default function Entrar() {
	const colorScheme = useColorScheme();
	const router = useRouter();
	const navigateToSignUp = () => router.push(`/${ENamesPages.cadastrar}`);
	const {signIn} = useAuth();
	
 	return (
		<View style={styles.container}>
			<TextInput 
				placeholder='E-mail' 
				placeholderTextColor={Colors[colorScheme || 'dark'].text} />
			<TextInput 
				placeholder='Senha' 
				placeholderTextColor={Colors[colorScheme || 'dark'].text}/>
			<View>
				<Button title='Entrar' onPress={() => signIn({email:'',nome:'a',senha:''})} />
				<Button title='Cadastrar' onPress={navigateToSignUp} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container:{
		flex:1
	}
});
