import { View } from '@/components/shared';
import React from 'react';
import {Image} from 'react-native';

const ImageApp = require('@/assets/images/adaptive-icon.png');

export function About() {
	return (
		<View>
			<Image source={ImageApp}/>
		</View>
	);
};
