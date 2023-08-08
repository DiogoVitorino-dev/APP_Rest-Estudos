import { Drawer } from 'expo-router/drawer';

import { HeaderButton } from '@/components/shared';
import { Platform, useWindowDimensions } from 'react-native';
import Colors  from '@/constants/Colors';
import { ENamesPages } from '@/constants/ENamesPages';
import { ELabelsPages } from '@/constants/ELabelsPages';
import UserProfile from '@/components/drawer/UserProfile';
import { DrawerContent, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useTheme } from '@react-navigation/native';

const headerRight = () => (
	<HeaderButton 
		href={`/(drawer)/${ENamesPages.configuracoes}`} 
		icon={{name:'settings',color:Colors['icon'].settings}}
		style={{marginRight:20}}
	/>
);

const drawerContent = (props: DrawerContentComponentProps) => {
	return (
		<>
			<UserProfile userName='user' />
			<DrawerContent {...props}/>
		</>
	);
};

export default function DrawerLayout() {
	const theme = useTheme();
	const {width} = useWindowDimensions();
	return <Drawer 
		screenOptions={{			
			headerRight,					
			drawerActiveTintColor:Colors[theme.dark ? 'dark' : 'light'].drawerActive,
			drawerLabelStyle:{color:Colors[theme.dark ? 'dark' : 'light'].text},
			headerTintColor:Colors[theme.dark ? 'dark' : 'light'].iconDefault,		
			drawerType:width > 700 && Platform.OS === 'web' ? 'permanent' : 'slide',
			headerLeft:width > 700 && Platform.OS === 'web' ?  ()=>(<></>) : undefined,
		}}
		drawerContent={drawerContent}
		
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
