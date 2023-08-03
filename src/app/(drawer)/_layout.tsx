import { Drawer } from 'expo-router/drawer';

import { HeaderButton } from '@/components/shared';
import { Platform, useColorScheme, useWindowDimensions } from 'react-native';
import Colors  from '@/constants/Colors';
import { ENamesPages } from '@/constants/ENamesPages';
import { ELabelsPages } from '@/constants/ELabelsPages';

const headerRight = () => (
	<HeaderButton 
		href={`/(drawer)/${ENamesPages.configuracoes}`} 
		iconName='settings' 
		color={Colors['icon'].settings}
		style={{marginRight:20}}
	/>
);

export default function DrawerLayout() {
	const colorScheme = useColorScheme();
	const {width} = useWindowDimensions();
	return <Drawer 
		screenOptions={{
			headerRight, 
			drawerActiveTintColor:Colors[colorScheme || 'dark'].drawerActive,
			drawerLabelStyle:{color:Colors[colorScheme || 'dark'].text},			
			drawerType:width > 700 && Platform.OS === 'web' ? 'permanent' : 'slide',
			headerLeft:width > 700 && Platform.OS === 'web' ?  ()=>(<></>) : undefined,
		}}
		
		initialRouteName={ENamesPages.paginaInicial}			
	>
		<Drawer.Screen 
			name={ENamesPages.paginaInicial} 
			options={{drawerLabel:ELabelsPages.paginaInicial,title:ELabelsPages.paginaInicial}} 
		/>
		<Drawer.Screen 
			name={ENamesPages.cidades} 
			options={{drawerLabel:ELabelsPages.cidades,title:ELabelsPages.cidades}} 
		/>
		<Drawer.Screen 
			name={ENamesPages.pessoas} 
			options={{drawerLabel:ELabelsPages.pessoas,title:ELabelsPages.pessoas}} 
		/>
		<Drawer.Screen 
			name={ENamesPages.configuracoes}
			options={{drawerLabel:ELabelsPages.configuracoes,title:ELabelsPages.configuracoes}}
		/>
	</Drawer>;
}
