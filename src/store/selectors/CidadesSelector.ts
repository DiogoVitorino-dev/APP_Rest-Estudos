import { RootState } from '..';

export const selectCidades = (state: RootState) => state.cidades.cidades;

export const selectCidadesTotalCount = (state: RootState) => state.cidades.totalCount;

export const selectCidadesStatus = (state: RootState) => state.cidades.status;

export const selectCidadesFilter = (state: RootState) => state.cidades.filter;

export const selectCidadesError = (state: RootState) => state.cidades.error;
