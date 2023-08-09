import React from 'react';
import {StyleSheet} from 'react-native';
import { OpenText } from '@/shared/components/StyledText';
import { View } from '@/shared/components';
import { TSettingRenderSectionHeader } from '@/app/(drawer)/configuracoes';

export function SectionHeader({section}:TSettingRenderSectionHeader) {
	return (
		<View style={styles.container}>
			{section.icon}
			<OpenText style={[styles.title]}>{section.title}</OpenText>    
		</View>
	);
};

const styles = StyleSheet.create({
	container:{
		flexDirection:'row',				
		alignItems:'center',
		borderBottomWidth:2
	},
    
	title:{
		fontSize:26,
		textTransform:'capitalize',
		fontWeight:'bold',
		margin:5
	},
});