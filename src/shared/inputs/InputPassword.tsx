import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { InputDefault } from './InputDefault';
import { View } from '@/shared/components';
import { useTheme } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import { IconButton } from '../buttons';

interface IProps {
	placeholder?:string
	value:string
	onChangeText: (text:string) => void
	error?:string
	showPasswordButtonVisible?:boolean
}

export function InputPassword({
	error,onChangeText,value,placeholder,showPasswordButtonVisible}:IProps
) {
	const [passwordVisible,setPasswordVisible] = useState<boolean>(false);
	const theme = useTheme();
	
	return (
		<View style={styles.container}>
			<InputDefault 
				textInputProps={{
					placeholder,
					secureTextEntry:!passwordVisible,											
					value,
					onChangeText												
				}}
				errorMessage={error}
				style={styles.input}			
			/>
			{showPasswordButtonVisible ? (
				<View style={[styles.button,{					
					borderColor: Colors[theme.dark ?'dark':'light'].text,
					borderBottomWidth:StyleSheet.hairlineWidth
				}]}>
					<IconButton 
						icon={{
							name:passwordVisible ? 'visibility' : 'visibility-off',
							color:passwordVisible ? Colors[theme.dark ?'dark':'light'].tint : undefined
						}}
						onPress={() => setPasswordVisible(!passwordVisible)}
					/>
				</View>					
			) : null}			
		</View>
	);
};

const styles = StyleSheet.create({
	container:{
		flexDirection:'row',
		alignItems:'center',
		marginBottom:10				
	},

	input:{		
		flex:1,
		flexGrow:2,		
	},
	
	button:{		
		position:'absolute',
		right:0,
		height:50,
		backgroundColor:'transparent',		
	},
});