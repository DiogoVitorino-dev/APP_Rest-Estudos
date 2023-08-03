import { Text, TextProps } from './Themed';

export function OpenText(props: TextProps) {
	return <Text {...props} style={[props.style, { fontFamily: 'OpenSans' }]} />;
}
