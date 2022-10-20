import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

interface NameChoiceProps {
	name: string;
}

const NameChoice: React.FC<NameChoiceProps> = ({ name}) => {
	return (
		<div className="d-flex justify-content-between">
			<p>{name}</p>
			<AiOutlineInfoCircle />
		</div>
	);
};

export default NameChoice;
