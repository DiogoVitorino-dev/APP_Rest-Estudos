import { ScrollView, StyleSheet } from 'react-native';
import TotalInfo from '@/components/pagina-inicial/TotalInfo';

export default function PaginaInicial() {
	return (
		<ScrollView 
			persistentScrollbar={true}
			contentContainerStyle={styles.contentContainerStyle} 
			style={styles.container}>
			<TotalInfo title='Total de pessoas' info='0' />
			<TotalInfo title='Total de cidades' info='153' />
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
