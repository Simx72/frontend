import { Card, CardPrimaryAction, CardActions, CardActionButtons, CardActionButton as CardButton } from '@rmwc/card';
import { Button } from '@rmwc/button';
import { Typography as Text } from '@rmwc/typography';
import { Radio } from '@rmwc/radio';
import { TextField } from '@rmwc/textfield';
import DelayComponent from '../DelayComponent';
import style from './styles.module.scss'
import { useEffect, useState } from 'react';
import XHR from '../XHR';

let checking = false;

function FormAsis() {
  const [cantidad, setCantidad] = useState(1);
  const [currentCantidad, setCurrentCantidad] = useState('1');
  const [nombre, setNombre] = useState("");

  function onAsistenciaChange(evt: React.ChangeEvent<HTMLInputElement>) {
    // console.log(evt)
    setCantidad((evt.currentTarget.value === 'true') ? 1 : 0);
  }

  function personas(n: number) {
    if (0 < n && n <= 15) {
      let arr = new Array(n)
      for (let i = 0; i < arr.length; i++) {
        arr[i] = '😀'
      }
      return arr.join(" ")
    } else {
      return (<Text use='overline' className={style.error}>El numero de personas debe estar entre 0 y 15.</Text>);
    }
  }

  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    if (!checking) {
      checking = true;
      XHR({
        to: 'check',
        method: 'GET',
        body: ''
      }, (xhr, ready) => {
        if (ready) {
          setEnviado(xhr.responseText === 'true');
        }
      })
    }
  });

  let secure = (params: { [c: string]: string | number | boolean; }) => {
    for (const param in params) {
      if (typeof params[param] == 'undefined' ) {
        throw new Error("Ups, ocurrio un erro al intentar enviar la solicitud")
      }
    }
    return JSON.stringify(params);
  }

  function sendForm() {
    /* validate */
    if (nombre.length <= 0) return false;
    if (cantidad < 0 || cantidad > 15) return false;

    /* send */
    XHR({
      to: 'nuevo-invitado',
      method: 'POST',
      body: secure({ asiste: cantidad > 0, nombre, cantidad })
    }, (xhr, ready) => {
      if (ready) {
        console.log(xhr.responseText)
        setEnviado(true)
      }
    })
  }

  /* El formulario para enviar la informacion */
  const formulario = (
    <>
      <Text use='headline2' className={`${style.title} ${style.main}`}>
        Llena el formulario para confirmar tu asistencia!
        <br />
        <span className={style.iconXL}>🎊 🎊 🎊 🎊 🎊 🎊 🎊 🎊</span>
      </Text>
      <Text use='headline3' className={style.title}>
        ¿Vas a ir?
      </Text> <br />
      <Radio
        value='true'
        checked={cantidad > 0}
        onChange={onAsistenciaChange}>
        <Text use='body1'>Sii! 😁😁😁</Text>
      </Radio>
      <Radio
        value='false'
        checked={cantidad <= 0}
        onChange={onAsistenciaChange}>
        <Text use='body1'>No 😥😥</Text>
      </Radio>
      <Text use='headline3' className={style.title}>
        ¿Como te llamas?
      </Text> <br />
      <TextField type="text" outlined
        label='Nombre'
        required
        value={nombre}
        onChange={e => setNombre(e.currentTarget.value)}
      />

      {(cantidad > 0) ? (
        <>
          <Text use='headline3' className={style.title}>
            ¿Cuantas personas van a venir?
          </Text> <br />
          <TextField type="number" outlined
            required
            min={0} max={15}
            label='Cantidad'
            value={currentCantidad}
            onChange={ev => setCurrentCantidad(ev.currentTarget.value)}
            onBlur={() => {
              let c = parseInt(currentCantidad);
              setCantidad(c)
            }}
          />
          <Text use='headline3' className={style.iconXL}>
            {personas(cantidad)}
          </Text> <br />
        </>
      ) : ''}
      <Button label="Enviar" className={style.sendButton} icon={{
        strategy: 'component',
        icon: (<span className={style.sendIcon}></span>),
      }} raised onClick={() => {
        let res = sendForm();
        console.log(res)
      }} />
    </>
  );



  /* Por si ya ha enviado una respuesta antes */
  const siYaEnvio = (
    <>
      <CardPrimaryAction
        onLoad={() => XHR({ to: "check" }, (xhr, ready) => {
          if (ready) {
            setEnviado(xhr.responseText === 'true');
            // console.log(xhr, checkEnviado)
          }// console.log('check')
        })}
      >
        <Text use='headline2' className={`${style.title} ${style.main}`}>
          ¡¡Gracias por tu respuesta 😁!!
        </Text>
        <Text use='headline2' className={style.textoRes}>
          Ya has enviado este formulario, 
          si piensas que se trata de un error 
          puedes con el administrador a travez del 
          correo <a href="mailto:simar72@outlook.es">SimAR72@outlook.es</a>
        </Text>
      </CardPrimaryAction>
      <CardActions className={style.cardActions}>
        <CardActionButtons>
          <CardButton
            onClick={() => setEnviado(false)}
          >Modificar mi respuesta</CardButton>
        </CardActionButtons>
      </CardActions>

    </>
  );




  return (
    <div className={style.FormAsis}>
      <DelayComponent
        animationIn='fadeInRight'
        animationOut='slideOutLeft'
        delay={1000}
        animateOnMount={false}>
        <Card className={style.FormCard}>
          {enviado ? siYaEnvio : formulario}
        </Card>
      </DelayComponent>
    </div>
  )
}

export { FormAsis };
export default FormAsis;