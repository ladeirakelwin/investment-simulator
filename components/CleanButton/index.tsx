import React, { ReactNode } from 'react';
import styles from './CleanButton.module.scss';

interface ICleanButton {
	status?: 'blocked' | 'actived';
	children: ReactNode;
}

const CleanButton: React.FC<ICleanButton> = ({ status = 'blocked', children }) => {
	return (
		<button type="button" className={`${styles['clean']} ${styles['button']}`} >
			{children}
		</button>
	);
};

export default CleanButton;
