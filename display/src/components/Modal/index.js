import React from 'react';
import ModalContext from '../ModalContext.js';
import CollegeModal from './CollegeModal';
import TerritoryModal from './TerritoryModal';


export default class Modal extends React.Component {
  render() {
    return (
      <ModalContext.Consumer>
        { (modal) => {
          if (!modal) {
            return null;
          }

          if (modal.modalType === 'college') {
            return <CollegeModal college={modal} variables={this.props.variables}/>;
          }
          else 
            return <TerritoryModal territory={modal} />;
        }}
      </ModalContext.Consumer>
    )
  }
}
