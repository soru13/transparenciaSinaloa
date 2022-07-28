import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyResponsivePie from '../../dataviz/chart';
import MyResponsiveScatterPlot from '../../dataviz/scatterPlot';
import { data } from '../../../data/programaSocialAprovado';

import {
    getSpecialist,
    getPatientlist,
    newDateAppoinment,
    editAppoinment,
    eliminarCita
} from '../../../store/actions/homeAction';
import { openModal } from '../../../store/actions/generalsAction';
import ReactLayout from '../components/reactLayout';

class ReactComponent extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
      this.handleEliminar = this.handleEliminar.bind(this);
      this.state = {};
    }

    componentDidMount() {
    }

    handleEliminar(event){
        debugger;
        event.preventDefault();
        const { _eliminarCita, paciente } = this.props;
        if (confirm(`¿Estas ceguro de querer eliminar la cita con '${paciente.get('patient')}'?`)) {
            const token = document.getElementsByName("csrfmiddlewaretoken");
            _eliminarCita(token[0].value, paciente.get('id'));
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        const {
            start_date,
            end_date,
            event_type,
            patient,
            _newDateAppoinment,
            _editAppoinment,
            modal,
            paciente,
        }  = this.props;
        const username = document.getElementById('username');
        const token = document.getElementsByName("csrfmiddlewaretoken");
        const data = {
            "start_date": start_date,
            "end_date": end_date,
            "patient": `http://localhost/api/pacientes/${patient}/`,
            "event_type": `http://localhost/api/especialidades/${event_type}/`,
            "usuario_registro": `http://localhost/api/usuarios/${username.getAttribute("title")}/`
        }
        if (modal.get('action') === 'aditar') {
            _editAppoinment(data, token[0].value, paciente.get('id'));
        } else {
            _newDateAppoinment(data, token[0].value);
        }
    }
    handleEdit(event) {
        event.preventDefault();
        const { _openModal, paciente, _saveInput } = this.props;
        _openModal('aditar');
    }

    render() {
        const {
            start_date,
            end_date,
            event_type,
            patient,
            pacientes,
            especialistas,
            modal,
            paciente,
        }  = this.props;
        let buttonEnable = true;
        if (
            start_date.length>0 &&
            end_date.length>0 &&
            event_type.length>0 &&
            patient.length>0
        ) {
          buttonEnable  = false;
        }
        return (
            <ReactLayout>
                <Fragment>
                    <section className='item' id="introduccion">
                            <h1>Introducción</h1>
                            <p>
                                Entre una gran cantidad de herramientas y de scripts en <b>Python</b> para regitrar <b>51,431</b> de aquisiciones y <b>3,294,215</b> en programas sociales en Sinaloa
                                con el objetivo de aportar juicios de valor sobre el estado y la calidad de transparencia y corrupción en el estado de sinaloa, de facilitar visualmente.
                            </p>
                    </section>
                    <section className='item' id="programasSociales">
                        <div className='item__header'>
                            <p>
                                Se análizan <b>15</b> programas sociales de los <b>146</b> que tenemos listado.
                            </p>
                            <b>Gráfica de pastel con la cantidad de beneficiarios.</b>
                        </div>
                    <div className='nivo'>
                            <MyResponsivePie data={data.programas_sociales}/>
                    </div>
                    </section>
                    <section className='item' id="porEjercicio">
                        <div className='item__header'>
                            <p>Con ($) monto y programa social, con un total <b>$9,784,684,519.64</b> MXN.</p>
                        </div>
                        <div className='nivo'>
                            <MyResponsivePie data={data.programas_sociales_importes}/>
                        </div>
                    </section>
                    <section className='item' id="tablaMontoProgramas">
                        <div className='item__header'>
                            <p>Por ejercicio Gráfica <b>Tabla</b>, con ($) monto y programa social, con un total <b>$9,784,684,519.64</b> MXN.</p>
                        </div>
                        <div className='table'>
                            <table>
                            <tr>
                                <th>Programa</th>
                                <th>Ejercicio</th>
                                <th>Importe</th>
                            </tr>
                                {
                                    data.programas_sociales_importes_ejercicio.map(item => {
                                        return (
                                            <Fragment>
                                            <tr>
                                                <td>{item.programa_social}</td>
                                                <td>{item.ejercicio}</td>
                                                <td>{item.importe}</td>
                                            </tr>
                                            <tr><td></td></tr>
                                            </Fragment>
                                        )
                                    })
                                }
                            </table>
                        </div>
                    </section>
                    <section className='item' id='educacionBasicaBenitoJuarez'>
                        <div className='item__header'>
                            <p>
                                Como dato la Secretaria de Educación tiene como registro <b>521,520</b> estudiantes de eduación básica, según el portal <a href="http://planeacion.sep.gob.mx/Doc/estadistica_e_indicadores/estadistica_e_indicadores_entidad_federativa/estadistica_e_indicadores_educativos_25SIN.pdf" target="_blank">Estadística educativa Sinaloa Ciclo escolar 2020-2021</a>.
                            </p>
                            <span>Aplicamos regla de 3: 76,573*100/521,520 = ímpacto <b>14.68%</b></span>
                            <br/> Programa de Becas de Educación Básica para el Bienestar Benito Juárez <strong>Top 100</strong> 
                        </div>
                        <div className='table'>
                            <table>
                            <tr>
                                <th>Programa</th>
                                <th>Cantidad de depostios</th>
                                <th>Importe / suma</th>
                            </tr>
                                {
                                    data.programas_sociales_educacion_basica.map(item => {
                                        return (
                                            <Fragment>
                                            <tr>
                                                <td>{item.names} {item.last_name} {item.surname}</td>
                                                <td>{item.count}</td>
                                                <td>${item.sum}</td>
                                            </tr>
                                            <tr><td></td></tr>
                                            </Fragment>
                                        )
                                    })
                                }
                            </table>
                        </div>
                    </section>
                    <section className='item' id='educacionSuperiorBenitoJuarez'>
                        <div className='item__header'>
                            <p>
                                Como dato la Secretaria de Educación tiene como registro <b>123,794</b> estudiantes de eduación media superior, según el portal <a href="http://planeacion.sep.gob.mx/Doc/estadistica_e_indicadores/estadistica_e_indicadores_entidad_federativa/estadistica_e_indicadores_educativos_25SIN.pdf" target="_blank">Estadística educativa Sinaloa Ciclo escolar 2020-2021</a>.
                            </p>
                            hay un registro llamado "MENOR MENOR MENOR" que suma de importe $586,979,200 <br></br>
                            <span>Aplicamos regla de 3: 123,555*100/123,794 = ímpacto <b>99.80%</b></span>
                            <br/> Programa de Becas de Educación Media Superior para el Bienestar Benito Juárez <strong>Top 100</strong> 
                        </div>
                        <div className='table'>
                            <table>
                            <tr>
                                <th>Programa</th>
                                <th>Cantidad de depositos</th>
                                <th>Importe / suma</th>
                            </tr>
                                {
                                    data.programas_sociales_educacion_superior.map(item => {
                                        return (
                                            <Fragment>
                                            <tr>
                                                <td>{item.names} {item.last_name} {item.surname}</td>
                                                <td>{item.count}</td>
                                                <td>${item.sum}</td>
                                            </tr>
                                            <tr><td></td></tr>
                                            </Fragment>
                                        )
                                    })
                                }
                            </table>
                        </div>
                    </section>
                    <section className='item' id='AdultosMayores'>
                        <div className='item__header'>
                            <p>
                                Pensión para el Bienestar de las Personas Adultas Mayores.
                            </p>
                            <span>Cantidad de beneficiarios <b>215,555</b></span> <br/>
                            Habría que investigar en la página del INEGI cuantas personas son de 68 años en adelante
                            <br/><strong>Top 100</strong> 
                        </div>
                        <div className='table'>
                            <table>
                            <tr>
                                <th>Programa</th>
                                <th>Cantidad de depositos</th>
                                <th>Importe / suma</th>
                            </tr>
                                {
                                    data.adultos_mayores.map(item => {
                                        return (
                                            <Fragment>
                                            <tr>
                                                <td>{item.names} {item.last_name} {item.surname}</td>
                                                <td>{item.count}</td>
                                                <td>${item.sum}</td>
                                            </tr>
                                            <tr><td></td></tr>
                                            </Fragment>
                                        )
                                    })
                                }
                            </table>
                        </div>
                    </section>
                    <section className='item' id='jovenesconstruyendo'>
                        <div className='item__header'>
                            <p>
                                Jóvenes Construyendo el Futuro "ninis".
                            </p>
                            <span>Cantidad de beneficiarios <b>4,977</b></span> <br/>
                            personas de entre 18 y 29, faltaría ver cuantos hay en Sinaloa.
                            <br/><strong>Top 100</strong> 
                        </div>
                        <div className='table'>
                            <table>
                            <tr>
                                <th>Programa</th>
                                <th>Cantidad de depositos</th>
                                <th>Importe / suma</th>
                            </tr>
                                {
                                    data.jovenesConstruyendo.map(item => {
                                        return (
                                            <Fragment>
                                            <tr>
                                                <td>{item.names} {item.last_name} {item.surname}</td>
                                                <td>{item.count}</td>
                                                <td>${item.sum}</td>
                                            </tr>
                                            <tr><td></td></tr>
                                            </Fragment>
                                        )
                                    })
                                }
                            </table>
                        </div>
                    </section>
                    <section className='item' id='jovenesEscribiendo'>
                        <div className='item__header'>
                            <p>
                                Jóvenes Escribiendo el Futuro.
                            </p>
                            <span>Cantidad de beneficiarios <b>25,420</b></span> <br/>
                            Para universitarios eduación pública.
                            <br/><strong>Top 100</strong> 
                        </div>
                        <div className='table'>
                            <table>
                            <tr>
                                <th>Programa</th>
                                <th>Cantidad de depositos</th>
                                <th>Importe / suma</th>
                            </tr>
                                {
                                    data.jovenesEscribiendo.map(item => {
                                        return (
                                            <Fragment>
                                            <tr>
                                                <td>{item.names} {item.last_name} {item.surname}</td>
                                                <td>{item.count}</td>
                                                <td>${item.sum}</td>
                                            </tr>
                                            <tr><td></td></tr>
                                            </Fragment>
                                        )
                                    })
                                }
                            </table>
                        </div>
                    </section>                 
                    <section className='item' id="conclusion">
                        
                    </section>
                    <section className='item' id="sobre">
                        <div class="nombre"></div>
                    </section>
                </Fragment>
            </ReactLayout>
        );
    }
}

