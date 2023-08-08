import React from 'react';
import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import { IMaterialIconProps, MaterialIcon } from './MaterialIcon';
import { OpenText } from './StyledText';
import { Button as ButtonPaper } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import Colors from '@/constants/Colors';

interface IProps {
	icon?:IMaterialIconProps
	title:string
	titleStyle?:StyleProp<TextStyle>
	onPress: () => void
	rippleColor?:string
	backgroundColor?:string
	mode?: TButtonPaperMode
	style?:StyleProp<Omit<ViewStyle, | 'backgroundColor'>>
	disabled?:boolean
	loading?:boolean
}

type TButtonPaperMode = 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal'

export function Button(
	{icon,title,onPress,style,backgroundColor,titleStyle,disabled,loading,mode,rippleColor}:IProps
) {
	const theme = useTheme();
	
	return (		
		<ButtonPaper
			disabled={disabled}			
			loading={loading}
			textColor={Colors[theme.dark ? 'dark' : 'light'].text}
			style={[{opacity:disabled ? 0.9 : 1},style]}
			mode={mode || 'text'}
			rippleColor={
				rippleColor || Colors[theme.dark ? 'dark' : 'light'].tint
			}
			buttonColor={backgroundColor}
			onPress={onPress}
			icon={()=>icon ? (<MaterialIcon {...icon} />) : null}
		>		
			<OpenText style={[styles.title,titleStyle,{
				color: Colors[theme.dark ? 'dark' : 'light'].text
			}]}>
				{title}
			</OpenText>					
		</ButtonPaper>
		
	);
};

const styles = StyleSheet.create({
	title:{
		textAlign:'center',			
		fontWeight:'bold',
	}
	
});