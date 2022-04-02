import DelayComponent, { DelayComponentProps } from './DelayComponent';


let htmlEncodeChars: { [c: string]: JSX.Element } = {
  '\n': (<br />),
  ' ': (<>&nbsp;</>),
};

function htmlEncode(str: string): JSX.Element[] {
  return str.split('').map((c) =>
    // eslint-disable-next-line no-eval
    (c in htmlEncodeChars) ? htmlEncodeChars[c] : (<>{c}</>)
  );
}



interface DelayTextProps extends Omit<DelayComponentProps, 'children'> {
  text: string;
  key?: React.Key | null;
}


function DelayText(props: DelayTextProps): JSX.Element {
  const { key, className, text, delay, ...delayProps } = props
  return (
    <span className={className} key={key}>
      {(() => text.split("").map((char, i) => (
        <DelayComponent key={i} delay={delay * i} {...delayProps}>
          {htmlEncode(char)}
        </DelayComponent>
      )))()}
    </span>
  )
}

export { DelayText };
export default DelayText;