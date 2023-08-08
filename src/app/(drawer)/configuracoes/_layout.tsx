import { HeaderGoBack } from '@/components/shared';
import Colors  from '@/constants/Colors';
import { ELabelsPages } from '@/constants/ELabelsPages';
import { ENamesPages } from '@/constants/ENamesPages';
import { useTheme } from '@react-navigation/native';
import { Stack, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

const headerLeft = () => (
	<HeaderGoBack 		
		iconName='chevron-left'
		style={{marginLeft:5}}
	/>
);

export default function ConfiguracoesLayout() {
	const theme = useTheme();
	const navigation = useNavigation();

	useLayoutEffect(()=>{
		navigation.setOptions({
			headerShown:false
		});
	},[navigation]);
	
	return (
		<Stack initialRouteName='index'>      
			<Stack.Screen name="index" 
				options={{					
					title: ELabelsPages.configuracoes,
					headerLeft,														
					headerTintColor: Colors[theme.dark ? 'dark' : 'light'].text,					
				}} />
			<Stack.Screen name={ENamesPages.sobre} options={{title:ELabelsPages.sobre}} />
			<Stack.Screen name={ENamesPages.temas} options={{title:ELabelsPages.temas}} />
		</Stack>
	);
}
