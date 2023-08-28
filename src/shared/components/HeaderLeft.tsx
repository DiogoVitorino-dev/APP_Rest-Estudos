import { useEffect, useState } from 'react';
import {View, StyleSheet, useWindowDimensions, Platform} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';

import Colors from '@/constants/Colors';
import { HeaderGoBack } from '../buttons';

interface IProps {
	onSearch: (text:string) => void
}

export function HeaderLeft({onSearch}:IProps) {
	const [search,setSearch] = useState<string>('');
	const {width} = useWindowDimensions();
	const theme = useTheme();
	
	useEffect(() => {			
		onSearch(search);	
	},[search]);

	return (
		<View style={[styles.headerLeft,{ maxWidth:width-100 }]}>
			<HeaderGoBack	/>
			<Searchbar 
				value={search}
				onChangeText={setSearch}
				placeholder='Pesquisar...'					
				style={[styles.searchBar,{
					backgroundColor:
				Platform.OS === 'web' 
					? Colors[theme.dark ? 'dark' : 'light'].tint + 30
					: undefined
				}]}				
			/>	
		</View>
	);
};

const styles = StyleSheet.create({
	headerLeft:{				
		flexDirection:'row',		
		width:'100%',		
		alignItems:'center',		
	},
	
	searchBar:{	
		alignSelf:'center',
		justifyContent:'center',	
		backgroundColor:'transparent'
	},
});