import React, { ReactNode } from 'react';
import styles from './MainButton.module.scss';

interface MainButtonProps {
	status?: 'blocked' | 'actived';
	children: ReactNode;
}

const MainButton: React.FC<MainButtonProps> = ({ status = 'blocked', children }) => {
	const isDisabled = status === 'blocked' ? true : false;
	return (
		<button type="submit" className={`${styles[status]} ${styles['button']}`} disabled={isDisabled}>
			{children}
		</button>
	);
};

export default MainButton;
