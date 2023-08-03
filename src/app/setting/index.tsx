import { View } from '@/components/shared';
import { SectionItem, SectionHeader } from '@/components/setting';
import { MaterialIcon } from '@/components/shared';

import { Platform, SectionList, SectionListRenderItemInfo, StyleSheet } from 'react-native';

export interface ISettingsData {
  title: string;
  icon?: JSX.Element
  data: SettingsType[]
}

export type SettingsType = 'Dark Mode' | 'about';

export type TSettingRenderData = SectionListRenderItemInfo<SettingsType,ISettingsData>

const settingsData:ISettingsData[] = [
	{
		title: 'Appearance',
		icon: (
			<MaterialIcon 
				name='brush' 
				size={35}					
			/>
		) ,
		data: ['Dark Mode','about'],
	},
	{
		title: '',		
		data: ['about'],
	},
];

const SectionSeparatorComponent = () => <View style={{marginVertical:10}} />;

export default function Configuration() {
	const onPressItem = (item:SectionListRenderItemInfo<SettingsType,ISettingsData>) => {
		console.log(item.item);
	};

	return (
		<View>
			<SectionList	
				sections={settingsData}
				style={styles.list}
				showsVerticalScrollIndicator={Platform.OS === 'web'}
				bounces={false}
				onEndReachedThreshold={0.5}
				SectionSeparatorComponent={SectionSeparatorComponent}			
				keyExtractor={(it) => it}			
				renderSectionHeader={data => <SectionHeader section={data.section}  />}
		 		renderItem={data => <SectionItem data={data} onPress={onPressItem} />}			
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	list:{
		flex: 1, 
		width: '100%',
		maxWidth:500,
		marginTop: 24, 
		padding:15 
	}
});
