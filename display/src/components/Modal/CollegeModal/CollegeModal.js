import React from 'react';
import * as ui from 'semantic-ui-react';
import CollegeMap from './CollegeMap.js';

export default class CollegeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen : true,
    }

    this.getVariableValue = (val, col) => {
      return this.props.variables[val]['' + col[val]];
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({isOpen:true});
  };

  render() {
    let college = this.props.college;
    let x = (
      <div
        id={'asdf'} 
      >
        <ui.Modal 
          open={this.state.isOpen}
          style={{marginTop: '20px!important',
            marginLeft: 'auto',
            marginRight: 'auto'}}
            onClose={(e1,e2)=>{this.setState({isOpen:false}); return false;}}
            closeIcon={true}
          >
            <ui.Modal.Header>{college.name}</ui.Modal.Header>
            
            <ui.Modal.Content>
              <ui.Modal.Description>

                <ui.Header.Subheader>
                  {college.city + ', ' + college.state + ' ' + college.zip}
                </ui.Header.Subheader>    
                <ui.Header.Subheader as='a' href={college.website}>
                  {college.website}
                </ui.Header.Subheader>
                
                <div>
                <ui.Label>
                  {this.getVariableValue('control', college)}
                </ui.Label>
                <br/>
                <ui.Label.Group>
                  {this.getVariableValue('ccugprof', college).split(',').map((v) =>  {
                    return <ui.Label key={v}>
                      {v}
                    </ui.Label>
                  })}
                </ui.Label.Group>
              </div>
            </ui.Modal.Description>

            <div id="college-map">
              <CollegeMap college={college}/>
            </div>
            </ui.Modal.Content>
          </ui.Modal>
        </div>
       )
  return x;
  }
}
