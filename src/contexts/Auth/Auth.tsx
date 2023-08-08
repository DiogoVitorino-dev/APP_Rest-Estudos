import { ENamesPages } from '@/constants/ENamesPages';
import { IUser } from '@/models';
import { router, useSegments } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface IAuthContext {
	signIn: (user:Omit<IUser,'username'>) => void,
	signOut: () => void,
	user:null | IUser
}

const AuthContext = createContext({
	signIn: () => {},
	signOut: () => {},
	user:null
} as IAuthContext);

// This hook can be used to access the user info.
export function useAuth() {
	return useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
	const segments = useSegments();

	useEffect(() => {
		console.log(segments[0]);
		
		const inAuthGroup = segments[0] === '(auth)';

		if (
		// If the user is not signed in and the initial segment is not anything in the auth group.
			!user &&
      !inAuthGroup
		) {
			// Redirect to the sign-in page.
			router.replace(`/(auth)/${ENamesPages.entrar}`);
		} else if (user && inAuthGroup) {
			// Redirect away from the sign-in page.
			router.replace(`/(drawer)/${ENamesPages.paginaInicial}`);
		}
	}, [user, segments]);
}

export function AuthProvider(props) {
	const [user, setAuth] = useState<Omit<IUser,'username'> | null>(null);

	useProtectedRoute(user);

	return (
		<AuthContext.Provider
			value={{
				signIn: (user:Omit<IUser,'username'>) => setAuth(user),
				signOut: () => setAuth(null),
				user,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
}
