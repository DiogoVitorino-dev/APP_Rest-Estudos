import { ICidade } from '@/models/Cidade';
import * as yup from 'yup';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { ValidationYup } from '@/shared/services/validation/yup';

type TOmitICidade = Omit<ICidade, 'id'>

interface ICidadesContext extends TOmitICidade{
	setNome: (text:string) => void
	errorNome: string
	validateFields: () => boolean
	cleanContextStates: () => void
}

interface IProps {
	children: React.JSX.Element | React.JSX.Element[]
}

const CidadesContext = createContext<ICidadesContext>({
	nome:'',
	setNome:()=>{},
	errorNome:'',
	validateFields:() => false,
	cleanContextStates:() => {}
});

export const useCidadesContext = () => useContext(CidadesContext);

interface validationObject extends TOmitICidade{}

const createValidation:yup.ObjectSchema<validationObject> = yup.object().shape({
	nome: yup.string().required().min(3).max(150),
});

export function CidadesProvider({children}:IProps) {
	const [nome,setNome] = useState('');
	const [errorNome,setErrorNome] = useState('');

	const handleSetNome = (nome:string) => {
		setNome(nome);
	};	
	
	const validateFields = () => {
		const errors = ValidationYup(createValidation,{nome});

		if (errors) {
			if (errors['nome'])
				setErrorNome(errors['nome']); 		

			return false;
		}

		return true;		
	};

	const cleanContextStates = () => {
		setErrorNome('');
		setNome('');
	};
	
	return (
		<CidadesContext.Provider value={useMemo(() => ({
			nome,
			errorNome,
			setNome:handleSetNome,
			validateFields,
			cleanContextStates
		}),[nome,errorNome])}>
			{children}
		</CidadesContext.Provider>
	);
}
