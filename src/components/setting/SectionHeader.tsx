import { TSettingRenderData } from '@/app/setting';
import React from 'react';
import {StyleSheet} from 'react-native';
import { OpenText } from '../shared/StyledText';
import { View } from '../shared';

export function SectionHeader(
	{section}:Omit<TSettingRenderData, 'index' | 'item' | 'separators'>
) {
	return (
		<View style={styles.container}>
			{section.icon}
			<OpenText style={styles.title}>{section.title}</OpenText>    
		</View>
	);
};

const styles = StyleSheet.create({
	container:{
		flexDirection:'row',				
		alignItems:'center',
		borderBottomWidth:StyleSheet.hairlineWidth
	},
    
	title:{
		fontSize:26,
		textTransform:'capitalize',
		fontWeight:'bold',
		marginHorizontal:5
	},
});