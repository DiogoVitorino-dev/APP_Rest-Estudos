import { TSettingRenderData } from '@/app/setting';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import { OpenText } from '../shared/StyledText';
import { View } from '../shared';
import { MaterialIcon } from '../shared';


interface IProps {
	data:TSettingRenderData
	onPress:(data:TSettingRenderData) => void
}

export function SectionItem({data,onPress}:IProps) {
	const isFirstItem=data.index === 0;
	const isLastItem= data.index === data.section.data.length - 1;
	
	return (
		<>
			<TouchableOpacity activeOpacity={0.85} onPress={() => onPress(data)}>
				<View style={[
					styles.container,
					isFirstItem ? styles.firstItem : undefined,
					isLastItem ? styles.lastItem : undefined,
				]} lightColor='#ccc' darkColor='#262626'>
					<OpenText numberOfLines={1} style={styles.text}>{data.item}</OpenText>
					<MaterialIcon name='chevron-right' size={30} />		
				</View>
			</TouchableOpacity>
		</>
	);
}

const styles = StyleSheet.create({
	container:{		
		minHeight:50,		      
		maxWidth:500,
		height:60,		  
		paddingHorizontal:10, 
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between'	
	},
	text:{
		fontSize:18,
		fontWeight:'bold',
		textTransform:'capitalize'	
	},
	firstItem:{
		borderTopEndRadius:20,
		borderTopStartRadius:20
	},
	
	lastItem:{
		borderBottomEndRadius:20,
		borderBottomStartRadius:20
	}
});