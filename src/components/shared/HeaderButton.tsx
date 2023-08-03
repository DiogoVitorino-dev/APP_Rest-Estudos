import Colors  from '@/constants/Colors';
import { Href, Link } from 'expo-router';
import React from 'react';
import {Pressable, StyleProp, TextStyle, useColorScheme} from 'react-native';
import { MaterialIcon } from './MaterialIcon';
import { TMaterialIconNames } from '@/constants/Types';

interface IProps {
    href: Href<string>
    iconName: TMaterialIconNames
		color?:string
    size?:number
		style?:StyleProp<TextStyle>
}
export function HeaderButton({href,iconName,size,style}:IProps) {
	const colorScheme = useColorScheme();
	return (
		<Link href={href} asChild style={style}>
			<Pressable>
				{({ pressed }) => (
					<MaterialIcon
						name={iconName}
						size={size}
						color={Colors[colorScheme || 'dark'].text}
						style={{ opacity: pressed ? 0.5 : 1 }}
					/>
				)}
			</Pressable>
		</Link>
	);
};
