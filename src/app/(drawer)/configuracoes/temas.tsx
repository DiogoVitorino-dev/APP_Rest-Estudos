import { RadioItem } from '@/components/configuracoes';
import { View } from '@/shared/components';
import { StyleSheet } from 'react-native';

export default function Temas() {
	const handleOnValueChange = (value:string) => {value;};

	return (
		<View style={styles.container}>
			<RadioItem onValueChange={handleOnValueChange} />			
		</View>
	);
};

const styles = StyleSheet.create({
	container:{
		flex:1,			
		flexDirection:'column'
	}
});