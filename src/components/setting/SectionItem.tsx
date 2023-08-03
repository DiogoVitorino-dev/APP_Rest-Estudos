import { TSettingRenderItemInfo } from '@/app/(drawer)/configuracoes';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcon, OpenText, View } from '../shared';
import { ENamesPages } from '@/constants/ENamesPages';

export function SectionItem({index,item,section}:TSettingRenderItemInfo) {
	const isFirstItem= index === 0;
	const isLastItem= index === section.data.length - 1;
	
	return (		
		<Link href={item.screen || `/(drawer)/${ENamesPages.paginaInicial}`}asChild>
			<TouchableOpacity activeOpacity={0.85}>
				<View style={[
					styles.container,
					isFirstItem ? styles.firstItem : undefined,
					isLastItem ? styles.lastItem : undefined,
				]} lightColor='#ccc' darkColor='#262626'>
					<OpenText numberOfLines={1} style={styles.text}> {item.titleOption} </OpenText>
					<MaterialIcon name='chevron-right' size={30}  />		
				</View>
			</TouchableOpacity>
		</Link>
		
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
		marginLeft:25,
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