import { Platform } from 'react-native';
import { cleanSecureStoreDevice, getValueSafetyDevice, saveSafetyDevice } from './secureDevice';
import { cleanSecureStoreWeb, getValueSafetyWeb, saveSafetyWeb } from './secureWeb';

export const saveSafety = 
 Platform.OS !== 'web' 
 	? saveSafetyDevice 
 	: saveSafetyWeb;

export const getValueSafety = 
	Platform.OS !== 'web' 
		? getValueSafetyDevice 
		: getValueSafetyWeb;
		
export const cleanSecureStore = 
	Platform.OS !== 'web' 
		? cleanSecureStoreDevice 
		: cleanSecureStoreWeb;