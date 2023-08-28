
import {View, StyleSheet} from 'react-native';
import { useTheme } from '@react-navigation/native';

import Colors from '@/constants/Colors';
import { MaterialIcon } from './MaterialIcon';
import { OpenText } from './StyledText';

export function EmptyListFeedback() {
	const theme = useTheme();
	return (
	 <View style={styles.centeredView}>			
			<MaterialIcon 
				name='sentiment-dissatisfied' 
				size={50} 
				color={Colors[theme.dark ? 'dark' : 'light'].tint} />
			<OpenText style={[styles.message,{
				color: Colors[theme.dark ? 'dark' : 'light'].tint
			}]}>
				Lista vazia
			</OpenText>			
	 </View>
	);
};

const styles = StyleSheet.create({
	centeredView:{
		justifyContent:'center',
		alignItems:'center',
		padding:30,
	},	
	message:{
		fontSize:26
	}
});