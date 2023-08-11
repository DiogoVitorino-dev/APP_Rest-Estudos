import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, MaterialIcon, OpenText, View } from '@/shared/components';
import Colors from '@/constants/Colors';
import { useTheme } from '@react-navigation/native';
import { useAuth } from '@/contexts/Auth';

export default function UserProfile() {
	const theme = useTheme();
	const {signOut, user, loading} = useAuth();
	return (
		<View style={styles.container}>			
			<MaterialIcon name='account-circle' size={100} />
			
			<View style={styles.user}>
				<OpenText numberOfLines={1} adjustsFontSizeToFit style={styles.userName}>
					{user ? `Ola, ${user?.username}` : ''}
				</OpenText>
				<Button 
					icon={{
						name:'logout',
						size:15,
						color:Colors[theme.dark ? 'dark' : 'light'].warning
					}}
					backgroundColor='transparent'
					loading={loading}
					title='Sair'
					rippleColor={Colors[theme.dark ? 'dark' : 'light'].warning}
					titleStyle={{color:Colors[theme.dark ? 'dark' : 'light'].warning}}
					onPress={() => signOut()}	
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
