import { OpenText, StyledView } from '@/components/shared';
import React from 'react';
import { StyleSheet } from 'react-native';

interface IProps {
    title:string
    info:string
}

export default function TotalInfo({title,info}:IProps) {
	return (
		<StyledView style={styles.container}>
			<OpenText numberOfLines={3} adjustsFontSizeToFit style={styles.text}>
				{title}
			</OpenText>
			<OpenText numberOfLines={1} adjustsFontSizeToFit style={[styles.text,styles.info]}>
				{info}
			</OpenText>
		</StyledView>
	);
};

const styles = StyleSheet.create({
	container:{
		minWidth:250,        
		maxWidth:300,
		height:300,
		flex:1,       
		margin:10,
		padding:5,
		flexDirection:'column',        
		justifyContent:'center',
		alignItems:'center',		
	},

	text: {         
		fontSize:26,
		width:'100%',
		textAlign:'center',
		userSelect:'text'
	},
    
	info: {         
		fontSize:90,
		margin:'auto'    
	}
});
