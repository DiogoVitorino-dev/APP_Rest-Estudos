import { View } from '@/components/shared';
import { SectionHeader } from '@/components/setting';
import { MaterialIcon } from '@/components/shared';

import { Platform, SectionList, SectionListRenderItemInfo, StyleSheet } from 'react-native';
import { Href } from 'expo-router';
import RenderSectionItem from '@/components/setting/RenderSectionItem';
import Colors  from '@/constants/Colors';
import { ENamesPages } from '@/constants/ENamesPages';
import { ELabelsPages } from '@/constants/ELabelsPages';

export interface ISettingsData {
  title: string;
  icon?: JSX.Element
  data: TSettingsData[]
}

type TSettingsData = {
	titleOption:string
	screen?:Href<string>
}

export type TSettingRenderItemInfo = 
	Omit< SectionListRenderItemInfo<TSettingsData,ISettingsData >,'separators'>
	
export type TSettingRenderSectionHeader = 
	Omit< SectionListRenderItemInfo<TSettingsData,ISettingsData >, 
	'index' | 'item' | 'separators'
	>

const settingsData:ISettingsData[] = [
	{
		title: 'Aparência',
		icon: (
			<MaterialIcon 
				name='brush' 
				size={30}
				color={Colors['icon'].brush}				
			/>
		) ,
		data: [{titleOption:'Tema'}],
	},
	{
		title: '',		
		data: [{titleOption:ELabelsPages.sobre,screen:`/setting/${ENamesPages.sobre}`}],
	},
];

const SectionSeparatorComponent = () => <View style={{marginVertical:10}} />;

export default function Configuration() {
	return (
		<View>
			<SectionList	
				sections={settingsData}
				style={styles.list}
				showsVerticalScrollIndicator={Platform.OS === 'web'}
				bounces={false}
				onEndReachedThreshold={0.5}
				SectionSeparatorComponent={SectionSeparatorComponent}			
				keyExtractor={(it) => it.titleOption}			
				renderSectionHeader={
					(section:TSettingRenderSectionHeader) => <SectionHeader {...section} />
				}
		 		renderItem={
					(data:TSettingRenderItemInfo) => <RenderSectionItem {...data} />
				}			
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	list:{
		flex: 1, 
		width: '100%',
		maxWidth:500,		 
		padding:15
	}
});
