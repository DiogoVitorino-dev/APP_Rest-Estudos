// Colors values must have 6 characters
const tintColorLight = '#649BDE';
const tintColorDark = '#476E9E';

const borderColorLight = '#D4D4D4';
const borderColorDark = '#666666';

export default {
	light: {
		text: '#333333',			
		borderColor:borderColorLight,
		drawerActive:'#2D4466',
		background: '#ffffff',
		backdrop:'#F7F7F7',
		tint: tintColorLight,
		warning:'#F23838',
		button:'#71A0A690',
		buttonSelected:'#89C2C9',
		iconDefault: '#333333',
		iconSelected: tintColorLight,
	},
	dark: {
		text: '#F2F2F2',
		background: '#000000',
		backdrop:'#1A1A19',
		borderColor:borderColorDark,
		drawerActive:'#4D75B0',
		tint: tintColorDark,
		warning:'#F23838',
		button:'#71A0A6',
		buttonSelected:'#89C2C9',
		iconDefault: '#ffffff',
		iconSelected: tintColorDark,
	},
	icon:{
		['settings']:'#95B0C2',	
		['brush']:'#7A6A8F',
		['EmptyList']:'#D9AD75',
		['edit']:'#8793A3',	
		['delete']:'#F23838',	
				
	} 
};
