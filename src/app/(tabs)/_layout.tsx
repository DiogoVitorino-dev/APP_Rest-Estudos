import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { HeaderButton } from '@/components/shared';
import { useColorScheme } from 'react-native';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const colorScheme = useColorScheme();
	
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Página Inicial',
					tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
					headerRight: () => (<HeaderButton href='/setting/' iconName='dots-vertical' />),
				}}
			/>    
		</Tabs>
	);
}
