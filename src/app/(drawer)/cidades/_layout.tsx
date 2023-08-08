import { HeaderGoBack } from '@/components/shared';
import Colors  from '@/constants/Colors';
import { ELabelsPages } from '@/constants/ELabelsPages';
import { useTheme } from '@react-navigation/native';
import { Stack, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

const headerLeft = () => (
	<HeaderGoBack		 
		iconName='chevron-left'
		style={{marginLeft:5}}
	/>
);

export default function CidadesLayout() {
	const theme = useTheme();
	const navigation = useNavigation();

	useLayoutEffect(()=>{
		navigation.setOptions({
			headerShown:false
		});
	},[navigation]);

	return (
		<Stack initialRouteName='index'>      
			<Stack.Screen
				name="index"
				options={{
					title: ELabelsPages.cidades,
					headerLeft,														
					headerTintColor: Colors[theme.dark ? 'dark' : 'light'].text,
				}}
			/>			
		</Stack>
	);
}
