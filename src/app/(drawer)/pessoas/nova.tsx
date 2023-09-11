import { useCallback, useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { ENamesPages } from '@/constants/ENamesPages';
import { usePessoasContext } from '@/contexts/pessoas';
import { ModalError, SimpleModal, View } from '@/shared/components';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { cleanPessoasError, refreshPessoas } from '@/store/slices/PessoasSlice';
import { createPessoa } from '@/store/thunks/PessoasThunks';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { InputNova } from '@/components/pessoas';
import { fetchCidades } from '@/store/thunks/CidadesThunks';
import { selectCidades } from '@/store/selectors/CidadesSelector';
import { selectPessoasError } from '@/store/selectors/PessoasSelector';

export default function Nova() {
	const [errorModalVisible,setErrorModalVisible] = useState<boolean>(false);
	const [modalVisible,setModalVisible] = useState<boolean>(false);	
	const {nomeCompleto,cidadeid,email,cleanContextStates} = usePessoasContext();

	const router = useRouter();
	const theme = useTheme();

	const dispatch = useAppDispatch();	
	const data = useAppSelector(selectCidades);
	const error = useAppSelector(selectPessoasError);

	const requestToGoBack = useCallback(() => {		
		router.push(`/(drawer)/${ENamesPages.pessoas}`);		
	},[router]);
	
	const requestToCreate = useCallback(async () => {		
		await dispatch(createPessoa({nomeCompleto,cidadeid,email})).unwrap();
		if (!error)	
			setModalVisible(true);			
		
	},[dispatch,nomeCompleto,cidadeid,email,error]);

	const handleDismissModal = () => {		
		setModalVisible(false);
		requestToGoBack();
	};
	
	const handleDismissModalError = () => {		
		setErrorModalVisible(false);
		dispatch(cleanPessoasError());
	};

	useEffect(() => {
		if (data.length <= 0)		
			dispatch(fetchCidades());		
	},[data]);

	useEffect(() => {		
		if (error)
			setErrorModalVisible(true);
	},[error]);

	useEffect(() => {
		dispatch(refreshPessoas());
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