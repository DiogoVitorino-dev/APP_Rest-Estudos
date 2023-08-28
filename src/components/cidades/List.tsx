
import { StyleSheet, FlatList } from 'react-native';
import { HeaderList } from './HeaderList';
import { EmptyListFeedback, View } from '@/shared/components';
import { ListItem } from './ListItem';
import { ICidade } from '@/models/Cidade';
import { useAppDispatch, useAppSelector } from '@/store/Hooks';
import { fetchNextPage } from '@/store/thunks/CidadesThunks';
import { selectCidades } from '@/store/selectors/CidadesSelector';

interface IProps {
	requestToCreate: () => void
	requestToDelete: (item:ICidade) => void
	requestToEdit: (item:ICidade) => void
}

export function List({requestToDelete,requestToEdit}:IProps) {
	const data = useAppSelector(selectCidades);
	const dispatch = useAppDispatch();
	
	const handleOnPressDelete = (item:ICidade) => requestToDelete(item);
	
	const handleOnPressEdit = (item:ICidade) => requestToEdit(item);

	const getNewData = () => {
		if (data.length > 0)
			dispatch(fetchNextPage());
	};

	return (
		<View 
			style={styles.container}> 
			<HeaderList />			
	 		<FlatList 				
				data={data}
				style={styles.list}			
				ListEmptyComponent={EmptyListFeedback}
				keyExtractor={(item) => String(item.id)}
				renderItem={({item}) => ListItem({
					item,				
					onPressEdit:handleOnPressEdit,
					onPressDelete:handleOnPressDelete
				})}
				onEndReachedThreshold={0.5}
				onEndReached={getNewData}
	 		/>			
	 </View>
	);
};

const styles = StyleSheet.create({
	container:{				
		maxWidth:864,
		flex:1,			 
		marginHorizontal:10,		
		marginVertical:5,
		overflow:'hidden'
	},
	
	list:{		
		borderRadius:20,
		
	},
});