import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HomeLayout from '../components/homeLayout';
import { citas, getPatient, editAppoinment } from '../../store/actions/homeAction';
import { closeModal, openModal } from '../../store/actions/generalsAction';
import ReactComponent from '../../components/componentName/containers/ComponentName';
import ModalContainer from '../../components/modal/containers/modal';
import Modal from '../../components/modal/components/modal';
import saveInput from '../../store/actions/generalsAction';


class Home extends React.Component {

  constructor(props) {
    super(props);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.state = {};
  }
  handleCloseModal() {
    const { _closeModal } = this.props;
    _closeModal();
  }
  handleOpenModal() {
    const { _openModal } = this.props;
    _openModal();
  }
  componentDidMount() {
    const { history } = this.props;
  }
  handleEventClick(clickInfo) {
    const { _openModal, _getPatient} = this.props;
    _getPatient(clickInfo.event.id);
    _openModal('detalle');
  }
  render() {
    const { modal, list } = this.props;
      return (
        <HomeLayout>
          <Fragment>
            <ReactComponent/>
            {
            modal.get('visibility') &&
            <ModalContainer>
              <Modal
                handleClick={this.handleCloseModal}
                action={modal.get('action')}
                fullScreen={true}
              >
                <ReactComponent/>
              </Modal>
            </ModalContainer>
          }
         </Fragment>
        </HomeLayout>
      );
  }
}


Home.propTypes = {
  _closeModal: PropTypes.func.isRequired,
  _openModal: PropTypes.func.isRequired,
  _getPatient: PropTypes.func.isRequired,
  _citas: PropTypes.func.isRequired,
  _saveInput: PropTypes.func.isRequired,
  list: PropTypes.object,
};
Home.defaultProps = {
  lis: {}
};
const mapStateToProps = (state) => {
  const modal = state.get('modal');
  const list = state.get('general').get('list');
  return {
    modal,
    list,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    _citas(item) {
      dispatch(citas(item));
    },
    _closeModal() {
      dispatch(closeModal());
    },
    _openModal(type) {
      dispatch(openModal(type));
    },
    _saveInput(name, value) {
      dispatch(saveInput(name, value));
    },
    _getPatient(id) {
      dispatch(getPatient(id));
    },
    _editAppoinment(data, token, id) {
      dispatch(editAppoinment(data, token, id));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
