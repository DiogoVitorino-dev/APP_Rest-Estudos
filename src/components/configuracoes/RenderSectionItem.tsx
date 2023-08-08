import { TSettingRenderItemInfo } from '@/app/(drawer)/configuracoes';
import { SectionItem } from './SectionItem';

export default function RenderSectionItem(data:TSettingRenderItemInfo) {
	const isFirstItem= data.index === 0;
	const isLastItem= data.index === data.section.data.length - 1;

	return (
		<SectionItem 
			item={data.item}
			isFirstItem={isFirstItem} 
			isLastItem={isLastItem}
		/>
	);
}