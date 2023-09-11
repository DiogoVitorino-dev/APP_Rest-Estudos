import { useCallback, useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot, useRouter, useSegments } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

import { getValueSafety } from '@/shared/services/secureStorage';
import { GenericEnum } from '@/constants/GenericEnum';
import { ENamesPages } from '@/constants/ENamesPages';
import { TokenExpired } from '@/shared/services/validation/jwt';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { recoverySaved } from '@/store/thunks/AuthThunks';
import { fetchCidades } from '@/store/thunks/CidadesThunks';
import { fetchPessoas } from '@/store/thunks/PessoasThunks';
import { selectAuthStatus, selectUsuario } from '@/store/selectors/AuthSelector';
import { selectCidadesTotalCount } from '@/store/selectors/CidadesSelector';
import { selectPessoasTotalCount } from '@/store/selectors/PessoasSelector';
import { useColorScheme } from 'react-native';

export default function RootLayoutNav(){
	const colorscheme = useColorScheme();
	const segments = useSegments();
	const router = useRouter();

	const dispatch = useAppDispatch();
	const usuario = useAppSelector(selectUsuario);	
	const status = useAppSelector(selectAuthStatus);
	
	const totalCidades = useAppSelector(selectCidadesTotalCount);
	const totalPessoas = useAppSelector(selectPessoasTotalCount);

	useEffect(() => {
		if (!usuario && status === 'idle')
			dispatch(recoverySaved());		
	},[]);

	useEffect(() => {
		if (totalCidades <= 0)  
			dispatch(fetchCidades());

		if (totalPessoas <= 0)  
			dispatch(fetchPessoas());		
		
	},[totalCidades,totalPessoas]);

	const useProtectedRoute = useCallback(async () => {	
		const inAuthGroup = segments[0] === '(auth)';
		const inRootGroup = segments[0] === '(drawer)';	
		const isTokenValid = !TokenExpired(
			await getValueSafety(GenericEnum.secureKeyToken)
		);	
		
		if (!inAuthGroup && !isTokenValid  && !usuario) {
			// Redirect to the sign-in page.
			router.replace(`/(auth)/${ENamesPages.entrar}`);
		} else if (!inRootGroup && isTokenValid && usuario) {
			// Redirect away from the sign-in page.
			router.replace(`/(drawer)/${ENamesPages.paginaInicial}`);
		}		
	},[segments,router,usuario]);

	useEffect(() => {	
		useProtectedRoute(); 
	},[segments,router,usuario]);

	return (
		<ThemeProvider value={colorscheme === 'dark' ? DarkTheme : DefaultTheme}>			
			<PaperProvider>
				<Slot />
			</PaperProvider>			
		</ThemeProvider>
	);

}