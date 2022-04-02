import { useState, useEffect, ReactNode } from 'react';
import { Animated, AnimatedProps } from "react-animated-css";

export interface DelayComponentProps extends Omit<AnimatedProps, 'isVisible'> {
  delay: number;
  children?: ReactNode;
}

function DelayComponent(props: DelayComponentProps) {

  const { delay, ...animatedProps } = props;

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let timeout = setTimeout(() => setVisible(true), delay);
    return () => {
      clearTimeout(timeout);
    };
  })
  
  return (<Animated { ...animatedProps } isVisible={visible} />);
}

export { DelayComponent };
export default DelayComponent;