import React from 'react';
import { Form } from 'react-bootstrap';

// import { Container } from './styles';
interface IMyInput {
    controlId?: string;
    label: string;
    classLabel?: string;
    type?: string;
    placeholder?: string;
    
}

const MyInput: React.FC<IMyInput> = ({ controlId,label,classLabel,placeholder,type='text'}) => {
	return (
		<Form.Group className='mb-3' controlId={controlId}>
			<Form.Label className={classLabel}>{label}</Form.Label>
			<Form.Control type={type} placeholder={placeholder} className="rounded-0 bg-transparent border border-dark border-top-0 border-end-0 border-start-0" />
		</Form.Group>
	);
};

export default MyInput;
