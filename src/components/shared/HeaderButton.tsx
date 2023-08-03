import Colors from '@/constants/Colors';
import { Href, Link } from 'expo-router';
import React from 'react';
import {Pressable, useColorScheme} from 'react-native';
import { MaterialIcon } from './MaterialIcon';
import { TMaterialIconNames } from '@/constants/Types';

interface IProps {
    href: Href<string>
    iconName: TMaterialIconNames
    size?:number
}
export function HeaderButton({href,iconName,size}:IProps) {
	const colorScheme = useColorScheme();
	return (
		<Link href={href} asChild>
			<Pressable>
				{({ pressed }) => (
					<MaterialIcon
						name={iconName}
						size={size}
						color={Colors[colorScheme ?? 'light'].text}
						style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
					/>
				)}
			</Pressable>
		</Link>
	);
};
