import style from './styles.module.scss';
import usePreload from './usePreload';
import AppHeader from './Header';
import FormAsis from '../components/FormAsis';

function App() {

  usePreload();

  return (
    <div className={style.App}>
      <AppHeader />
      <FormAsis />
    </div>
  );
}

export { App };
export default App;
