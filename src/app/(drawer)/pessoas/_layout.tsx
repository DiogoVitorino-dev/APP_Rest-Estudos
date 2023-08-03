import { HeaderGoBack } from '@/components/shared';
import Colors  from '@/constants/Colors';
import { ELabelsPages } from '@/constants/ELabelsPages';
import { Stack, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { useColorScheme } from 'react-native';

const headerLeft = () => (
	<HeaderGoBack		 
		iconName='chevron-left'
		style={{marginLeft:5}}
	/>
);

export default function PessoasLayout() {
	const colorScheme = useColorScheme();	
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
					title: ELabelsPages.pessoas,					
					headerLeft,														
					headerTintColor: Colors[colorScheme || 'dark'].text,	
				}}
			/>			
		</Stack>
	);
}
