import React, {Component} from 'react';
import {Icon, Grid, Button} from 'semantic-ui-react';

let style = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  height: '50px',
  backgroundColor: '#444',
  color: 'white',
  textAlign: 'center',
}

export default class Footer extends Component {
  render() {
    return (
      <div style={style}>
        <Grid columns={1} centered={true} style={{marginTop:'.5em'}}>
          <Button 
            circular={true} 
            as='a' 
            target="_blank"
            icon={<Icon name="github square"/>}
            href="https://github.com/asg017/native-lands-colleges/">
          </Button>
          <Button 
            circular={true} 
            as='a' 
            target="_blank"
            icon={<Icon name="twitter"/>}
            color="twitter"
            href="https://twitter.com/asg_027">
          </Button>
          <span style={{paddingTop:'8px'}}> Made with GitHub Pages | 
            <a rel="noopener noreferrer" target="_blank" href="http://iamprettydamn.cool" style={{fontWeight: 1000, color:'white', textDecoration:'underline'}}>Alex Garcia</a></span>
        </Grid>
      </div>
    )
  }
}
