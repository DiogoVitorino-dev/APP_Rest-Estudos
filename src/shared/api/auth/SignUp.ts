import { AxiosAPI } from '../axios/config';
import { IUsuarioSignUp } from '@/models/Usuario';

export const signUp = async (usuario:IUsuarioSignUp):Promise<number> => {			
	const {data} = await AxiosAPI.post('/cadastrar',{...usuario});

	if (data) return data;

	throw 'Error ao realizar o cadastro';
};