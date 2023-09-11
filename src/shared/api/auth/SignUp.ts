import { AxiosAPI } from '../axios/config';
import { IUsuarioSignUp } from '@/models';

export const signUp = async (usuario:IUsuarioSignUp):Promise<number> => {			
	const {data} = await AxiosAPI.post('/cadastrar',{...usuario});

	if (data) return data;

	return Promise.reject(new Error('Error ao realizar o cadastro'));
};