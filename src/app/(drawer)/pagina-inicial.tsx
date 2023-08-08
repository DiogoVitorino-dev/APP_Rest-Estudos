import { StyleSheet } from 'react-native';

import { View } from '@/components/shared';
import TotalInfo from '@/components/pagina-inicial/TotalInfo';

export default function PaginaInicial() {
	return (
		<View style={styles.container}>
			<TotalInfo title='Total de pessoas' info='0' />
			<TotalInfo title='Total de cidades' info='153' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width:'100%',    
		flexDirection:'row',
		flexWrap:'wrap',    
		justifyContent:'center', 
	},
});
