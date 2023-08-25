import React, { useCallback, useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { InputDetalhe } from '@/components/pessoas';
import { ENamesPages } from '@/constants/ENamesPages';
import { ModalError, SimpleModal, View } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/store/Hooks';
import { cleanError, selectError } from '@/store/slices/PessoasSlice';
import { updatePessoa } from '@/store/thunks/PessoasThunks';
import { useTheme } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePessoasContext } from '@/contexts/pessoas';

export default function Detalhe() {		
	const [errorModalVisible,setErrorModalVisible] = useState<boolean>(false);
	const [modalVisible,setModalVisible] = useState<boolean>(false);
	const {cidadeid,email,nomeCompleto,cleanContextStates} = usePessoasContext();

	const dispatch = useAppDispatch();
	const error = useAppSelector(selectError);

	const router = useRouter();
	const {id} = useLocalSearchParams();
	const theme = useTheme();

	useEffect(() => {
		if (error)
			setErrorModalVisible(true);
	},[error]);

	useEffect(() => {		
		return () => {			
			dispatch(cleanError());
			cleanContextStates();
		};
	}, []);

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
	
	const handleOnDismissModal = () => {		
		setModalVisible(false);
		requestToGoBack();
	};

	return (		
		<View style={styles.container}>
			<InputDetalhe
				requestToGoBack={requestToGoBack}
				requestToUpdate={requestToUpdate} 
			/>			
			<ModalError 
				visible={errorModalVisible}
				error={error}
				onDismiss={() => setErrorModalVisible(false)}
			/>	
			
			<SimpleModal
				visible={modalVisible}
				icon={{
					name:'check-circle',
					size:40,
					color:Colors[theme.dark ? 'dark' : 'light'].button
				}}
				message='Atualizado com sucesso!'
				onDismiss={handleOnDismissModal}
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