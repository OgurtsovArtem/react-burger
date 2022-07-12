import { FC } from 'react';
import styles from './ScrollWrapper.module.css';

interface IScrollWrapperProps {
  children?: React.ReactNode;
  style?: any;
}

const ScrollWrapper: FC<IScrollWrapperProps> = ({children, style}) => {
  return (
    <div className={`${styles.wrapper} ${style} custom-scrollbar`}>
      {children}
    </div>
  );
}

export default ScrollWrapper;