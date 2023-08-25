import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { HeaderList } from './HeaderList';
import { EmptyListFeedback, View } from '@/shared/components';
import { ListItem } from './ListItem';
import { IPessoa } from '@/models/Pessoa';
import { useAppDispatch, useAppSelector } from '@/store/Hooks';
import { selectPessoas, selectStatus } from '@/store/slices/PessoasSlice';
import { fetchNextPage } from '@/store/thunks/PessoasThunks';

interface IProps {
	requestToCreate: () => void
	requestToDelete: (item:IPessoa) => void
	requestToEdit: (item:IPessoa) => void
}

export function List({requestToDelete,requestToEdit}:IProps) {
	const data = useAppSelector(selectPessoas);
	const status = useAppSelector(selectStatus);
	const dispatch = useAppDispatch();
	
	const handleOnPressDelete = (item:IPessoa) => requestToDelete(item);
	
	const handleOnPressEdit = (item:IPessoa) => requestToEdit(item);

	const getNewData = () => {
		if (data.length > 0 && status === 'idle')
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