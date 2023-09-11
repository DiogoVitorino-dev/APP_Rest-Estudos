import { getValueSafety } from '@/shared/services/secureStorage';
import { AxiosAPI } from '../axios/config';
import { GenericEnum } from '@/constants/GenericEnum';
import { StatusCodes } from 'http-status-codes';

export const deleteById = async (id:number):Promise<void> => {
	const {status} = await AxiosAPI.delete(`/cidades/${id}`,{
		headers:{
			Authorization:`Bearer ${await getValueSafety(GenericEnum.secureKeyToken)}`
		},			
	});

	if (status === StatusCodes.NO_CONTENT) return;

	return Promise.reject(new Error('Error ao remover a cidade'));
};