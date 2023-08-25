import React from 'react';
import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Button as ButtonPaper } from 'react-native-paper';

import Colors from '@/constants/Colors';
import { IMaterialIconProps, MaterialIcon } from '../components/MaterialIcon';
import { OpenText } from '../components/StyledText';

interface IProps {
	icon?:IMaterialIconProps
	title:string
	titleStyle?:StyleProp<TextStyle>
	onPress: () => void
	rippleColor?:string
	backgroundColor?:string
	mode?: TButtonPaperMode
	style?:StyleProp<Omit<ViewStyle , 'backgroundColor'>>
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
			disabled={disabled || loading}			
			loading={loading}
			mode={mode || 'text'}
			buttonColor={backgroundColor}
			onPress={onPress}
			contentStyle={styles.button}			
			

			icon={()=>icon ? (<MaterialIcon {...icon} />) : undefined}

			rippleColor={
				rippleColor || Colors[theme.dark ? 'dark' : 'light'].buttonSelected
			}

			style={[{
				backgroundColor:backgroundColor || Colors[theme.dark ? 'dark' : 'light'].button,
				opacity:disabled ? 0.4 : 1
			},style]}			
		>		
			<OpenText style={[styles.title,{
				color: Colors[theme.dark ? 'dark' : 'light'].text
			},titleStyle]}>
				{title}
			</OpenText>				
		</ButtonPaper>
		
	);
};

const styles = StyleSheet.create({
	button:{		
		alignItems:'center',
		justifyContent:'center',
	},
	title:{					
		fontWeight:'bold',
	},
	contentStyle:{
		flex:1,
		justifyContent:'center'
	}
});