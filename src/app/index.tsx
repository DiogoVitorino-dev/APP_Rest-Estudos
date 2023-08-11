import { Slot } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { AuthProvider } from '@/contexts/Auth';
import { PaperProvider } from 'react-native-paper';

export default function RootLayoutNav(){
	const colorScheme = useColorScheme();

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<AuthProvider>
				<PaperProvider>
					<Slot />
				</PaperProvider>
			</AuthProvider>
		</ThemeProvider>
	);

}