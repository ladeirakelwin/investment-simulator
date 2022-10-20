import React from 'react';
import { CardText, CardTextKeys } from '../../shared/constants';

interface CardProps {
	title: CardTextKeys;
	value: string | number;
	className?: string;
	isGreen?: boolean;
	typeValue?: 'currency' | 'percentage';
}

const Card: React.FC<CardProps> = ({
	title,
	value,
	className,
	isGreen = false,
	typeValue = 'currency',
}) => {
	const hasGreen = isGreen ? 'text-success' : 'text-dark';
	const tittle = CardText[title] || title;
	const formatValue =
		typeValue === 'currency'
			? new Intl.NumberFormat('pt-BR', {
					style: 'currency',
					currency: 'BRL',
			  }).format(Number(value))
			: `${value} %`;
	return (
		<div
			className={`shadow-sm bg-light d-flex flex-column
		space-between flex-fill text-center gap-3 p-2 ${className}`}
		>
			<span className="fw-bold">{tittle}</span>
			<span className={`${hasGreen} fs-6`}>{formatValue}</span>
		</div>
	);
};

export default Card;
