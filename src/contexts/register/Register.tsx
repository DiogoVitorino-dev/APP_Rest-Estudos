import { RegisterService } from '@/shared/api/register';
import React, { createContext, useContext, useState } from 'react';

export type TUserSignUp = {
	username:string,
	email:string,
	password:string,	
}

interface IRegisterContext {
	signUp: (user:TUserSignUp) => Promise<void>
	loading: boolean
	error?: string
}
interface IProps {
	children: React.JSX.Element | React.JSX.Element[]
}

const RegisterContext = createContext<IRegisterContext>({
	signUp: async () => {},
	loading:false,
	error:''
});

export const useRegister = () => useContext(RegisterContext);

export function RegisterProvider({children}:IProps) {	
	const [error, setError] = useState<string | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);

	const handleSignUp = async (user:TUserSignUp) => {
		setLoading(true);
		setError(undefined);
		const response = await RegisterService.register(user);

		if (response instanceof Error)
			setError(response.message);	

		setLoading(false);		
	};
	
	return (
		<RegisterContext.Provider
			value={{	
				signUp:handleSignUp,		
				loading,
				error,				
			}}>
			{children}
		</RegisterContext.Provider>
	);
}
