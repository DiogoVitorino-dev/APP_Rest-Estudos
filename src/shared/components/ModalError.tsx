
import { SimpleModal } from '@/shared/components';

interface IProps {
	error?:string
	visible:boolean
	onDismiss?:() => void
}

export function ModalError({onDismiss,visible,error}:IProps) {
	if (error && visible) {
		return (
			<SimpleModal
				icon={{name:'sentiment-dissatisfied',size:50}}
				message={error}
				visible={visible}
				onDismiss={onDismiss}						
			/>
		);		
	}

	return null;
};