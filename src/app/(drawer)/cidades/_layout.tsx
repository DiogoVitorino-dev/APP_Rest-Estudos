import Colors  from '@/constants/Colors';
import { ELabelsPages } from '@/constants/ELabelsPages';
import { useTheme } from '@react-navigation/native';
import { Stack, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { CidadesProvider } from '@/contexts/cidades';
import { ENamesPages } from '@/constants/ENamesPages';
import { useAppDispatch } from '@/shared/hooks/redux';
import { filterCidades } from '@/store/thunks/CidadesThunks';
import { HeaderLeft } from '@/shared/components';

export default function CidadesLayout() {
	const theme = useTheme();
	const navigation = useNavigation();

	const dispatch = useAppDispatch();

	const onSearch = (text:string) => dispatch(filterCidades(text));

	const headerLeft = () => (<HeaderLeft onSearch={onSearch}/>);

	useLayoutEffect(()=>{
		navigation.setOptions({
			headerShown:false
		});
	},[navigation]);

	return (
		<CidadesProvider>
			<Stack initialRouteName='index'>      
				<Stack.Screen
					name="index"
					options={{
						title: ELabelsPages.cidades,
						headerTitle:'',
						headerLeft,																	
						headerTintColor: Colors[theme.dark ? 'dark' : 'light'].text,
					}}
				/>

				<Stack.Screen
					name={ENamesPages.detalhe}										
					options={{
						title: ELabelsPages.detalheCidade,
						headerTitleAlign:'center',
						headerTintColor: Colors[theme.dark ? 'dark' : 'light'].text,
					}}
				/>
				
				<Stack.Screen				
					name={ENamesPages.nova}		
					options={{
						title: ELabelsPages.novaCidade,
						headerTitleAlign:'center',																								
						headerTintColor: Colors[theme.dark ? 'dark' : 'light'].text,
					}}
				/>						
			</Stack>
		</CidadesProvider>
	);
}
