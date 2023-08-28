
import Colors from '@/constants/Colors';
import {View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { 
	AutocompleteDropdown, 
	AutocompleteDropdownContextProvider,	 
	TAutocompleteDropdownItem 
} from 'react-native-autocomplete-dropdown';

import { CancelButton, ConfirmButton } from '@/shared/buttons';
import { OpenText } from '@/shared/components';
import { InputNameCity } from '@/shared/inputs';
import { useAppDispatch, useAppSelector } from '@/store/Hooks';
import { usePessoasContext } from '@/contexts/pessoas';
import { InputEmail } from '@/shared/inputs';
import { fetchNextPage, filterCidades } from '@/store/thunks/CidadesThunks';
import { selectCidades } from '@/store/selectors/CidadesSelector';
import { selectPessoasStatus } from '@/store/selectors/PessoasSelector';

interface IProps {
	requestToGoBack: () => void
	requestToCreate: () => void
}

export function InputNova({requestToCreate,requestToGoBack}:IProps) {	
	const {
		nomeCompleto,
		setNomeCompleto,
		errorNomeCompleto,
		email,
		setEmail,
		errorEmail,
		cidadeid,
		setCidadeid,
		validateFields
	} = usePessoasContext();

	const status = useAppSelector(selectPessoasStatus);
	const data = useAppSelector(selectCidades);
	const dispatch = useAppDispatch();
	const theme = useTheme();

	const beforeCreate = () => {
		if(validateFields())
			requestToCreate();
	};

	const handleOnSelectCidade = (item:TAutocompleteDropdownItem | null) => {
		if (item)
			setCidadeid(Number(item.id));
	};

	const handleOnQueryCidade = (filter:string) => dispatch(filterCidades(filter));	

	const getNewData = () => {
		if (data.length > 0 )
			dispatch(fetchNextPage());
	};

	return (
		<AutocompleteDropdownContextProvider>
			<View style={styles.container}>

				<View style={styles.containerInputs}>
					<View style={styles.input}>
						<OpenText style={styles.title}>Nome</OpenText>
						<InputNameCity 
							onChangeText={setNomeCompleto} 
							value={nomeCompleto} 
							error={errorNomeCompleto} 
						/>
					</View>
			
					<View style={styles.input}>
						<OpenText style={styles.title}>Email</OpenText>
						<InputEmail 
							onChangeText={setEmail}					
							value={email} 
							error={errorEmail} 
						/>
					</View>
			
					<View style={styles.input}>
						<OpenText style={styles.title}>Cidade da pessoa</OpenText>
						<AutocompleteDropdown
							onSelectItem={handleOnSelectCidade}
							onChangeText={handleOnQueryCidade}
							containerStyle={styles.dropdown}
							flatListProps={{
								onEndReachedThreshold:0.9,
								onEndReached:getNewData
							}}
							position='relative'													
							inputContainerStyle={{
								backgroundColor:Colors[theme.dark?'dark':'light'].button
							}}
							textInputProps={{
								style:{														
									color:Colors[theme.dark?'dark':'light'].text
								}
							}}
							bottomOffset={0}			
							dataSet={
								data.map(cidade => (
									{id:String(cidade.id), title:cidade.nome}
								))
							}
						/>
					</View>

				</View>
					
				<View style={styles.buttonsContainer}>
					<ConfirmButton 
						title='Criar' 
						showIcon
						disabled = {
							Boolean(!nomeCompleto) || Boolean(!email) || Boolean(!cidadeid)
						}			
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
		</AutocompleteDropdownContextProvider>
	);
};

const styles = StyleSheet.create({
	container:{		
		justifyContent:'space-around',
		flexDirection:'column',
		alignItems:'center',	
		maxWidth:500,
		maxHeight:500,	
		width:'100%',		
		height:'100%',	
		padding:20,
		marginHorizontal:'auto'				
	},
	
	containerInputs:{		
		justifyContent:'center',
		flexDirection:'column',
		alignItems:'center',	
		width:'100%',
	},

	input:{
		width:'100%',		
		flexDirection:'column',
		marginBottom:10,
		backgroundColor:'transparent'
	},
	dropdown:{
		borderRadius:2,
		overflow:'hidden'
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