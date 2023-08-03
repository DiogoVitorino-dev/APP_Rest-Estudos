import { ELabelsPages } from '@/constants/ELabelsPages';
import { ENamesPages } from '@/constants/ENamesPages';
import { Stack } from 'expo-router';

export default function AuthLayout() {	
	return (
		<Stack>      
			<Stack.Screen
				name={ENamesPages.entrar}
				options={{title: ELabelsPages.entrar,headerShown:false}}
			/>
			<Stack.Screen 
				name={ENamesPages.cadastrar}
				options={{title: ELabelsPages.cadastrar}}
			/>
		</Stack>
	);
}
