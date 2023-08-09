import { Href, Link } from 'expo-router';
import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import { OpenText } from './StyledText';

interface IProps {	
	title:string
	titleStyle?:StyleProp<TextStyle>
	href:Href<string>
	style?:StyleProp<TextStyle>
	disabled?:boolean	
}

export function LinkText({style,href,title,disabled,titleStyle}:IProps) {
	return (
		<Link href={href} style={style} disabled={disabled}>
			<OpenText style={titleStyle} >{title}</OpenText>
		</Link>
	);
};