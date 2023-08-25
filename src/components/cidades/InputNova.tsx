import React from 'react';
import { useCidadesContext } from '@/contexts/cidades';
import { CancelButton, ConfirmButton } from '@/shared/buttons';
import { OpenText } from '@/shared/components';
import { InputNameCity } from '@/shared/inputs';
import { useAppSelector } from '@/store/Hooks';
import { selectStatus } from '@/store/slices/CidadesSlice';
import {View, StyleSheet} from 'react-native';
import { ICidade } from '@/models/Cidade';

interface IProps {
	requestToGoBack: () => void
	requestToCreate: (cidade:Omit<ICidade, 'id'>) => void
}

export function InputNova({requestToCreate,requestToGoBack}:IProps) {	
	const {nome,errorNome,setNome,validateFields} = useCidadesContext();
	const status = useAppSelector(selectStatus);

	const beforeCreate = () => {
		if(validateFields())
			requestToCreate({nome});
	};

	return (
		<View style={styles.container}>
			<View style={styles.input}>
				<OpenText style={styles.title}>Nome</OpenText>
				<InputNameCity onChangeText={setNome} value={nome} error={errorNome} />
			</View>

			<View style={styles.buttonsContainer}>
				<ConfirmButton 
					title='Criar' 
					showIcon
					disabled={Boolean(!nome)}			
					loading={status === 'loading'}					
					style={styles.Button}				
					onPress={() => beforeCreate()} 
				/>

				<CancelButton 
					title='Cancelar'
					showIcon					
					style={styles.Button}
					onPress={requestToGoBack} 				
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container:{		
		justifyContent:'center',
		flexDirection:'column',
		alignItems:'center',	
		maxWidth:500,
		width:'100%',
		padding:20,
		marginHorizontal:'auto'				
	},
	input:{
		width:'100%',		
		flexDirection:'column',
		marginBottom:10,
		backgroundColor:'transparent'
	},
	
	buttonsContainer:{
		width:'100%',		
		flexDirection:'column',
		backgroundColor:'transparent'
	},

	Button:{
		width:'100%',
		marginVertical:5,
	},

	title:{
		fontSize:18,
		marginBottom:15
	}
});