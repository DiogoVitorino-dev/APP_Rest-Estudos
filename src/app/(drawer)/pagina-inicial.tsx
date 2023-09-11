import { ScrollView, StyleSheet } from 'react-native';
import TotalInfo from '@/components/pagina-inicial/TotalInfo';
import { useAppSelector } from '@/shared/hooks/redux';
import { selectCidadesTotalCount } from '@/store/selectors/CidadesSelector';
import { selectPessoasTotalCount } from '@/store/selectors/PessoasSelector';


export default function PaginaInicial() {
	const totalCidades = useAppSelector(selectCidadesTotalCount);
	const totalPessoas = useAppSelector(selectPessoasTotalCount);
	
	return (
		<ScrollView 
			persistentScrollbar={true}
			contentContainerStyle={styles.contentContainerStyle} 
			style={styles.container}>
			<TotalInfo 
				title='Total de pessoas' 
				info={totalPessoas.toString()} 
			/>
			<TotalInfo 
				title='Total de cidades' 
				info={totalCidades.toString()} 
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		width:'100%',
	},
	
	contentContainerStyle: {
		justifyContent:'center',
		flexDirection:'row',
		flexWrap:'wrap',		
	},
});
