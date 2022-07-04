import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';

function Detalle({
    paciente,
    handleEdit,
    handleEliminar,
}) {
  const fechaInicio = moment(paciente.get('start_date'), 'YYYY-MM-DDTHH:mm').local().format('DD-MM-YY, hh:mm a');
  const fechaTermino = moment(paciente.get('end_date'), 'YYYY-MM-DDTHH:mm').local().format('DD-MM-YY, hh:mm a');

  console.log(fechaInicio);
    return (
      <div className="detalle-cita">
        <img style={{justifySelf: "center"}} src="/static/img/default-profile.png" alt="nombre" className="rounded-circle" width="70px" />
        <div>
          <div className="acttions">
            {
              !paciente.get('done') && (
                <Fragment>
                  <a href="#" onClick={handleEdit} style={{textDecoration: "underline"}}>
                    Editar cita
                  </a>
                  <a href="#" onClick={handleEliminar} style={{textDecoration: "underline"}}>
                    Eliminar cita
                  </a>
                </Fragment>
              )
            }
          </div>
          <br/>
          <b>Paciente:</b> {paciente.get('patient')}<br/>
          <b>Fecha cita:</b> {fechaInicio}<br/>
          <b>Termino de cita:</b> {fechaTermino}<br/>
          <b>Especialidad:</b> {paciente.get('event_type')}
        </div>
      </div>
    );
}
Detalle.propTypes = {
  paciente: PropTypes.object,
};
Detalle.defaultProps = {
  paciente: {},
};
export default Detalle;
