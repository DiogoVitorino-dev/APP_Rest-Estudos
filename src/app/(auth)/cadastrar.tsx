import { View } from '@/components/shared';
import React from 'react';
import { TextInput } from 'react-native';

export default function Cadastrar() {
	return (
		<View>
			<TextInput placeholder='E-mail' />
			<TextInput placeholder='Senha' />			
		</View>
	);
};
