import React from 'react';
import { useTheme } from '@react-navigation/native';
import {Modal, StyleSheet, View} from 'react-native';

import Colors from '@/constants/Colors';
import { CancelButton, ConfirmButton } from '@/shared/buttons';
import { OpenText, StyledView } from '@/shared/components';

interface IProps {	
	message:string
	visible:boolean
	onPressConfirm: () => void
	onRequestClose: () => void
}

export const ConfirmationModal = (
	{message,visible,onRequestClose,onPressConfirm}:IProps
) => {
	const theme = useTheme();

	return (		
		<Modal
			animationType="fade"
			transparent={true}				
			visible={visible}			
			onRequestClose={() => onRequestClose()}>
			<View style={styles.centeredView}>
				<StyledView style={styles.modalView}>					
					<OpenText style={[styles.modalText]}>{message}</OpenText>
					<View style={styles.containerButton}>
						<ConfirmButton 
							title='Confirmar'											
							onPress={() => {
								onPressConfirm();
								onRequestClose();
							}} />

						<CancelButton 
							title='Cancelar'
							style={[{
								borderWidth:1,
								borderColor: Colors[theme.dark ? 'dark' : 'light'].borderColor
							}]}
							onPress={() => onRequestClose()}	
						/>
					</View>					
				</StyledView>					
			</View>
		</Modal>			
		
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {		
		padding: 20,		
		flexDirection:'column',
		justifyContent:'center',
		alignItems: 'center',		
	},
	containerButton:{
		flexDirection:'row',
	},	
	
	modalText: {		
		textAlign: 'center',
		fontWeight:'bold',
		marginBottom: 20,	
	},
});