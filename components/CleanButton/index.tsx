import React, { ReactNode } from 'react';
import styles from './CleanButton.module.scss';

interface CleanButtonProps {
	children: ReactNode;
	onClear: () => void;
}

const CleanButton: React.FC<CleanButtonProps> = ({  children, onClear }) => {
	return (
		<button type="button" className={`${styles['clean']} ${styles['button']}`} onClick={onClear} >
			{children}
		</button>
	);
};

export default CleanButton;
