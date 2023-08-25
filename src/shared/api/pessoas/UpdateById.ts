import { IPessoa } from '@/models';
import { getValueSafety } from '@/shared/services/secureStorage';
import { AxiosAPI } from '../axios/config';
import { GenericEnum } from '@/constants/GenericEnum';
import { StatusCodes } from 'http-status-codes';

export const updateById = async (pessoa:IPessoa) => {	
	const {status} = await AxiosAPI.put(`/pessoas/${pessoa.id}`,{...pessoa},{
		headers:{
			Authorization:`Bearer ${await getValueSafety(GenericEnum.secureKeyToken)}`
		},			
	});

	if (status === StatusCodes.NO_CONTENT) return;

	throw 'Error ao atualizar o registro';	
};