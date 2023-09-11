import jwtDecode from 'jwt-decode';

interface IJwtDecode {
	name: string;
	exp: number;
}

export const TokenExpired = (token?:string | null):boolean => {
	try {
		if (!token || token === 'undefined')
			return true;
		
		const decodedToken = jwtDecode<IJwtDecode>(token);
		const currentDate = new Date();
		
		if (decodedToken.exp < currentDate.getTime())
			return false;		

		return true;		
	} catch (error) {
		return true;		
	}
	
};