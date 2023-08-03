import { TSettingRenderItemInfo } from '@/app/(drawer)/configuracoes';
import { SectionItem } from './SectionItem';

export default function RenderSectionItem(data:TSettingRenderItemInfo) {

	if(!data.item.screen)
		console.log('item Diferenciado');

	return (
		<SectionItem {...data} />
	);
}