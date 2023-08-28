import { useCallback, useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { InputDetalhe } from '@/components/pessoas';
import { ENamesPages } from '@/constants/ENamesPages';
import { ModalError, SimpleModal, View } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/store/Hooks';
import { cleanPessoasError } from '@/store/slices/PessoasSlice';
import { updatePessoa } from '@/store/thunks/PessoasThunks';
import { useTheme } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePessoasContext } from '@/contexts/pessoas';
import { selectPessoasError } from '@/store/selectors/PessoasSelector';

export default function Detalhe() {		
	const [errorModalVisible,setErrorModalVisible] = useState<boolean>(false);
	const [modalVisible,setModalVisible] = useState<boolean>(false);
	const {cidadeid,email,nomeCompleto,cleanContextStates} = usePessoasContext();

	const dispatch = useAppDispatch();
	const error = useAppSelector(selectPessoasError);

	const router = useRouter();
	const {id} = useLocalSearchParams();
	const theme = useTheme();

	const requestToGoBack = useCallback(() => {		
		router.push(`/(drawer)/${ENamesPages.pessoas}`);		
	},[router]);
	
	const requestToUpdate = useCallback(async () => {	
		if (typeof id === 'string') {	
			await dispatch(
				updatePessoa({
					id:Number(id),
					cidadeid,
					email,
					nomeCompleto
				})
			).unwrap();

			if (!error) setModalVisible(true);		
		}			
	}, [dispatch,id,cidadeid,email,nomeCompleto,error]);
	
	const handleDismissModal = () => {		
		setModalVisible(false);
		requestToGoBack();
	};
	
	const handleDismissModalError = () => {		
		setErrorModalVisible(false);
		dispatch(cleanPessoasError());
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