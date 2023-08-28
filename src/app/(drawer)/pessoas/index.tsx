import { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { IPessoa } from '@/models';
import { List } from '@/components/pessoas';
import { ENamesPages } from '@/constants/ENamesPages';
import { ModalError, View, ConfirmationModal } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/store/Hooks';
import { cleanPessoasError } from '@/store/slices/PessoasSlice';
import { deletePessoa, fetchPessoas } from '@/store/thunks/PessoasThunks';
import { selectPessoas, selectPessoasError, selectPessoasFilter } from '@/store/selectors/PessoasSelector';

export default function Pessoas() {
	const [selectedPessoa,setSelectedPessoa] = useState<IPessoa | null>(null);
	const [confirmModalVisible,setConfirmModalVisible] = useState<boolean>(false);
	const [errorModalVisible,setErrorModalVisible] = useState<boolean>(false);

	const router = useRouter();
	const dispatch = useAppDispatch();
	
	const error = useAppSelector(selectPessoasError);
	const data = useAppSelector(selectPessoas);
	const filter = useAppSelector(selectPessoasFilter);

	const requestToDelete = (pessoa:IPessoa) => {
		setConfirmModalVisible(true);
		setSelectedPessoa(pessoa);		
	};

	const confirmDelete = useCallback(async () => {
		if (selectedPessoa) {			
			setSelectedPessoa(null);
			dispatch(deletePessoa(selectedPessoa.id));
		}
	},[selectedPessoa]);

	const handleDismissModalError = () => {
		setErrorModalVisible(false);
		dispatch(cleanPessoasError());
	};

	const requestToEdit = ({id}:IPessoa) => {
		router.push({
			pathname:`/${ENamesPages.pessoas}/${ENamesPages.detalhe}`,
			params:{id}
		});
	};
	
	const requestToCreate = () => {
		router.push(`/${ENamesPages.pessoas}/${ENamesPages.nova}`);
	};

	useEffect(() => {
		if (data.length <= 0 && !filter)		
			dispatch(fetchPessoas());		
	},[data]);

	useEffect(() => {
		if (error)
			setErrorModalVisible(true);
	},[error]);
	
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
	},
});
