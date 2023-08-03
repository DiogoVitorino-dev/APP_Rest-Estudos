const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const borderColorLight = 'rgb(220,220,220)';
const borderColorDark = 'rgb(50,50,50)';

export default {
	light: {
		text: '#333',		
		borderColor:borderColorLight,
		drawerActive:'#2D4466',
		background: '#fff',
		tint: tintColorLight,
		iconDefault: '#333',
		iconSelected: tintColorLight,
	},
	dark: {
		text: '#F2F2F2',
		background: '#000',
		borderColor:borderColorDark,
		drawerActive:'#4D75B0',
		tint: tintColorDark,
		iconDefault: '#fff',
		iconSelected: tintColorDark,
	},
	icon:{
		['settings']:'#708491',	
		['brush']:'#7A6A8F'
	} 
};
