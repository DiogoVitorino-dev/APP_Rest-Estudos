import { AxiosAPI } from '../axiosConfig';

interface IAuth {
	accessToken:string
}

interface IProps{
	email:string
	password:string
}

const auth = async ({email,password}:IProps) => {
	try {		
		const {data} = await AxiosAPI.post('/entrar',{email,senha:password});
		if (data) return data as IAuth;

		return new Error('Error ao efetuar o login');			
	} catch (err) {		
		return err as Error;
	}	
};

export const AuthService = {auth};