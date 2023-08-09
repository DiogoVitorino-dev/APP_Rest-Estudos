import { IUser } from '@/models';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import * as yup from 'yup';
import { ValidationYup } from '@/shared/services/ValidationYup';


interface ISignInContext {
	email:string,
	setEmail: (text:string) => void
	errorEmail?:string

	password:string,
	setPassword: (text:string) => void
	errorPassword?:string

	validateFields: () => true | false
}

interface IProps {
	children: React.JSX.Element | React.JSX.Element[] 
}

const SignInContext = createContext<ISignInContext>({
	email:'',
	password:'',
	setEmail:() => {},
	setPassword:() => {},
	errorEmail:'',
	errorPassword:'',
	validateFields:() => {return false;}
});

export function useSignInContext() {
	return useContext(SignInContext);
}

interface validationObject extends Omit<IUser,'username'> {}

const createValidation:yup.ObjectSchema<validationObject> = yup.object().shape({
	email: yup.string().email().required().min(5),
	password: yup.string().required().min(6)
});

export function SignInProvider({children}:IProps) {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	
	const [errorEmail, setErrorEmail] = useState<string>('');
	const [errorPassword, setErrorPassword] = useState<string>('');

	const handleSetEmail = useCallback((email:string) => {
		setEmail(email);
	},[email]);
	
	const handleSetPassword = useCallback((password:string) => {
		setPassword(password);		
	},[password]);

	const validateFields = () => {
		const errors = ValidationYup(createValidation,{email,password});

		if (errors) {
			if (errors['email'])
				setErrorEmail(errors['email']); 
			
			if (errors['password'])
				setErrorPassword(errors['password']);

			return false;
		}

		return true;		
	};

	return (
		<SignInContext.Provider value={
			useMemo(() => ({
				email,
				password,				
				setEmail:handleSetEmail,
				setPassword:handleSetPassword,				
				errorEmail,
				errorPassword,				
				validateFields
			}),[email,password,errorEmail,errorPassword])
		}>
			{children}			
		</SignInContext.Provider>		
	);
}
