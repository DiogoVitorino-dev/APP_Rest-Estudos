import { RootState } from '..';

export const selectPessoas = (state: RootState) => state.pessoas.pessoas;

export const selectPessoasStatus = (state: RootState) => state.pessoas.status;

export const selectPessoasTotalCount = (state: RootState) => state.pessoas.totalCount;

export const selectPessoasFilter = (state: RootState) => state.pessoas.filter;

export const selectPessoasError = (state: RootState) => state.pessoas.error;