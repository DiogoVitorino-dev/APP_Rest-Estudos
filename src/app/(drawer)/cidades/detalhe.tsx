import { useCallback, useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { InputDetalhe } from '@/components/cidades';
import { ENamesPages } from '@/constants/ENamesPages';
import { ModalError, SimpleModal, View } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { cleanCidadesError } from '@/store/slices/CidadesSlice';
import { updateCidade } from '@/store/thunks/CidadesThunks';
import { useTheme } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCidadesContext } from '@/contexts/cidades';
import { selectCidadesError } from '@/store/selectors/CidadesSelector';
import { ICidade } from '@/models';

export default function Detalhe() {		
	const [errorModalVisible,setErrorModalVisible] = useState<boolean>(false);
	const [modalVisible,setModalVisible] = useState<boolean>(false);
	const {nome,cleanContextStates} = useCidadesContext();

	const dispatch = useAppDispatch();
	const error = useAppSelector(selectCidadesError);

	const router = useRouter();
	const {id} = useLocalSearchParams();
	const theme = useTheme();

	const handleDismissModalError = () => {		
		setErrorModalVisible(false);
		dispatch(cleanCidadesError());
	};
	
	const handleDismissModal = () => {		
		setModalVisible(false);
		requestToGoBack();
	};

	useEffect(() => {
		if (error)
			setErrorModalVisible(true);
	},[error]);

	useEffect(() => {		
		return () => {				
			cleanContextStates();		
		};
	}, []);

	const requestToGoBack = useCallback(() => {		
		router.push(`/(drawer)/${ENamesPages.cidades}`);		
	},[router]);
	
	const requestToUpdate = useCallback(async () => {	
		if (typeof id === 'string') {
			const updatedCidade:ICidade = {id:Number(id), nome};

			await dispatch(updateCidade(updatedCidade)).unwrap();

			if (!error) setModalVisible(true);		
		}			
	}, [dispatch,id,error,nome]);


	return (		
		<View style={styles.container}>
			<InputDetalhe
				requestToGoBack={requestToGoBack}
				requestToUpdate={requestToUpdate} 
			/>			
			<ModalError 
				visible={errorModalVisible}
				error={error}
				onDismiss={handleDismissModalError}
			/>	
			
			<SimpleModal
				visible={modalVisible}
				icon={{
					name:'check-circle',
					size:40,
					color:Colors[theme.dark ? 'dark' : 'light'].button
				}}
				message='Atualizado com sucesso!'
				onDismiss={handleDismissModal}
			/>			
		</View>		
	);
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		padding:10				
	},	
});