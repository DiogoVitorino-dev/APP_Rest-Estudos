import { View } from '@/shared/components';
import { SectionHeader } from '@/components/configuracoes';
import { MaterialIcon } from '@/shared/components';

import { Platform, SectionList, SectionListRenderItemInfo, StyleSheet } from 'react-native';
import { Href, useRouter } from 'expo-router';
import RenderSectionItem from '@/components/configuracoes/RenderSectionItem';
import Colors  from '@/constants/Colors';
import { ENamesPages } from '@/constants/ENamesPages';
import { ELabelsPages } from '@/constants/ELabelsPages';

export interface ISettingsData {
  title: string;
  icon?: JSX.Element
  data: TSettingsData[]
}

export type TSettingsData = {
	title:string
	subTitle?:string
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
		data: [{
			title:ELabelsPages.temas,
			subTitle:'Alterne para tema claro ou escuro.',
			screen:`/${ENamesPages.configuracoes}/${ENamesPages.temas}`
		}],
	},
	{
		title: '',		
		data: [{
			title:ELabelsPages.sobre,			
			screen:`/${ENamesPages.configuracoes}/${ENamesPages.sobre}`
		}],
	},
];

const SectionSeparatorComponent = () => <View style={{marginVertical:10}} />;

export default function Configuration() {
	const router = useRouter();

	const handleOnPressItem = ({screen}:TSettingsData) => {
		if (screen) router.push(screen);
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
				keyExtractor={(it) => it.title}			
				renderSectionHeader={
					(section:TSettingRenderSectionHeader) => SectionHeader({...section})
				}
		 		renderItem={
					(data:TSettingRenderItemInfo) => (
						RenderSectionItem({data:data, onPress:handleOnPressItem})
					)
				}			
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	list:{		
		width: '100%',
		height:'100%',		
		maxWidth:864,
		padding:20,
		marginVertical:15,
		
	},
	
});
