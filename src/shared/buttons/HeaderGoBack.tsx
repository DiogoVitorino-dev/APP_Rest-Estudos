
import {Pressable, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@react-navigation/native';

import Colors  from '@/constants/Colors';
import { MaterialIcon } from '@/shared/components';

interface IProps {  
		color?:string
    size?:number
		style?:StyleProp<ViewStyle>
}

export function HeaderGoBack({size,style}:IProps) {
	const theme = useTheme();
	const router = useRouter();
	return (		
		<Pressable onPress={()=>{router.back();}} style={style}>
			{({ pressed }) => (
				<MaterialIcon
					name='chevron-left'
					size={size || 30}
					color={Colors[theme.dark ? 'dark' : 'light'].text}
					style={[styles.button,{ opacity: pressed ? 0.5 : 1 }]}
				/>
			)}
		</Pressable>
		
	);
};

const styles = StyleSheet.create({
	button:{
		marginLeft:5,
		marginRight:10
	}
});
