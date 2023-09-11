import Colors from '@/constants/Colors';
import { View } from '@/shared/components';
import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

interface IProps{
	onValueChange:(value:string) => void
}

export function RadioItem({onValueChange}:IProps) {
	const [checked,setChecked] = useState<string>('sys');
	const theme = useTheme();
	return (
		<View style={styles.container}>	
			<RadioButton.Group value={checked} onValueChange={(value) => {
				setChecked(value);
				onValueChange(value);
			}}>
				<RadioButton.Item 
					label='Claro' 
					value='light'
					disabled
					labelStyle={{color:Colors[theme.dark ? 'dark' : 'light'].text}}
					color={Colors[theme.dark ? 'dark' : 'light'].tint}
				/>
				<RadioButton.Item 
					label='Escuro' 
					value='dark'
					disabled
					labelStyle={{color:Colors[theme.dark ? 'dark' : 'light'].text}}
					color={Colors[theme.dark ? 'dark' : 'light'].tint}
				/>
				<RadioButton.Item 
					label='Padrão do sistema' 
					value='sys'
					labelStyle={{color:Colors[theme.dark ? 'dark' : 'light'].text}}
					color={Colors[theme.dark ? 'dark' : 'light'].tint}
				/>
			</RadioButton.Group>	
		</View>	
	);		
};

const styles = StyleSheet.create({
	container:{
		maxWidth:864
	}
});
