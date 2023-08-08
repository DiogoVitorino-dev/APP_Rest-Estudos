import { RadioItem } from '@/components/configuracoes';
import { View } from '@/components/shared';
import React from 'react';
import { Appearance, Platform, StyleSheet } from 'react-native';

const handleOnValueChange = (value:string) => {
	if (Platform.OS !== 'web')
		if (value === 'light')
			Appearance.setColorScheme('light');
		else if (value === 'dark')
			Appearance.setColorScheme('dark');		
		else
			Appearance.setColorScheme(null);
};

export default function Temas() {	
	return (
		<View style={styles.container}>
			<RadioItem onValueChange={handleOnValueChange} />			
		</View>
	);
};

const styles = StyleSheet.create({
	container:{
		paddingHorizontal:52,
		flexDirection:'column'
	}
});