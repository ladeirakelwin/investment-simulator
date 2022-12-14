import React from 'react';
import { Form } from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';
import { Data } from '../../shared/types';

// import { Container } from './styles';
interface MyInputProps {
	label: string;
	classLabel?: string;
	placeholder?: string;
	name: string;
	value?: string | number;
	onChange: (e: Partial<Data>) => void;
	prefix?: string;
	suffix?: string;
}

const MyInput: React.FC<MyInputProps> = ({
	label,
	classLabel,
	placeholder,
	name,
	value,
	onChange,
	prefix,
	suffix,
}) => {
	return (
		<Form.Group className="mb-3">
			<Form.Label className={classLabel}>{label}</Form.Label>
			<NumericFormat prefix={prefix} suffix={suffix} decimalScale={2} decimalSeparator="," onChange={(e) => onChange({[name]: e.target.value})} value={value} customInput={Form.Control} className="rounded-0 bg-transparent border border-dark border-top-0 border-end-0 border-start-0" placeholder={placeholder} />
		</Form.Group>
	);
};

export default MyInput;
