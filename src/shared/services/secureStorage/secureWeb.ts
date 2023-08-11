export const saveSafetyWeb = async (key:string, value:string) => {
	localStorage.setItem(key,value);
};

export const getValueSafetyWeb = async (key:string) => {
	return localStorage.getItem(key);	
};

export const clearSecureStoreWeb = async (key:string) => {
	localStorage.removeItem(key);	
};