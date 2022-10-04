import React from 'react';
import { Form } from 'react-bootstrap';
import { simulatorData } from '../../pages';

// import { Container } from './styles';
interface IMyInput {
    controlId?: string;
    label: string;
    classLabel?: string;
    type?: string;
    placeholder?: string;
	name: string;
	
}

const MyInput: React.FC<IMyInput> = ({ controlId,label,classLabel,placeholder, name,type='text'}) => {
	return (
		<Form.Group className='mb-3' controlId={controlId}>
			<Form.Label className={classLabel}>{label}</Form.Label>
			{/* <Form.Control type={type} placeholder={placeholder} className="rounded-0 bg-transparent border border-dark border-top-0 border-end-0 border-start-0" value={value} onChange={(event) => changer((prev) => {...prev, state: event.target.value})}/> */}
		</Form.Group>
	);
};

export default MyInput;
