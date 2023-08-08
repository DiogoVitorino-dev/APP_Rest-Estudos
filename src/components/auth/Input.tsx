import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';
import { MaterialIcon, Text, View } from '../shared';
import { useTheme } from '@react-navigation/native';
import Colors from '@/constants/Colors';

interface IProps {
	textInputProps?:TextInputProps
	errorMessage?:string
	style?:StyleProp<ViewStyle>
}

export function Input({textInputProps,errorMessage,style}:IProps) {
	const theme = useTheme();
	return (
	 <View style={[styles.transparent, style]}>		
			<TextInput
				{...textInputProps}
				
				placeholderTextColor={
					textInputProps?.placeholderTextColor ||
					Colors[theme.dark ? 'dark' : 'light'].text
				}
				
				textColor={Colors[theme.dark ? 'dark' : 'light'].text}				
				
				style={[styles.input,textInputProps?.style,{					
					backgroundColor:Colors[theme.dark ? 'dark' : 'light'].button + '40',
				}]}

				underlineColor={
					errorMessage ? Colors[theme.dark ? 'dark' : 'light'].warning : undefined
				}
				underlineColorAndroid={
					errorMessage ? Colors[theme.dark ? 'dark' : 'light'].warning : undefined
				} 
				activeUnderlineColor={Colors[theme.dark ? 'dark' : 'light'].tint} 
			/>
			{errorMessage ? (
				<View style={[styles.transparent, styles.error]}>
					<MaterialIcon 
						name='error'
						size={15}
						color={Colors[theme.dark ? 'dark' : 'light'].warning}
					/>
					<Text style={[styles.errorText,{
						color:Colors[theme.dark ? 'dark' : 'light'].warning
					}]}>
						{errorMessage}
					</Text>
				</View>
			): undefined}			
	 </View>
	);
};

const styles = StyleSheet.create({
	transparent:{
		backgroundColor:'transparent',
	},
	
	input:{
		height:50,		
	},

	error:{
		flexDirection:'row',
		alignItems:'center',
		padding:3
	},
	errorText:{
		fontSize:14,
		marginLeft:3
	}
});