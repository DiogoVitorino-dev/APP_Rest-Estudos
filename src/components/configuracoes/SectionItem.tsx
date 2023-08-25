import { TSettingsData } from '@/app/(drawer)/configuracoes';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import { MaterialIcon, OpenText, StyledView, View } from '@/shared/components';

interface IProps {
	data:TSettingsData
	onPress: (item:TSettingsData) => void
	isFirstItem:boolean
	isLastItem:boolean
}

const lightColor = '#ccc';
const darkColor = '#262626';

export function SectionItem({data,onPress,isFirstItem,isLastItem}:IProps) {
	return (	
		<Pressable onPress={() => onPress(data)}>				
			<StyledView style={[
				styles.container,
				isFirstItem ? styles.firstItem : undefined,
				isLastItem ? styles.lastItem : undefined,
			]} lightColor={lightColor} darkColor={darkColor}>
				<View style={styles.containerText}>
					<OpenText numberOfLines={1} style={styles.text}> 
						{data.title} 
					</OpenText>
					{data.subTitle ? (
						<OpenText numberOfLines={1} style={[styles.text,styles.subTitle]}> 
							{data.subTitle} 
						</OpenText>
					) : <></>}
				</View>			
				
				<MaterialIcon  name='chevron-right' size={30}  />		
			</StyledView>	
		</Pressable>	
		
	);
}

const styles = StyleSheet.create({
	container:{
		width:'100%',
		minHeight:50,
		justifyContent:'space-between',
		alignItems:'center',
		paddingHorizontal:30,		
		flexDirection:'row',	
	},

	containerText:{		
		flexDirection:'column',
		backgroundColor:'transparent',
	},

	text:{			
		fontSize:18,			
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