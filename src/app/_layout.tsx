import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { useEffect } from 'react';
import { AuthProvider } from '@/contexts/Auth';

export {
	ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
	initialRouteName: 'entrar',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		OpenSans: require('../assets/fonts/OpenSans-Regular.ttf'),
		...FontAwesome.font,
	});

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}
	
	return <RootLayoutNav />;
}


function RootLayoutNav(){
	const colorScheme = useColorScheme();
	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<AuthProvider>
				<Slot />			
			</AuthProvider>
		</ThemeProvider>
	);

}