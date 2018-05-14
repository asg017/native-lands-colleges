import  React from 'react';
import { createContext} from 'react';
import ReactDOM from 'react-dom';
import * as ui from 'semantic-ui-react';
import {SchoolList} from './SchoolList.js';
import {TerritoryList} from './TerritoryList.js';
import {getColleges, getTerritories, getVariables} from './getData.js';
import ModalContext from './ModalContext.js';
import Modal from './Modal';
import MainMap from './MainMap';

let appStyles = {
  'margin': '30px 30px',
}

export default class App extends React.Component { 

  constructor(props) {

    super(props);

    this.state = {
      schools: {
        loading: true,
        data: [],
        map: null,
      },
      territories: {
        loading: true,
        data: [],
        map: null,
      },
      variables: {
        data: null,
      },
      modal: undefined,
    };

    this.updateModal = (modal) => {
      this.setState({modal:modal});
    }
  };
  
  render() { 
    return ( 
      
        <div style={appStyles}>

          <ModalContext.Provider value={this.state.modal}>
            <Modal variables={this.state.variables.data}/>
            <ui.Header as='h2'>
              Native Lands - Colleges
            </ui.Header>

            <ui.Grid>

              <ui.Grid.Row>
                <MainMap/>
              </ui.Grid.Row>

              <ui.Grid.Row>

                <ui.Grid.Column width={8}>
                  <ui.Segment color={'olive'}>
                    <SchoolList 
                      data={this.state.schools.data}
                      territoriesMap={this.state.territories.map}
                      updateModal={this.updateModal}/>
                  </ui.Segment>
                </ui.Grid.Column>

                <ui.Grid.Column width={8}>
                  <ui.Segment color={'orange'}>
                    <TerritoryList 
                      data={this.state.territories} 
                      collegesMap={this.state.schools.map}
                      updateModal={this.updateModal}/>
                  </ui.Segment>
                </ui.Grid.Column>

              </ui.Grid.Row>
            </ui.Grid>
          </ModalContext.Provider>
        </div> 
    )
  };

  componentDidMount() {
    getColleges
      .then(data => this.setState({
        schools: {
          data:data.colleges, 
          loading:false,
          map:data.map
        },
      }))

    getTerritories
      .then(data => this.setState({
        territories: {
          data:data.territories.features, 
          map:data.map, 
          loading:false
        }
      }))

    getVariables
      .then(data => this.setState({variables: {data:data}}))
  }
}; 



ReactDOM.render (
  (<div>
      <App/>
      <div>
        <ModalContext.Consumer>
          { (stuff) => { console.log('%', stuff); return;} }
        </ModalContext.Consumer>
      </div>
  </div>), 
    document.getElementById('container') 
); 
