import React, { useCallback, useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { ENamesPages } from '@/constants/ENamesPages';
import { usePessoasContext } from '@/contexts/pessoas';
import { ModalError, SimpleModal, View } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/store/Hooks';
import { cleanError, refresh, selectError } from '@/store/slices/PessoasSlice';
import { createPessoa } from '@/store/thunks/PessoasThunks';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { InputNova } from '@/components/pessoas';
import { selectCidades } from '@/store/slices/CidadesSlice';
import { fetchCidades } from '@/store/thunks/CidadesThunks';

export default function Nova() {
	const [errorModalVisible,setErrorModalVisible] = useState<boolean>(false);
	const [modalVisible,setModalVisible] = useState<boolean>(false);	
	const {nomeCompleto,cidadeid,email,cleanContextStates} = usePessoasContext();

	const router = useRouter();
	const theme = useTheme();

	const dispatch = useAppDispatch();	
	const data = useAppSelector(selectCidades);
	const error = useAppSelector(selectError);

	useEffect(() => {
		if (data.length <= 0)		
			dispatch(fetchCidades());		
	},[data]);

	useEffect(() => {		
		if (error)
			setErrorModalVisible(true);
	},[error]);

	useEffect(() => {
		dispatch(refresh());
		return () => {
			dispatch(cleanError());
			cleanContextStates();
		};
	},[]);

	const requestToGoBack = useCallback(() => {		
		router.push(`/(drawer)/${ENamesPages.pessoas}`);		
	},[router]);
	
	const requestToCreate = useCallback(async () => {		
		await dispatch(createPessoa({nomeCompleto,cidadeid,email})).unwrap();
		if (!error)	
			setModalVisible(true);			
		
	},[dispatch,nomeCompleto,cidadeid,email,error]);

	const handleOnDismissModal = () => {		
		setModalVisible(false);
		requestToGoBack();
	};

	return (
	 <View style={styles.container}>
			<InputNova 
				requestToCreate={requestToCreate}
				requestToGoBack={requestToGoBack}
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
				message='Criado com sucesso!'
				onDismiss={handleOnDismissModal}
			/>		
	 </View>
	);
};

const styles = StyleSheet.create({
	container:{		
		flex:1,
		padding:10				
	},	
});