import Colors  from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import {Pressable, StyleProp, ViewStyle, useColorScheme} from 'react-native';
import { MaterialIcon } from './MaterialIcon';
import { TMaterialIconNames } from '@/constants/Types';

interface IProps {   
    iconName: TMaterialIconNames
		color?:string
    size?:number
		style?:StyleProp<ViewStyle>
}

export function HeaderGoBack({iconName,size,style}:IProps) {
	const colorScheme = useColorScheme();
	const router = useRouter();
	return (		
		<Pressable onPress={()=>{router.back();}} style={style}>
			{({ pressed }) => (
				<MaterialIcon
					name={iconName}
					size={size || 30}
					color={Colors[colorScheme || 'dark'].text}
					style={{ opacity: pressed ? 0.5 : 1 }}
				/>
			)}
		</Pressable>
		
	);
};
