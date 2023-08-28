
import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { IPessoa } from '@/models/Pessoa';
import { IconButton } from '@/shared/buttons';
import { MaterialIcon, OpenText, View } from '@/shared/components';

interface IProps {	
	item:IPessoa
	onPressDelete: (item:IPessoa) => void	
	onPressEdit: (item:IPessoa) => void	
}
export function ListItem({item,onPressDelete,onPressEdit}:IProps) {	
	return (
	 <View style={styles.container} >
			<View style={styles.containerInfo}>
				<MaterialIcon name='account-circle' size={40} />
				<OpenText style={styles.name}>{item.nomeCompleto}</OpenText>				
			</View>
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
		flexDirection:'row',				
	},
	containerInfo:{
		flexDirection:'row',
		alignItems:'center'
	},
	name:{
		userSelect:'text',
		fontSize:20,
		marginHorizontal:10,
		opacity:0.7,
		fontWeight:'bold',
		flexGrow:2,
	},
});