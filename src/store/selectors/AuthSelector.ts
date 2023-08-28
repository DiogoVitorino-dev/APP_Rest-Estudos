import { RootState } from '..';

export const selectUsuario = (state: RootState) => state.auth.usuario;

export const selectAuthStatus = (state: RootState) => state.auth.status;

export const selectAuthError = (state: RootState) => state.auth.error;
