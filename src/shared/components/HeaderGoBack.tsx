import Colors  from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import {Pressable, StyleProp, ViewStyle} from 'react-native';
import { MaterialIcon } from './MaterialIcon';
import { TMaterialIconNames } from '@/constants/Types';
import { useTheme } from '@react-navigation/native';

interface IProps {   
    iconName: TMaterialIconNames
		color?:string
    size?:number
		style?:StyleProp<ViewStyle>
}

export function HeaderGoBack({iconName,size,style}:IProps) {
	const theme = useTheme();
	const router = useRouter();
	return (		
		<Pressable onPress={()=>{router.back();}} style={style}>
			{({ pressed }) => (
				<MaterialIcon
					name={iconName}
					size={size || 30}
					color={Colors[theme.dark ? 'dark' : 'light'].text}
					style={{ opacity: pressed ? 0.5 : 1 }}
				/>
			)}
		</Pressable>
		
	);
};
