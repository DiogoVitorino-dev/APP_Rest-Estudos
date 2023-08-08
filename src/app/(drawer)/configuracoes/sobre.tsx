import { View } from '@/components/shared';
import React from 'react';
import {Image} from 'react-native';

const ImageApp = require('@/assets/images/adaptive-icon.png');

export default function About() {
	return (
		<View>
			<Image style={{width:500,height:500}} source={ImageApp}/>
		</View>
	);
};
