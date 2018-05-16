import React from 'react';
import * as ui from 'semantic-ui-react';
import TerritoryMap from './TerritoryMap.js';

export default class TerritoryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen : true,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isOpen:true});
  };

  render() {
    let territory = this.props.territory;
    let x = (
      <div>
        <ui.Modal 
          open={this.state.isOpen}
          style={{marginTop: '20px!important',
            marginLeft: 'auto',
            marginRight: 'auto'}}
            onClose={(e1,e2)=>{this.setState({isOpen:false}); return false;}}
            closeIcon={true}
          >
            <ui.Modal.Header>{territory.properties.Name}</ui.Modal.Header>
            
            <ui.Modal.Content>
              <ui.Modal.Description>

                <ui.Header.Subheader as='a' href={territory.properties.description}>
                  Learn More about the {territory.properties.Name} territory
                </ui.Header.Subheader>    
                <br/>

                <ui.Statistic>
                  <ui.Statistic.Value>
                    {territory.properties.colleges.length}
                  </ui.Statistic.Value>
                  <ui.Statistic.Label>
                    Colleges
                  </ui.Statistic.Label>

                </ui.Statistic>

              </ui.Modal.Description>

            <div id="territory-map">
              <TerritoryMap territory={territory}/>
            </div>
            </ui.Modal.Content>
          </ui.Modal>
        </div>
       )
  return x;
  }
}
