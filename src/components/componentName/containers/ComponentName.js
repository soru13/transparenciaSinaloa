import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveInput from '../../../store/actions/generalsAction';
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
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
      this.handleEliminar = this.handleEliminar.bind(this);
      this.state = {};
    }

    componentDidMount() {
    }
    handleChange(event) {
        const { _saveInput } = this.props;
        _saveInput(event.target.name, event.target.value);
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
                <div class="item">
                    <img src="#" height="35" class="d-inline-block align-top rounded-circle"/>
                    <div class="contenido">
                    </div>
                    <div class="nombre">name</div>
                </div>
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
