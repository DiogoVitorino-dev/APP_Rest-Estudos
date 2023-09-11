import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { List } from '@/components/cidades';
import { ENamesPages } from '@/constants/ENamesPages';
import { ICidade } from '@/models';
import { ModalError, View, ConfirmationModal } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { cleanCidadesError } from '@/store/slices/CidadesSlice';
import { deleteCidade, fetchCidades } from '@/store/thunks/CidadesThunks';
import { selectCidades, selectCidadesError, selectCidadesFilter } from '@/store/selectors/CidadesSelector';

export default function Cidades() {
	const [selectedCidade,setSelectedCidade] = useState<ICidade | null>(null);
	const [confirmModalVisible,setConfirmModalVisible] = useState<boolean>(false);
	const [errorModalVisible,setErrorModalVisible] = useState<boolean>(false);

	const router = useRouter();
	const dispatch = useAppDispatch();

	const data = useAppSelector(selectCidades);	
	const error = useAppSelector(selectCidadesError);	
	const filter = useAppSelector(selectCidadesFilter);

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

	const handleDismissModalError = () => {
		setErrorModalVisible(false);
		dispatch(cleanCidadesError());
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
				onDismiss={handleDismissModalError} 
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
