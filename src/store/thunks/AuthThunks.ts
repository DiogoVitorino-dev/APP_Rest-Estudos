import { IUsuario, IUsuarioSignIn, IUsuarioSignUp } from '@/models';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import { AuthService } from '@/shared/api/auth';
import { cleanSecureStore, getValueSafety, saveSafety } from '@/shared/services/secureStorage';
import { GenericEnum } from '@/constants/GenericEnum';

export const signIn = createAsyncThunk<IUsuario,IUsuarioSignIn,{state:RootState}>(
	'usuario/signIn',
	async (usuario:IUsuarioSignIn) => {
		const {accessToken,id,nome} = await AuthService.signIn(usuario);
		await saveSafety(GenericEnum.secureKeyToken,accessToken);
		await saveSafety(GenericEnum.user, JSON.stringify({id,nome}));

		return {id,nome};
	},
	{
		condition: (_,{getState}) => {
			const {status} = getState().auth;
			if(status === 'loading')
				return false;
	
			return true;
		}
	}
);

export const signUp = createAsyncThunk<number,IUsuarioSignUp,{state:RootState}>(
	'usuario/signIn',
	async (usuario:IUsuarioSignUp) => await AuthService.signUp(usuario),
	{
		condition: (_,{getState}) => {
			const {status} = getState().auth;
			if(status === 'loading')
				return false;
	
			return true;
		}
	}
);

export const signOut = createAsyncThunk<void,void,{state:RootState}>(
	'usuario/signOut',
	async () => {
		await cleanSecureStore(GenericEnum.secureKeyToken);
		await cleanSecureStore(GenericEnum.user);
	},
	{
		condition: (_,{getState}) => {
			const {status} = getState().auth;
			if(status === 'loading')
				return false;
	
			return true;
		}
	}
);

export const recoverySaved = createAsyncThunk<IUsuario,void,{state:RootState}>(
	'usuario/recoverySaved',
	async (_,{rejectWithValue}) => {
		const usuario = await getValueSafety(GenericEnum.user);
		if (usuario === null) 
			rejectWithValue('Não autenticado');
		else
			return JSON.parse(usuario);
	},
	{
		condition: (_,{getState}) => {
			const {status} = getState().auth;
			if(status === 'loading')
				return false;
	
			return true;
		}
	}
);