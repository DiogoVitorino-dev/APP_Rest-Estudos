import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { List } from '@/components/cidades';
import { ENamesPages } from '@/constants/ENamesPages';
import { ICidade } from '@/models/Cidade';
import { ModalError, View, ConfirmationModal } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/store/Hooks';
import { cleanError, selectCidades, selectError, selectFilter } from '@/store/slices/CidadesSlice';
import { deleteCidade, fetchCidades } from '@/store/thunks/CidadesThunks';

export default function Cidades() {
	const [selectedCidade,setSelectedCidade] = useState<ICidade | null>(null);
	const [confirmModalVisible,setConfirmModalVisible] = useState<boolean>(false);
	const [errorModalVisible,setErrorModalVisible] = useState<boolean>(false);

	const router = useRouter();
	const dispatch = useAppDispatch();

	const data = useAppSelector(selectCidades);	
	const error = useAppSelector(selectError);	
	const filter = useAppSelector(selectFilter);

	useEffect(() => {
		if (data.length <= 0 && !filter)	
			dispatch(fetchCidades());		
	},[data]);
	
	useEffect(() => {
		if (data.length <= 0)		
			dispatch(fetchCidades());		
	},[data]);

	useEffect(() => {		
		if (error)
			setErrorModalVisible(true);
	},[error]);	

	const requestToDelete = (cidade:ICidade) => {
		setConfirmModalVisible(true);
		setSelectedCidade(cidade);		
	};

	const confirmDelete = useCallback(async () => {
		if (selectedCidade) {			
			setSelectedCidade(null);
			dispatch(deleteCidade(selectedCidade.id));
		}
	},[selectedCidade]);

	const onDismissError = () => {
		setErrorModalVisible(false);
		dispatch(cleanError());
	};

	const requestToEdit = ({id}:ICidade) => {
		router.push({
			pathname:`/${ENamesPages.cidades}/${ENamesPages.detalhe}`,
			params:{id}
		});
	};
	
	const requestToCreate = () => {
		router.push(`/${ENamesPages.cidades}/${ENamesPages.nova}`);
	};

	return (		
		<View style={styles.container}>
			<List 
				requestToCreate={requestToCreate}
				requestToDelete={requestToDelete}
				requestToEdit={requestToEdit} 
			/>

			<ConfirmationModal 
				message='Deseja remover esse registro?' 
				visible={confirmModalVisible}
				onPressConfirm={confirmDelete}
				onRequestClose={()=> setConfirmModalVisible(false)} 
			/>

			<ModalError 
				visible={errorModalVisible}
				error={error} 
				onDismiss={onDismissError} 
			/>
		</View>	
	);
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		height:'100%'				
	}
});
