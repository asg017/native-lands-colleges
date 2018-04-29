import React from 'react';
import ReactDOM from 'react-dom';
import * as ui from 'semantic-ui-react';
import {SchoolList} from './SchoolList.js';
import {getColleges, getTerritories} from './getData.js';

let appStyles = {
  'margin': '30px 30px',
}
class App extends React.Component { 
  render() { 
    return ( 
      <div style={appStyles}>

        <ui.Header as='h2'>
          Native Lands - Colleges
        </ui.Header>

        <ui.Grid>
          <ui.Grid.Row>

            <ui.Grid.Column width={8}>
              <ui.Segment color={'olive'}>
                <SchoolList/>
              </ui.Segment>
            </ui.Grid.Column>

          </ui.Grid.Row>
        </ui.Grid>
      </div> 
    )
  };

  componentDidMount() {
    getColleges
      .then(data => this.setState({colleges:data}))
  }
}; 
ReactDOM.render (
    <App/>, 
    document.getElementById('container') 
    ); 
