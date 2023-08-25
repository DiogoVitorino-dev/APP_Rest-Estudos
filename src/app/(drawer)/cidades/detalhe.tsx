import React, { useCallback, useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { InputDetalhe } from '@/components/cidades';
import { ENamesPages } from '@/constants/ENamesPages';
import { ModalError, SimpleModal, View } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/store/Hooks';
import { cleanError, selectError } from '@/store/slices/CidadesSlice';
import { updateCidade } from '@/store/thunks/CidadesThunks';
import { useTheme } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCidadesContext } from '@/contexts/cidades';

export default function Detalhe() {		
	const [errorModalVisible,setErrorModalVisible] = useState<boolean>(false);
	const [modalVisible,setModalVisible] = useState<boolean>(false);
	const {nome,cleanContextStates} = useCidadesContext();

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
		router.push(`/(drawer)/${ENamesPages.cidades}`);		
	},[router]);
	
	const requestToUpdate = useCallback(async () => {	
		if (typeof id === 'string') {	
			await dispatch(
				updateCidade({
					id:Number(id), nome
				})
			).unwrap();

			if (!error) setModalVisible(true);		
		}			
	}, [dispatch,id,error,nome]);
	
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