import React from 'react';
import {Image, ImageSourcePropType, StyleSheet} from 'react-native';
import { Button, MaterialIcon, OpenText, View } from '../shared';
import Colors from '@/constants/Colors';
import { useTheme } from '@react-navigation/native';

interface IProps {
	userName?:string 
	profilePicture?:ImageSourcePropType
}

export default function UserProfile({userName,profilePicture}:IProps) {
	const theme = useTheme();
	return (
		<View style={styles.container}>
			{profilePicture ? (
				<Image style={styles.image} source={profilePicture} />
			) : (
				<MaterialIcon name='account-circle' size={100} />
			)}
			<View style={styles.user}>
				<OpenText numberOfLines={1} adjustsFontSizeToFit style={styles.userName}>
					{'Ola, '+userName || ''}
				</OpenText>
				<Button 
					icon={{
						name:'logout',
						size:15,
						color:Colors[theme.dark ? 'dark' : 'light'].warning
					}} 
					title='Sair'
					rippleColor={Colors[theme.dark ? 'dark' : 'light'].warning}
					titleStyle={{color:Colors[theme.dark ? 'dark' : 'light'].warning}}
					onPress={() => {console.log('saindo...');}}	
					style={{width:80}}				
				/>
			</View>
					
		</View>
	);
};

const styles = StyleSheet.create({
	container:{
		width:'100%',			
		alignItems:'center',		
		flexDirection:'row',
		padding:10,
	},
	
	user:{
		maxWidth:200,
		marginHorizontal:10				
	},

	image:{
		width:100,		
		height:100,			
	},

	userName:{
		width:'100%',
		fontWeight:'bold',
		fontSize:20,		
	}
});
