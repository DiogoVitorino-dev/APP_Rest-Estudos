import { Platform } from 'react-native';
import { clearSecureStoreDevice, getValueSafetyDevice, saveSafetyDevice } from './secureDevice';
import { clearSecureStoreWeb, getValueSafetyWeb, saveSafetyWeb } from './secureWeb';

export const saveSafety = 
 Platform.OS !== 'web' 
 	? saveSafetyDevice 
 	: saveSafetyWeb;

export const getValueSafety = 
	Platform.OS !== 'web' 
		? getValueSafetyDevice 
		: getValueSafetyWeb;
		
export const clearSecureStore = 
	Platform.OS !== 'web' 
		? clearSecureStoreDevice 
		: clearSecureStoreWeb;