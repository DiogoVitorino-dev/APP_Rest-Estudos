import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { IconButton as IconButtonPaper } from 'react-native-paper';

import { IMaterialIconProps, MaterialIcon } from '@/shared/components';

interface IProps {
	icon:IMaterialIconProps
	style?: StyleProp<ViewStyle>
	onPress: () => void
}

export function IconButton({icon,onPress,style}:IProps) {
	return (
		<IconButtonPaper 
			icon={()=>(<MaterialIcon {...icon} />)} 
			style={style}
			onPress={onPress}
		/>	
	);
};