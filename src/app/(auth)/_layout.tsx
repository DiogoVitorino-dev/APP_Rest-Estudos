import { ELabelsPages } from '@/constants/ELabelsPages';
import { ENamesPages } from '@/constants/ENamesPages';
import { Stack } from 'expo-router';
import '@/shared/services/validation/TranslationYup';
import { RegisterProvider } from '@/contexts/register';

export default function AuthLayout() {	
	return (
		<RegisterProvider>
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
		</RegisterProvider>
	);
}
