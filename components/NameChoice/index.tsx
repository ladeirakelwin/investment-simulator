import React from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';

interface INameChoice {
	name: string;
    styles?: string;
}

const NameChoice: React.FC<INameChoice> = ({ name, styles='' }) => {
	return (
		<div className={styles}>
			<p>{name}</p>
			<AiFillInfoCircle />
		</div>
	);
};

export default NameChoice;
