import { View } from '@/shared/components';
import {Image} from 'react-native';

const ImageApp = require('@/assets/images/adaptive-icon.png');

export default function Sobre() {
	return (
		<View>
			<Image style={{width:500,height:500}} source={ImageApp}/>
		</View>
	);
};
