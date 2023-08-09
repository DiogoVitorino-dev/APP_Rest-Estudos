import { IUser } from '@/models';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import * as yup from 'yup';
import { ValidationYup } from '@/shared/services/ValidationYup';


interface ISignUpContext extends IUser {	
	setUsername: (text:string) => void
	errorUsername?:string
	
	setEmail: (text:string) => void
	errorEmail?:string

	
	setPassword: (text:string) => void
	errorPassword?:string
	
	passwordConfirm: string
	setPasswordConfirm: (text:string) => void
	errorPasswordConfirm?:string

	validateFields: () => true | false
}

interface IProps {
	children: React.JSX.Element | React.JSX.Element[] 
}

const SignUpContext = createContext<ISignUpContext>({
	email:'',
	password:'',
	passwordConfirm:'',
	username:'',
	setUsername:() => {},
	setEmail:() => {},
	setPassword:() => {},
	setPasswordConfirm: () => {},
	validateFields:() => {return false;}
});

export function useSignUpContext() {
	return useContext(SignUpContext);
}

interface validationObject extends IUser {}

const createValidation:yup.ObjectSchema<validationObject> = yup.object().shape({
	username: yup.string().required().min(3).max(32),
	email: yup.string().email().required().min(5).max(255),
	password: yup.string().required().min(6).max(32)
});

export function SignUpProvider({children}:IProps) {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordConfirm, setPasswordConfirm] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	
	const [errorEmail, setErrorEmail] = useState<string>('');
	const [errorUsername, setErrorUsername] = useState<string>('');
	const [errorPassword, setErrorPassword] = useState<string>('');
	const [errorPasswordConfirm, setErrorPasswordConfirm] = useState<string>('');

	const handleSetUsername = (username:string) => {
		setUsername(username);
	};
	
	const handleSetEmail = useCallback((email:string) => {
		setEmail(email);
	},[email]);
	
	const handleSetPassword = useCallback((password:string) => {
		setPassword(password);		
	},[password]);
	
	const handleSetPasswordConfirm = useCallback((passwordConfirm:string) => {
		setPasswordConfirm(passwordConfirm);		
	},[passwordConfirm]);

	const validateFields = () => {
		const errors = ValidationYup(createValidation,{email,password,username});

		if (passwordConfirm !== password) 
			setErrorPasswordConfirm('As senhas não coincidem');

		if (errors) {
			if (errors['email'])
				setErrorEmail(errors['email']); 
			
			if (errors['password'])
				setErrorPassword(errors['password']);
				
			if (errors['username'])
				setErrorUsername(errors['username']);

			return false;
		}	

		return true;		
	};

	return (
		<SignUpContext.Provider value={
			useMemo(() => ({
				email,
				password,
				passwordConfirm,				
				username,

				setEmail:handleSetEmail,
				setPassword:handleSetPassword,
				setPasswordConfirm:handleSetPasswordConfirm,
				setUsername:handleSetUsername,

				errorEmail,
				errorPassword,
				errorUsername,
				errorPasswordConfirm,

				validateFields

			}),[
				email, 
				password,
				passwordConfirm, 
				username, 
				errorEmail, 
				errorUsername, 
				errorPassword,
				errorPasswordConfirm
			])}>
			{children}			
		</SignUpContext.Provider>		
	);
}
