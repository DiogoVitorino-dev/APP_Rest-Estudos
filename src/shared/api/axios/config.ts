import Configuration from '@/constants/Configuration';
import axios from 'axios';

const AxiosAPI = axios.create({
	baseURL:Configuration.BASE_URL,		
});

AxiosAPI.interceptors.response.use(
	response => response,
	err => {
		try {
			let error = new Error('Ocorreu um erro, tente novamente mais tarde');
				
			switch (err.message) {
				case 'Network Error':
					error = new Error('Error de conexão, tente novamente mais tarde.');
					break;		
			
				default:
					if (err.response.data.errors)				
						if (err.response.data.errors.default)				
							error = new Error(err.response.data.errors.default);				
					break;			
			}

			return Promise.reject(error);			
		} catch (error) {
			return Promise.reject(new Error('Ocorreu um erro, tente novamente mais tarde'));			
		}		
	}
);

export { AxiosAPI };