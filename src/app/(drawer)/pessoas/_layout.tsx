import Colors  from '@/constants/Colors';
import { ELabelsPages } from '@/constants/ELabelsPages';
import { useTheme } from '@react-navigation/native';
import { Stack, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { PessoasProvider } from '@/contexts/pessoas';
import { ENamesPages } from '@/constants/ENamesPages';
import { HeaderLeft } from '@/shared/components';
import { useAppDispatch } from '@/store/Hooks';
import { filterPessoas } from '@/store/thunks/PessoasThunks';

export default function PessoasLayout() {	
	const theme = useTheme();
	const navigation = useNavigation();

	const dispatch = useAppDispatch();

	const onSearch = (text:string) => dispatch(filterPessoas(text));

	const headerLeft = () => (<HeaderLeft onSearch={onSearch}/>);

	useLayoutEffect(()=>{
		navigation.setOptions({
			headerShown:false
		});
	},[navigation]);
	
	return (
		<PessoasProvider>
			<Stack initialRouteName='index'>      
				<Stack.Screen
					name="index"
					options={{
						title: ELabelsPages.pessoas,						
						headerTitle:'',
						headerLeft,
						headerTintColor: Colors[theme.dark ? 'dark' : 'light'].text,
					}}
				/>

				<Stack.Screen
					name={ENamesPages.detalhe}										
					options={{
						title: ELabelsPages.detalhePessoas,
						headerTitleAlign:'center',
						headerTintColor: Colors[theme.dark ? 'dark' : 'light'].text,
					}}
				/>
				
				<Stack.Screen				
					name={ENamesPages.nova}		
					options={{
						title: ELabelsPages.novaPessoas,
						headerTitleAlign:'center',																								
						headerTintColor: Colors[theme.dark ? 'dark' : 'light'].text,
					}}
				/>						
			</Stack>
		</PessoasProvider>
	);
}
