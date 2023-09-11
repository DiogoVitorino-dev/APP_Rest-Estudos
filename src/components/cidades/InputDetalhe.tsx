
import { OpenText, View } from '@/shared/components';
import { InputNameCity } from '@/shared/inputs';
import {StyleSheet} from 'react-native';
import { CancelButton, ConfirmButton } from '@/shared/buttons';
import { useCidadesContext } from '@/contexts/cidades';
import { useAppSelector } from '@/shared/hooks/redux';
import { selectCidadesStatus } from '@/store/selectors/CidadesSelector';

interface IProps {
	requestToUpdate: () => void
	requestToGoBack: () => void
}

export function InputDetalhe({requestToGoBack,requestToUpdate}:IProps) {
	const {nome,setNome,validateFields,errorNome} = useCidadesContext();
	const status = useAppSelector(selectCidadesStatus);

	const beforeUpdate = () => {
		if(validateFields())
			requestToUpdate();
	};

	return (
		<View style={styles.container}>
			<View style={styles.input}>
				<OpenText style={styles.title}>Nome</OpenText>
				<InputNameCity onChangeText={setNome} value={nome} error={errorNome} />
			</View>

			<View style={styles.buttonsContainer}>
				<ConfirmButton 
					title='Salvar'
					disabled={Boolean(!nome)}
					showIcon								
					loading={status === 'loading'}					
					style={styles.Button}				
					onPress={() => beforeUpdate()} 
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
}

const styles = StyleSheet.create({
	container:{		
		justifyContent:'center',
		flexDirection:'column',
		alignItems:'center',
		marginHorizontal:'auto',
		maxWidth:500,
		width:'100%',	
		padding:20	
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