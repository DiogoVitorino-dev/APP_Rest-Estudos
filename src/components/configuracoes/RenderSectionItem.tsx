import { TSettingRenderItemInfo, TSettingsData } from '@/app/(drawer)/configuracoes';
import { SectionItem } from './SectionItem';

interface IProps {
	data:TSettingRenderItemInfo
	onPress: (item:TSettingsData) => void
}

export default function RenderSectionItem({data,onPress}:IProps) {
	const isFirstItem= data.index === 0;
	const isLastItem= data.index === data.section.data.length - 1;

	return (
		<SectionItem 
			data={data.item}
			onPress={onPress}
			isFirstItem={isFirstItem} 
			isLastItem={isLastItem}
		/>
	);
}