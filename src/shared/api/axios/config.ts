import axios from 'axios';

export const RequestConfig = {
	BASE_URL:'https://apirestestudos-diogovf90.b4a.run',
	LIMIT_ITEMS:10
};

const AxiosAPI = axios.create({
	baseURL:'http://localhost:3333',		
});

AxiosAPI.interceptors.response.use(
	response => response,
	err => {
		let error = new Error('Ocorreu um erro, tente novamente mais tarde');
				
		switch (err.message) {
			case 'Network Error':
				error = new Error('Error de conexão, tente novamente mais tarde.');
				break;		
		
			default:
				if (err.response.data.errors.default)						
					error = new Error(err.response.data.errors.default);				
				break;			
		}

		return Promise.reject(error);
	}
);

export { AxiosAPI };