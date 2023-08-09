import { ELabelsPages } from '@/constants/ELabelsPages';
import { ENamesPages } from '@/constants/ENamesPages';
import { Stack } from 'expo-router';
import '@/shared/services/TranslationYup';

export default function AuthLayout() {	
	return (
		<Stack>      
			<Stack.Screen
				name={ENamesPages.entrar}
				options={{title: ELabelsPages.entrar,headerShown:false}}
			/>
			<Stack.Screen 
				name={ENamesPages.cadastrar}				
				options={{title: ELabelsPages.cadastrar,headerTitle:'Voltar'}}
			/>
		</Stack>
	);
}
