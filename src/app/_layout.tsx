import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';
import RootLayoutNav from '.';
import { Provider } from 'react-redux';
import { store } from '@/store';

export {
	ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
	initialRouteName: 'entrar',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		OpenSans: require('@/assets/fonts/OpenSans-Regular.ttf'),
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
	
	return (
		<Provider store={store}>
			<RootLayoutNav />
		</Provider>
	);
}