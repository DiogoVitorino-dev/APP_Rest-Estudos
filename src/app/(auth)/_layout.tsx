import '@/shared/services/validation/yup/TranslationYup';
import { Stack } from 'expo-router';
import { ELabelsPages } from '@/constants/ELabelsPages';
import { ENamesPages } from '@/constants/ENamesPages';

export default function AuthLayout() {	
	return (		
		<Stack initialRouteName={ENamesPages.entrar}>  
			<Stack.Screen
				name={ENamesPages.entrar}
				options={{title: ELabelsPages.entrar,headerShown:false}}
			/>
			<Stack.Screen 
				name={ENamesPages.cadastrar}				
				options={{title: ELabelsPages.cadastrar,headerTitle:''}}
			/>
		</Stack>
	);
}
