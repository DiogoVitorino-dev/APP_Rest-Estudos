
import { StyleSheet } from 'react-native';
import { Button, MaterialIcon, OpenText, View } from '@/shared/components';
import Colors from '@/constants/Colors';
import { useTheme } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { signOut } from '@/store/thunks/AuthThunks';
import { selectAuthStatus, selectUsuario } from '@/store/selectors/AuthSelector';


export default function UserProfile() {
	const theme = useTheme();
	const dispatch = useAppDispatch();

	const usuario = useAppSelector(selectUsuario);
	const status = useAppSelector(selectAuthStatus);

	const handleOnPressSignOut = () => {
		dispatch(signOut());
	};

	return (
		<View style={styles.container}>			
			<MaterialIcon name='account-circle' size={100} />
			
			<View style={styles.user}>
				<OpenText numberOfLines={1} adjustsFontSizeToFit style={styles.userName}>
					{usuario ? `Ola, ${usuario.nome}` : ''}
				</OpenText>
				<Button 
					icon={{
						name:'logout',
						size:15,
						color:Colors[theme.dark ? 'dark' : 'light'].warning
					}}
					backgroundColor='transparent'
					loading={status === 'loading'}
					title='Sair'
					rippleColor={Colors[theme.dark ? 'dark' : 'light'].warning}
					titleStyle={{color:Colors[theme.dark ? 'dark' : 'light'].warning}}
					onPress={handleOnPressSignOut}	
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
		marginTop:15
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
