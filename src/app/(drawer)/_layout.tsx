import { Drawer } from 'expo-router/drawer';

import { HeaderButton, MaterialIcon } from '@/shared/components';
import { Platform, useWindowDimensions } from 'react-native';
import Colors  from '@/constants/Colors';
import { ENamesPages } from '@/constants/ENamesPages';
import { ELabelsPages } from '@/constants/ELabelsPages';
import UserProfile from '@/components/drawer/UserProfile';
import { DrawerContent, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useTheme } from '@react-navigation/native';
import { TMaterialIconNames } from '@/constants/Types';
import { useCallback } from 'react';

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
			<UserProfile />
			<DrawerContent {...props} />
		</>
	);
};

const drawerIcon = (name:TMaterialIconNames) => (
	<MaterialIcon name={name} size={35} />
);

export default function DrawerLayout() {
	const theme = useTheme();
	const {width} = useWindowDimensions();
	const adaptiveScreen = useCallback(() => width > 900 && Platform.OS === 'web',[width]); 
	return <Drawer 
		screenOptions={{			
			headerRight,					
			drawerActiveTintColor:Colors[theme.dark ? 'dark' : 'light'].drawerActive,
			drawerLabelStyle:{color:Colors[theme.dark ? 'dark' : 'light'].text},
			headerTintColor:Colors[theme.dark ? 'dark' : 'light'].iconDefault,		
			drawerType: adaptiveScreen() ? 'permanent' : 'slide',
			headerLeft: adaptiveScreen() ?  () => (<></>) : undefined,
		}}
		drawerContent={drawerContent}		
		initialRouteName={ENamesPages.paginaInicial}			
	>		
		
		<Drawer.Screen 
			name={ENamesPages.paginaInicial}
			options={{
				drawerIcon:() => drawerIcon('home'),
				drawerLabel:ELabelsPages.paginaInicial,
				title:ELabelsPages.paginaInicial
			}} 
		/>
		<Drawer.Screen 
			name={ENamesPages.cidades} 
			options={{
				drawerIcon:() => drawerIcon('location-city'),
				drawerLabel:ELabelsPages.cidades,
				title:ELabelsPages.cidades
			}} 
		/>
		<Drawer.Screen 
			name={ENamesPages.pessoas} 
			options={{
				drawerIcon:() => drawerIcon('people'),
				drawerLabel:ELabelsPages.pessoas,
				title:ELabelsPages.pessoas
			}} 
		/>
		<Drawer.Screen 
			name={ENamesPages.configuracoes}
			options={{
				drawerIcon:() => drawerIcon('settings'),
				drawerLabel:ELabelsPages.configuracoes,
				title:ELabelsPages.configuracoes
			}}
		/>
	</Drawer>;
}
