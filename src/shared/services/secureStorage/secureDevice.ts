import * as SecureStore from 'expo-secure-store';

export const saveSafetyDevice = async (key:string, value:string) => {
	await SecureStore.setItemAsync(key, value,{requireAuthentication:true});
};

export const getValueSafetyDevice = async (key:string) => {
	const result = await SecureStore.getItemAsync(key);
	if (result) 
		return result;	
	return null;
};

export const clearSecureStoreDevice = async (key:string) => {
	await SecureStore.deleteItemAsync(key);	
};
