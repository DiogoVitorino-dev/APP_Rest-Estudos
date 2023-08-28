import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import * as yup from 'yup';
import { ValidationYup } from '@/shared/services/validation/yup';
import { IUsuarioSignIn } from '@/models/Usuario';

interface ISignInContext extends IUsuarioSignIn {	
	setEmail: (text:string) => void
	errorEmail?:string
	
	setSenha: (text:string) => void
	errorSenha?:string

	validateFields: () => true | false
}

interface IProps {
	children: React.JSX.Element | React.JSX.Element[] 
}

const SignInContext = createContext<ISignInContext>({
	email:'',
	senha:'',
	setEmail:() => {},
	setSenha:() => {},
	errorEmail:'',
	errorSenha:'',
	validateFields:() => {return false;}
});

export const useSignInContext = () => useContext(SignInContext);

interface validationObject extends IUsuarioSignIn {}

const createValidation:yup.ObjectSchema<validationObject> = yup.object().shape({
	email: yup.string().email().required().min(5),
	senha: yup.string().required().min(6)
});

export function SignInProvider({children}:IProps) {
	const [email, setEmail] = useState<string>('');
	const [senha, setSenha] = useState<string>('');
	
	const [errorEmail, setErrorEmail] = useState<string>('');
	const [errorSenha, setErrorSenha] = useState<string>('');

	const handleSetEmail = useCallback((email:string) => {
		setEmail(email);
	},[email]);
	
	const handleSetSenha = useCallback((senha:string) => {
		setSenha(senha);		
	},[senha]);

	const validateFields = () => {
		const errors = ValidationYup(createValidation,{email,senha});

		if (errors) {
			if (errors['email'])
				setErrorEmail(errors['email']); 
			
			if (errors['senha'])
				setErrorSenha(errors['senha']);

			return false;
		}

		return true;		
	};

	return (
		<SignInContext.Provider value={
			useMemo(() => ({
				email,
				senha,				
				setEmail:handleSetEmail,
				setSenha:handleSetSenha,				
				errorEmail,
				errorSenha,				
				validateFields
			}),[email,senha,errorEmail,errorSenha])
		}>
			{children}			
		</SignInContext.Provider>		
	);
}
