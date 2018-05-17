import  React from 'react';
import ReactDOM from 'react-dom';
import * as ui from 'semantic-ui-react';
import {SchoolList} from './SchoolList.js';
import {TerritoryList} from './TerritoryList.js';
import {getColleges, getTerritories, getVariables} from './getData.js';
import ModalContext from './ModalContext.js';
import Modal from './Modal';
import MainMap from './MainMap';
import FaqSection from './FaqSection';
import Footer from './Footer.js';

import ReactGA from 'react-ga';

if(window.location.hostname !== 'localhost') {
  ReactGA.initialize('UA-119341833-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
}

let appStyles = {
  'margin': '30px 30px',
  'minWidth':'475px',
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
      
        <div style={{position:'relative', paddingBottom:'50px'}}>
        <div style={appStyles}>

          <ModalContext.Provider value={this.state.modal}>
            <Modal variables={this.state.variables.data}/>
            <ui.Header as='h1'>
              Native Lands - Colleges
            </ui.Header>

            <ui.Header.Subheader>
              Seeing which native territories different US Colleges and Universities exist on.
            </ui.Header.Subheader>
            <ui.Grid stackable={true}>

              <ui.Grid.Row>
                <MainMap/>
              </ui.Grid.Row>

              <ui.Grid.Row>

                <ui.Grid.Column width={10}>
                  <ui.Header as="h2">
                    Universities
                  </ui.Header>
                  <ui.Header.Subheader>
                    Click on a row for a more in-depth look!
                  </ui.Header.Subheader>
                  <ui.Segment>
                    <SchoolList 
                      data={this.state.schools.data}
                      territoriesMap={this.state.territories.map}
                      updateModal={this.updateModal}/>
                  </ui.Segment>
                </ui.Grid.Column>

                <ui.Grid.Column width={6}>
                  <ui.Header as="h2">
                    Territories
                  </ui.Header>
                  <ui.Header.Subheader>
                    Click on a row for a more in-depth look!
                  </ui.Header.Subheader>
                  <ui.Segment>
                    <TerritoryList 
                      data={this.state.territories} 
                      collegesMap={this.state.schools.map}
                      updateModal={this.updateModal}/>
                  </ui.Segment>
                </ui.Grid.Column>

              </ui.Grid.Row>

              <ui.Grid.Row>
                <FaqSection/>
              </ui.Grid.Row>
            </ui.Grid>
          </ModalContext.Provider>

        </div> 
          <Footer/>
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
  </div>), 
    document.getElementById('container') 
); 
