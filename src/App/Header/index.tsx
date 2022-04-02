import appStyle from '../styles.module.scss';
import style from './styles.module.scss';
import DelayText from '../../components/DelayText';

function AppHeader() {

  const titulo = `Estas invitado al cumpleaños de ${process.env.REACT_APP_C_NOMBRE || "[nombre]"}`

  return (
    <div className={style.Header}>
      <h1 className={appStyle.title + ' ' + style.title}>
        {titulo.split(' ').map((linea, i) => (
          <DelayText
            animationInDuration={1000}
            className={style.titleLine}
            animationIn="zoomInDown"
            animationOut="fadeOut"
            animateOnMount={false}
            text={linea}
            key={i}
            delay={100} />
        ))}
      </h1>
    </div>
  );
}

export { AppHeader };
export default AppHeader;