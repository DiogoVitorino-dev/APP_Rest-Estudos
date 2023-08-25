import Colors from '@/constants/Colors';
import { ICidade } from '@/models/Cidade';
import { IconButton } from '@/shared/buttons';
import { OpenText, View } from '@/shared/components';
import React from 'react';
import {StyleSheet} from 'react-native';

interface IProps {	
	item:ICidade
	onPressDelete: (item:ICidade) => void	
	onPressEdit: (item:ICidade) => void	
}
export function ListItem({item,onPressDelete,onPressEdit}:IProps) {	
	return (
	 <View style={styles.container} >
			<OpenText style={styles.name}>{item.nome}</OpenText>
			<View style={styles.containerButton}>
				<IconButton 
					icon={{
						name:'edit',
						color:Colors['icon'].edit,
						size:20
					}}					
					onPress={() => onPressEdit(item)} 
				/>
				<IconButton 
					icon={{
						name:'delete',
						color:Colors['icon'].delete,
						size:20
					}}
					onPress={() => onPressDelete(item)} 
				/>	
			</View>						
	 </View>
	);
};

const styles = StyleSheet.create({
	container:{		
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
		padding:10,
		paddingRight:0,
		borderBottomWidth:1,	
	},

	containerButton:{
		flexDirection:'row'
	},
	
	name:{
		userSelect:'text',
		fontSize:20,
		opacity:0.8,
		fontWeight:'bold',
		flexGrow:2,
	},
});