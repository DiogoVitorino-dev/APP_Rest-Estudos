import { useCallback, useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { ENamesPages } from '@/constants/ENamesPages';
import { useCidadesContext } from '@/contexts/cidades';
import { ModalError, SimpleModal, View } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { cleanCidadesError } from '@/store/slices/CidadesSlice';
import { createCidade } from '@/store/thunks/CidadesThunks';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { InputNova } from '@/components/cidades';
import { selectCidadesError } from '@/store/selectors/CidadesSelector';

export default function Nova() {
	const [errorModalVisible,setErrorModalVisible] = useState<boolean>(false);
	const [modalVisible,setModalVisible] = useState<boolean>(false);	
	const {nome,cleanContextStates} = useCidadesContext();

	const router = useRouter();
	const theme = useTheme();

	const dispatch = useAppDispatch();
	const error = useAppSelector(selectCidadesError);

	const requestToGoBack = useCallback(() => {		
		router.push(`/(drawer)/${ENamesPages.cidades}`);		
	},[router]);
	
	const requestToCreate = useCallback(async () => {		
		await dispatch(createCidade({nome})).unwrap();
		if (!error)	
			setModalVisible(true);			
		
	},[dispatch,nome,error]);

	const handleDismissModal = () => {		
		setModalVisible(false);
		requestToGoBack();
	};

	const handleDismissModalError = () => {
		setErrorModalVisible(false);
		dispatch(cleanCidadesError());
	};

	useEffect(() => {		
		if (error)
			setErrorModalVisible(true);
	},[error]);

	useEffect(() => {		
		return () => {
			cleanContextStates();			
		};
	},[]);

	return (
	 <View style={styles.container}>
			<InputNova 
				requestToCreate={requestToCreate}
				requestToGoBack={requestToGoBack}
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
				message='Criado com sucesso!'
				onDismiss={handleDismissModal}
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