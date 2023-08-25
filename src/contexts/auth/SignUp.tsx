import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import * as yup from 'yup';
import { IUsuarioSignUp } from '@/models/Usuario';
import { ValidationYup } from '@/shared/services/validation/yup';

interface ISignUpContext extends IUsuarioSignUp{	
	setNome: (text:string) => void
	errorNome?:string	
	
	setEmail: (text:string) => void
	errorEmail?:string
	
	setSenha: (text:string) => void
	errorSenha?:string	

	senhaConfirm:string
	setSenhaConfirm: (text:string) => void
	errorSenhaConfirm?:string

	validateFields: () => true | false
}

interface IProps {
	children: React.JSX.Element | React.JSX.Element[] 
}

const SignUpContext = createContext<ISignUpContext>({
	email:'',
	senha:'',
	senhaConfirm:'',
	nome:'',
	setNome:() => {},
	setEmail:() => {},
	setSenha:() => {},
	setSenhaConfirm: () => {},
	validateFields:() => {return false;}
});

export const useSignUpContext = () => useContext(SignUpContext);

interface validationObject extends IUsuarioSignUp {}

const createValidation:yup.ObjectSchema<validationObject> = yup.object().shape({
	nome: yup.string().required().min(3).max(32),
	email: yup.string().email().required().min(5).max(255),
	senha: yup.string().required().min(6).max(32)
});

export function SignUpProvider({children}:IProps) {
	const [email, setEmail] = useState<string>('');
	const [senha, setSenha] = useState<string>('');
	const [senhaConfirm, setSenhaConfirm] = useState<string>('');
	const [nome, setNome] = useState<string>('');
	
	const [errorEmail, setErrorEmail] = useState<string>('');
	const [errorNome, setErrorNome] = useState<string>('');
	const [errorSenha, setErrorSenha] = useState<string>('');
	const [errorSenhaConfirm, setErrorSenhaConfirm] = useState<string>('');

	const handleSetNome = useCallback((nome:string) => {
		setNome(nome);
	},[nome]);
	
	const handleSetEmail = useCallback((email:string) => {
		setEmail(email);
	},[email]);
	
	const handleSetSenha = useCallback((senha:string) => {
		setSenha(senha);		
	},[senha]);
	
	const handleSetSenhaConfirm = useCallback((senhaConfirm:string) => {
		setSenhaConfirm(senhaConfirm);		
	},[senhaConfirm]);

	const validateFields = useCallback(() => {
		const errors = ValidationYup(createValidation,{email,senha,nome});

		if (senhaConfirm !== senha) 
			setErrorSenhaConfirm('As senhas não coincidem');

		if (errors) {
			if (errors['email'])
				setErrorEmail(errors['email']); 
			
			if (errors['senha'])
				setErrorSenha(errors['senha']);
				
			if (errors['nome'])
				setErrorNome(errors['nome']);

			return false;
		}	

		return true;		
	},[email,senha,senhaConfirm,nome]);

	return (
		<SignUpContext.Provider value={
			useMemo(() => ({
				email,
				senha,
				senhaConfirm,				
				nome,

				setEmail:handleSetEmail,
				setSenha:handleSetSenha,
				setSenhaConfirm:handleSetSenhaConfirm,
				setNome:handleSetNome,

				errorEmail,
				errorSenha,
				errorNome,
				errorSenhaConfirm,

				validateFields
			}),[
				email, 
				senha,
				senhaConfirm, 
				nome,
				errorEmail,
				errorSenha,
				errorNome,
				errorSenhaConfirm,		
			])}>
			{children}			
		</SignUpContext.Provider>		
	);
}