ReactComponent.propTypes = {
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    patient: PropTypes.string,
    event_type: PropTypes.string,
    pacientes: PropTypes.object,
    especialistas: PropTypes.object,
    _saveInput: PropTypes.func.isRequired,
    _getSpecialits: PropTypes.func.isRequired,
    _getPatientlist: PropTypes.func.isRequired,
    _newDateAppoinment: PropTypes.func.isRequired,
    _editAppoinment: PropTypes.func.isRequired,
    _eliminarCita: PropTypes.func.isRequired,
    paciente: PropTypes.object,
};
ReactComponent.defaultProps = {
    start_date: '',
    end_date: '',
    event_type: '',
    patient: '',
    pacientes: {},
    especialistas: {},
    paciente: {},
};

const mapStateToProps = (state) => {
    const start_date = state.get('general').get('inputs').get('start_date');
    const end_date = state.get('general').get('inputs').get('end_date');
    const event_type = state.get('general').get('inputs').get('event_type');
    const patient = state.get('general').get('inputs').get('patient');
    const pacientes = state.get('general').get('pacientes') && state.get('general').get('pacientes');
    const especialistas = state.get('general').get('especialistas') && state.get('general').get('especialistas');
    const modal = state.get('modal');
    const paciente = state.get('general').get('paciente') && state.get('general').get('paciente');

    return {
        start_date,
        end_date,
        event_type,
        patient,
        pacientes,
        especialistas,
        modal,
        paciente,
    };
  };
  function mapDispatchToProps(dispatch) {
    return {
        _saveInput(name, value) {
            dispatch(saveInput(name, value));
        },
        _getSpecialits() {
            dispatch(getSpecialist());
        },
        _getPatientlist() {
            dispatch(getPatientlist());
        },
        _newDateAppoinment(data, token) {
            dispatch(newDateAppoinment(data, token));
        },
        _openModal(type) {
            dispatch(openModal(type));
        },
        _editAppoinment(data, token, id) {
            dispatch(editAppoinment(data, token, id));
        },
        _eliminarCita(token, id){
            dispatch(eliminarCita(token, id));
        }
    }
  };
  export default connect(mapStateToProps, mapDispatchToProps)(ReactComponent);
