import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { InputDefault } from './InputDefault';
import { MaterialIcon, View } from '@/shared/components';
import { useTheme } from '@react-navigation/native';
import Colors from '@/constants/Colors';

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
					placeholder:placeholder || 'Senha',
					secureTextEntry:!passwordVisible,											
					value,
					onChangeText												
				}}
				errorMessage={error}
				style={styles.input}			
			/>
			{showPasswordButtonVisible ? (
				<Pressable 
					onPress={() => setPasswordVisible(!passwordVisible)}
					unstable_pressDelay={100}
					style={[{
						backgroundColor:Colors[theme.dark ?'dark':'light'].button,
						borderColor:Colors[theme.dark ?'dark':'light'].text,
						borderBottomWidth:StyleSheet.hairlineWidth
					},
					styles.button]}
				>
					{({pressed})=>(
						<MaterialIcon 
							name={passwordVisible ? 'visibility' : 'visibility-off'} 
							style={{opacity: pressed ? 0.6 : 1}}
						/>
					)}
				</Pressable>

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
		paddingHorizontal:5,
		alignItems:'center',
		justifyContent:'center',	
		height:'100%',				
	},
});