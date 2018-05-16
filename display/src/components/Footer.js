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
            icon={<Icon name="github square"/>}
            href="https://github.com/asg017/native-lands-colleges/">
          </Button>
          <Button 
            circular={true} 
            as='a' 
            icon={<Icon name="twitter"/>}
            color="twitter"
            href="https://twitter.com/asg_027">
          </Button>
          <span style={{paddingTop:'8px'}}> Made with GitHub Pages | <a href="http://iamprettydamn.cool">Alex Garcia</a></span>
        </Grid>
      </div>
    )
  }
}
