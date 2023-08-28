import { createContext, useContext, useMemo, useState } from 'react';
import * as yup from 'yup';
import { IPessoa } from '@/models/Pessoa';
import { ValidationYup } from '@/shared/services/validation/yup';

type TOmitIPessoa = Omit<IPessoa, 'id'>

interface IPessoasContext extends TOmitIPessoa{
	setNomeCompleto: (text:string) => void
	errorNomeCompleto: string
	
	setEmail: (text:string) => void
	errorEmail: string
	
	setCidadeid: (id:number) => void	

	validateFields: () => boolean
	cleanContextStates: () => void
}

interface IProps {
	children: React.JSX.Element | React.JSX.Element[]
}

const PessoasContext = createContext<IPessoasContext>({
	nomeCompleto:'',
	setNomeCompleto:()=>{},
	errorNomeCompleto:'',
	cidadeid:0,
	setCidadeid:()=>{},
	email:'',
	setEmail:()=>{},
	errorEmail:'',
	validateFields:() => false,
	cleanContextStates:() => {}
});

export const usePessoasContext = () => useContext(PessoasContext);

interface validationObject extends Omit<TOmitIPessoa,'cidadeid'>{}

const createValidation:yup.ObjectSchema<validationObject> = yup.object().shape({
	nomeCompleto: yup.string().required().min(3).max(80),
	email: yup.string().email().required().max(255),
});

export function PessoasProvider({children}:IProps) {
	const [nomeCompleto,setNomeCompleto] = useState('');
	const [errorNomeCompleto,setErrorNomeCompleto] = useState('');
	
	const [email,setEmail] = useState('');
	const [errorEmail,setErrorEmail] = useState('');
	
	const [cidadeid,setCidadeid] = useState(0);

	const handleSetNomeCompleto = (nomeCompleto:string) => {
		setNomeCompleto(nomeCompleto);
	};	
	
	const handleSetEmail = (email:string) => {
		setEmail(email);
	};	
	
	const handleSetCidadeid = (cidadeid:number) => {
		setCidadeid(cidadeid);
	};	
	
	const validateFields = () => {
		const errors = ValidationYup(createValidation,{nomeCompleto,email});

		if (errors) {
			if (errors['email'])
				setErrorEmail(errors['email']);
			
			if (errors['nomeCompleto'])
				setErrorNomeCompleto(errors['nomeCompleto']); 		

			return false;
		}
		return true;		
	};	

	const cleanContextStates = () => {
		setNomeCompleto('');
		setCidadeid(0);
		setEmail('');
		setErrorEmail('');
		setErrorNomeCompleto('');
	};
	
	return (
		<PessoasContext.Provider value={useMemo(() => ({
			nomeCompleto,
			setNomeCompleto:handleSetNomeCompleto,
			errorNomeCompleto,
			email,
			setEmail:handleSetEmail,
			errorEmail,			
			cidadeid,		
			setCidadeid:handleSetCidadeid,			
			validateFields,
			cleanContextStates
		}),[
			nomeCompleto,
			errorNomeCompleto,
			email,
			errorEmail,
			cidadeid
		])}>
			{children}
		</PessoasContext.Provider>
	);
}
