import { View, OpenText } from '@/components/shared';
import React from 'react';
import { StyleSheet } from 'react-native';

interface IProps {
    title:string
    info:string
}

export default function TotalInfo({title,info}:IProps) {
	return (
		<View style={styles.container}>
			<OpenText numberOfLines={3} adjustsFontSizeToFit style={styles.text}>{title}</OpenText>
			<OpenText numberOfLines={1} adjustsFontSizeToFit style={[styles.text,styles.info]}>{info}</OpenText>
		</View>
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
		borderRadius:5,
		borderWidth:StyleSheet.hairlineWidth,
		shadowColor:'rgba(0,0,0,0.1)',
		shadowRadius:10,
		shadowOffset:{width:3,height:3},
		elevation:5
	},

	text: {         
		fontSize:26,
		width:'100%',
		textAlign:'center',      
	},
    
	info: {         
		fontSize:90,
		margin:'auto'    
	}
});
