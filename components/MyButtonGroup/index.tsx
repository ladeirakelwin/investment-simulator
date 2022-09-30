import React from 'react';
import styles from './MyButtonGroup.module.scss'
// import { Container } from './styles';
// Cada nome passado seja um botão
// O botão selecionado seja orange

interface IMyButtonGroup {
	names: string[];
}

const MyButtonGroup: React.FC<IMyButtonGroup> = ({ names }) => {
	const first = 0;
	const last = names.length - 1;
	return (
		<div className={styles['button-container']}>
			{names.map((name, index) => {
				return index == first ? (
					<button type="button" className={`rounded-start ${styles.actived}`}>
						{name}
					</button>
				) : index == last ? (
					<button type="button" className="rounded-end">
						{name}
					</button>
				) : (
					<button type="button" className="">
						{name}
					</button>
				);
			})}
		</div>
	);
};

export default MyButtonGroup;
