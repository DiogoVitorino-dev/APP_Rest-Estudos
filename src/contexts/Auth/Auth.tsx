import { ENamesPages } from '@/constants/ENamesPages';
import { GenericEnum } from '@/constants/GenericEnum';
import { IUser } from '@/models';
import { AuthService } from '@/shared/api/auth';
import { clearSecureStore, getValueSafety, saveSafety } from '@/shared/services/secureStorage';
import { router, useSegments } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type TUserSignIn = {email:string,password:string}
type TUserNullable = IUser | null

interface IAuthContext {
	signIn: (user:TUserSignIn) => Promise<void>
	signOut: () => Promise<void>
	user: TUserNullable
	loading: boolean
	error?: string
}
interface IProps {
	children: React.JSX.Element | React.JSX.Element[]
}

const AuthContext = createContext<IAuthContext>({
	signIn: async () => {},
	signOut: async () => {},
	user:null,
	loading:false,
	error:''
});

function useProtectedRoute(user:TUserNullable) {
	const segments = useSegments();

	const redirects = async (user:TUserNullable) => {
		const inAuthGroup = segments[0] === '(auth)';
		const inRootGroup = segments[0] === '(drawer)';
		const token = await getValueSafety(GenericEnum.secureKeyToken);
		// retirar MOCK USER__________________________
		if (token) user={id:1,username:'mock'};		
		
		if (			
			!user && !inAuthGroup && !token
		) {
			// Redirect to the sign-in page.
			router.replace(`/${ENamesPages.entrar}`);
		} else if (user && !inRootGroup && token) {
			// Redirect away from the sign-in page.
			router.replace(`/(drawer)/${ENamesPages.paginaInicial}`);
		}
	};

	useEffect(() => {	
		redirects(user);
	}, [user, segments]);
}

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({children}:IProps) {
	const [user, setAuth] = useState<TUserNullable>(null);
	const [error, setError] = useState<string | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);
	
	useProtectedRoute(user);

	const handleSignIn = async (user:TUserSignIn) => {
		setLoading(true);
		setError(undefined);
		const result = await AuthService.auth(user);

		if (result instanceof Error) {
			setError(result.message);
		} else {
			await saveSafety(GenericEnum.secureKeyToken, result.accessToken);
			setAuth({id:1,username:'mock'});
		}
		setLoading(false);
	};
	
	const handleSignOut = async () => {
		setLoading(true);
		await clearSecureStore(GenericEnum.secureKeyToken);		
		setAuth(null);
		setLoading(false);
	};

	return (
		<AuthContext.Provider
			value={{
				signIn: handleSignIn,
				signOut: handleSignOut,
				loading,
				error,
				user,
			}}>
			{children}
		</AuthContext.Provider>
	);
}
