import { AxiosAPI } from '../axios/config';
import { IUsuario, IUsuarioSignIn } from '@/models/Usuario';

interface IResponse extends IUsuario {
	accessToken:string
}

export const signIn = async (usuario:IUsuarioSignIn):Promise<IResponse> => {			
	const {data} = await AxiosAPI.post('/entrar',{...usuario});

	if (data) return data;
	

	throw 'Error ao realizar o login';
};