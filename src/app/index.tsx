import { Slot, useRouter, useSegments } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { getValueSafety } from '@/shared/services/secureStorage';
import { GenericEnum } from '@/constants/GenericEnum';
import { ENamesPages } from '@/constants/ENamesPages';
import { TokenExpired } from '@/shared/services/validation/jwt';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/Hooks';
import { selectStatus, selectUsuario } from '@/store/slices/AuthSlice';
import { recoverySaved } from '@/store/thunks/AuthThunks';

export default function RootLayoutNav(){
	const colorScheme = useColorScheme();
	const segments = useSegments();
	const router = useRouter();

	const dispatch = useAppDispatch();
	const usuario = useAppSelector(selectUsuario);	
	const status = useAppSelector(selectStatus);	

	useEffect(() => {
		if (!usuario && status === 'idle')
			dispatch(recoverySaved());		
	},[]);

	const useProtectedRoute = async () => {	
		const inAuthGroup = segments[0] === '(auth)';
		const inRootGroup = segments[0] === '(drawer)';	
		const isTokenValid = !TokenExpired(
			await getValueSafety(GenericEnum.secureKeyToken)
		);	
		
		if (!inAuthGroup && !isTokenValid  && !usuario) {
			// Redirect to the sign-in page.
			router.replace(`/(auth)/${ENamesPages.entrar}`);
		} else if (!inRootGroup && isTokenValid) {
			// Redirect away from the sign-in page.
			router.replace(`/(drawer)/${ENamesPages.paginaInicial}`);
		}		
	};

	useEffect(() => {	
		useProtectedRoute(); 
	},[segments,router,usuario]);

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>			
			<PaperProvider>
				<Slot />
			</PaperProvider>			
		</ThemeProvider>
	);

}