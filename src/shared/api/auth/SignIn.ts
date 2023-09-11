import { AxiosAPI } from '../axios/config';
import { IUsuario, IUsuarioSignIn } from '@/models';

interface IResponse extends IUsuario {
	accessToken:string
}

export const signIn = async (usuario:IUsuarioSignIn):Promise<IResponse> => {			
	const {data} = await AxiosAPI.post('/entrar',{...usuario});

	if (data) return data;	

	return Promise.reject(new Error('Error ao realizar o login'));
};