import React from 'react';
import './modal.styl';

function Modal(props) {
  const style = props.action === 'detalle' ? {width: "45vw", height: "35vh"} : {};
  const styleHeader = props.action === 'detalle' ? {
    gridTemplateColumns: "90% 10%",
    width: "100%",
    alignItems: "center"
  } : {};
  const styleButtonClose = props.action === 'detalle' ? {position: "relative"} : {};
  const styleBody = props.action === 'agregar' ? {width: "100%", height: "100%"} : {width: "100%"};
  const titulo = props.action === 'agregar' ? 'Agregar Cita' : 'Detalle Cita';
  return (
    <section id="modal-container-layout">
      <div className="Modal" style={style}>
        <section className="header-modal" style={styleHeader}>
          <h1>{titulo}</h1>
          <button
            onClick={props.handleClick}
            className="Modal-close"
            style={styleButtonClose}
            />
        </section>
        <section className="body-modal" style={styleBody}>
          {props.children}
        </section>

      </div>
    </section>
  )
}

export default Modal;
