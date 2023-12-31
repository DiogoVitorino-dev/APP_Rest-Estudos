import { useEffect, useState } from 'react';
import {Modal, StyleSheet, View} from 'react-native';

import { StyledView } from './StyledView';
import { OpenText } from './StyledText';
import { IMaterialIconProps, MaterialIcon } from './MaterialIcon';
import { ConfirmButton } from '@/shared/buttons';

interface IProps {
	icon:IMaterialIconProps
	message:string
	visible:boolean
	onDismiss?: () => void
}

export const SimpleModal = ({icon,message,visible,onDismiss}:IProps) => {
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(()=>{
		setModalVisible(visible);
	},[visible]);

	return (		
		<Modal
			animationType="fade"
			transparent={true}				
			visible={modalVisible}
			onDismiss={onDismiss}
			onRequestClose={() => { setModalVisible(!modalVisible); }}>
			<View style={styles.centeredView}>
				<StyledView style={styles.modalView}>
					<MaterialIcon {...icon} />
					<OpenText style={[styles.modalText]}>{message}</OpenText>
					<ConfirmButton 
						title='OK'						
						onPress={() => setModalVisible(!modalVisible)} 
						style={{width:80}}
					/>
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
		alignItems: 'center',		
	},		
	modalText: {		
		textAlign: 'center',
		fontWeight:'bold',
		marginBottom: 20,	
	},
});