import { Stack } from 'expo-router';

export default function ConfigLayout() {	
	return (
		<Stack>      
			<Stack.Screen
				name="index"
				options={{title: 'Configuration'}}
			/>
			<Stack.Screen
				name="two"
				options={{
					title: 'Tab Two',          
				}}
			/>
		</Stack>
	);
}
