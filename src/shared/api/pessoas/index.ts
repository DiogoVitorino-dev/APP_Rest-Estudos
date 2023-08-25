import { create } from './Create';
import { deleteById } from './DeleteById';
import { getAll } from './GetAll';
import { updateById } from './UpdateById';

export const PessoasService = {
	getAll,
	updateById,
	deleteById,
	create
};