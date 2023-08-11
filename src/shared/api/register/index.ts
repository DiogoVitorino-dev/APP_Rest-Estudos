import { AxiosAPI } from '../axiosConfig';

interface IRegister {
	id:number
}

interface IProps{
	username:string
	email:string
	password:string
}

const register = async ({username,email,password}:IProps) => {
	try {		
		const {data} = await AxiosAPI.post('/cadastrar',{
			nome:username, 
			email,
			senha:password
		});

		if (data) return data as IRegister;

		return new Error('Error ao efetuar o cadastro');			
	} catch (err) {		
		return err as Error;
	}	
};

export const RegisterService = {register};