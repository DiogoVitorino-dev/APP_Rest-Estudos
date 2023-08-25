import axios from 'axios';

const AxiosAPI = axios.create({
	baseURL:'http://192.168.0.108:3333',		
});

AxiosAPI.interceptors.response.use(
	response => response,
	error => {				
		switch (error.message) {
			case 'Network Error':
				throw new Error('Error de conexão, tente novamente mais tarde.');			
		
			default:
				if (error.response.data.errors.default)	{	
							
					throw new Error(error.response.data.errors.default);
				} else 	
					throw new Error('Ocorreu um erro, tente novamente mais tarde');				
		}
	}
);

export { AxiosAPI };