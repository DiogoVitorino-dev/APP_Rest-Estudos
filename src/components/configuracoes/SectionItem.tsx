import { TSettingsData } from '@/app/(drawer)/configuracoes';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcon, OpenText, StyledView, View } from '@/shared/components';
import { ENamesPages } from '@/constants/ENamesPages';

interface IProps {
	item:TSettingsData
	isFirstItem:boolean
	isLastItem:boolean
}

const lightColor = '#ccc';
const darkColor = '#262626';

export function SectionItem({item,isFirstItem,isLastItem}:IProps) {
	return (		
		<Link href={item.screen || `/(drawer)/${ENamesPages.paginaInicial}`}asChild>
			<TouchableOpacity activeOpacity={0.85}>
				<StyledView style={[
					styles.container,
					isFirstItem ? styles.firstItem : undefined,
					isLastItem ? styles.lastItem : undefined,
				]} lightColor={lightColor} darkColor={darkColor}>
					<View lightColor={lightColor} darkColor={darkColor}>
						<OpenText numberOfLines={1} style={styles.text}> 
							{item.title} 
						</OpenText>
						<OpenText numberOfLines={1} style={[styles.text,styles.subTitle]}> 
							{item.subTitle} 
						</OpenText>
					</View>					
					<MaterialIcon name='chevron-right' size={30}  />		
				</StyledView>
			</TouchableOpacity>
		</Link>
		
	);
}

const styles = StyleSheet.create({
	container:{		
		minHeight:50,
		height:60,		  
		paddingHorizontal:30,		
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between'	
	},
	text:{
		fontSize:18,
		marginVertical:2,		
		fontWeight:'bold',
		textTransform:'capitalize'	
	},
	subTitle:{
		fontSize:12,		
		fontWeight:'normal',
		opacity:0.7,
		textTransform:'none'
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