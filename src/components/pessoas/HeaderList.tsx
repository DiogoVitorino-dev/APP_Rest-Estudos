
import {StyleSheet} from 'react-native';
import { ENamesPages } from '@/constants/ENamesPages';
import { IconButton } from '@/shared/buttons';
import { OpenText, View } from '@/shared/components';
import { useAppDispatch } from '@/shared/hooks/redux';
import { refreshPessoas } from '@/store/slices/PessoasSlice';
import { useRouter } from 'expo-router';

export function HeaderList() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	
	const handleOnPressRefresh = () => {		
		dispatch(refreshPessoas());		
	};

	const navigateToNewCity = () => {
		router.push(`/${ENamesPages.pessoas}/${ENamesPages.nova}`);		
	};

	return (		
		<View style={[styles.container]}>
			<OpenText style={styles.headerTitle}>Nome</OpenText>
			<View style={styles.containerButtons}>				
				<IconButton icon={{name:'add'}} onPress={navigateToNewCity}  />
				<IconButton icon={{name:'refresh'}} onPress={handleOnPressRefresh}  />				
			</View>
		</View>	 	
	);
};

const styles = StyleSheet.create({
	container:{
		minHeight:40,
		borderBottomWidth:2,		
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',		
	},
	headerTitle:{
		fontSize:18,
		marginLeft:60,	
		fontWeight:'bold',
		userSelect:'text'
	},
	containerButtons:{
		flexDirection:'row'
	}
});