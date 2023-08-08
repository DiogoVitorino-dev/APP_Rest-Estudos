import { Href, Link } from 'expo-router';
import React from 'react';
import {Pressable, StyleProp, TextStyle} from 'react-native';
import { IMaterialIconProps, MaterialIcon } from './MaterialIcon';
interface IProps {
    href: Href<string>
    icon:IMaterialIconProps
		style?:StyleProp<TextStyle>
}
export function HeaderButton({href,icon,style}:IProps) {
	return (
		<Link href={href} asChild style={style}>
			<Pressable>
				{({ pressed }) => (
					<MaterialIcon
						{...icon}
						style={{ opacity: pressed ? 0.5 : 1 }}
					/>
				)}
			</Pressable>
		</Link>
	);
};
