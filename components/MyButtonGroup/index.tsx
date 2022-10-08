import { type } from 'os';
import React, { ReactElement, SyntheticEvent } from 'react';
import { SyntheticInputEvent } from 'react-number-format/types/types';
import styles from './MyButtonGroup.module.scss';
// import { Container } from './styles';
// Cada nome passado seja um botão
// O botão selecionado seja orange

interface IMyButtonGroup {
	names: string[];
}

const setActive = (el: SyntheticEvent<HTMLButtonElement>) => {
	const sibblingElements = el?.currentTarget?.parentElement?.children;
	if (sibblingElements) {
		const length = sibblingElements.length;
		for (let i = 0; i < length; i++) {
			sibblingElements[i].classList.remove(styles.actived);
		}
		el.currentTarget.classList.add(styles.actived);
	}
};

const MyButtonGroup: React.FC<IMyButtonGroup> = ({ names }) => {
	const first = 0;
	const last = names.length - 1;

	return (
		<div className={styles['button-container']}>
			{names.map((name, index) => {
				return index == first ? (
					<button
						key={index}
						type="button"
						className={`rounded-start ${styles.actived}`}
						onClick={(e) => setActive(e)}
					>
						{name}
					</button>
				) : index == last ? (
					<button
						key={index}
						type="button"
						className="rounded-end"
						onClick={(e) => setActive(e)}
					>
						{name}
					</button>
				) : (
					<button key={index} type="button" className="" onClick={(e) => setActive(e)}>
						{name}
					</button>
				);
			})}
		</div>
	);
};

export default MyButtonGroup;
