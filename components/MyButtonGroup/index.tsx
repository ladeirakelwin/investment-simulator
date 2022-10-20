import React, { SyntheticEvent } from 'react';
import { Data } from '../../shared/types';
import styles from './MyButtonGroup.module.scss';

interface MyButtonGroupProps {
	type: string;
	names: string[];
	setALot: (e: Partial<Data>) => void;
}

interface SetActive {
	el: SyntheticEvent<HTMLButtonElement>;
	setALot: (e: Partial<Data>) => void;
	type: string;
}

const setActive = ({ el, setALot, type }: SetActive) => {
	const sibblingElements = el?.currentTarget?.parentElement?.children;
	if (sibblingElements) {
		const length = sibblingElements.length;
		for (let i = 0; i < length; i++) {
			sibblingElements[i].classList.remove(styles.actived);
		}
		el.currentTarget.classList.add(styles.actived);
		// console.log({[type]: el.currentTarget.innerHTML })
		setALot({[type]: el.currentTarget.innerHTML })
	}
};

const MyButtonGroup: React.FC<MyButtonGroupProps> = ({ names, setALot, type }) => {
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
						onClick={(e) => setActive({ el: e, setALot, type })}
					>
						{name}
					</button>
				) : index == last ? (
					<button
						key={index}
						type="button"
						className="rounded-end"
						onClick={(e) => setActive({ el: e, setALot, type })}
					>
						{name}
					</button>
				) : (
					<button
						key={index}
						type="button"
						className=""
						onClick={(e) => setActive({ el: e, setALot, type })}
					>
						{name}
					</button>
				);
			})}
		</div>
	);
};

export default MyButtonGroup;
