import React, {Component} from 'react';
import ModalContext from '../ModalContext.js';
import * as ui from 'semantic-ui-react';
import * as d3 from 'd3';
import CollegeModal from './CollegeModal';
import TerritoryModal from './TerritoryModal';


export default class Modal extends React.Component {
  render() {
    return (
      <ModalContext.Consumer>
        { (modal) => {

          console.log('modal', modal)
          
          if (!modal) {
            return null;
          }

          if (modal.modalType === 'college') {
            console.log('returning college modal...');
            return <CollegeModal college={modal} variables={this.props.variables}/>;
          }
          else 
            return <TerritoryModal territory={modal} />;
        }}
      </ModalContext.Consumer>
    )
  }
}
