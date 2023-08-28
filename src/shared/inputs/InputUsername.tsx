
import {StyleSheet} from 'react-native';
import { InputDefault } from './InputDefault';

interface IProps {
	value:string
	placeholder?:string
	onChangeText: (text:string) => void
	error?:string
}

export function InputUsername({onChangeText,placeholder,value,error}:IProps) {
	return (
		<InputDefault 
			textInputProps={{					
				value,
				placeholder,
				textContentType:'familyName',
				onChangeText					
			}}
			errorMessage={error}
			style={styles.input}
		/>	 
	);
};

const styles = StyleSheet.create({
	input:{
		marginBottom:10
	},
});