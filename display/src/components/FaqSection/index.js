import React, {Component, Fragment} from 'react';
import * as ui from 'semantic-ui-react';

let Qdata = (props) => {
  return (
    <Fragment>
      <ui.Header>Where does the data come from?</ui.Header>
      <p>
        All information and data regarding universities comes from 
        <a href="https://collegescorecard.ed.gov/data/"> College Scorecard</a>,
        which is an intiative started by the U.S. Department of Education that 
        provides a ton of demographic, statistical, and organizational information
        for all US colleges and universities. Specifically, I used the "MERGED2015_16_PP.csv"
        file that came from the "Download All Data" button.
      </p>
      <p>
        All information and data regarding Native American lands and territories comes from
        <a href="https://native-land.ca/"> Native Land</a>, which is volunteer-led 
        website from Victor G Temprano that aims to track all territories, languages, 
        and treaties that dealt with Native American Tribes. 
      </p>
      <p>
        Note that the data about universities may be out of date (mostly 2015 data), 
        and that information regarding territory geography is subject to geographical, 
        cultural, and political biases of historical records, Native Lands, and myself.
      </p>
    </Fragment>
  )
}
let Qmissing = (props) => {
  return (
    <Fragment>
      <ui.Header>Why is my college missing?</ui.Header>
      <p>Only colleges that passed the following criteria show up on this tool:</p>
      <ui.List as='ul'>
        <li>Inside the US (or at least on <a href="https://collegescorecard.ed.gov">College Scorecard</a>)</li>
        <li>Universities with more than 1800 students</li>
        <li>Public/Non-profit private schools (no for-profit universities)</li>
        <li>Predominantly-Bachelors serving institution (mainly undergraduate)</li>
        <li>In-person college (no online universities)</li>
        <li>Institutions that had location data available (longitude/latitude)</li>
      </ui.List>
      <p>
        Think there's a problem, or think your school should be here? Send me a message on twitter 
         <a href="https://twitter.com/asg_027"> @asg_027</a>!
      </p>
    </Fragment>

  )
}
let Qhow = (props) => {
  return (
    <Fragment>
      <ui.Header>How did you link together colleges and these native lands?</ui.Header>
      <p>
        With the College Scorecard data, we can get exact longtitude/latitude coordinates
        of a given university. With the Native Lands data, we can get geographical
        data of each native territory in the form of a <a href="https://en.wikipedia.org/wiki/GeoJSON">GeoJSON object</a>.
        I wrote a <a href="https://github.com/asg017/native-lands-colleges/blob/master/output/query.py">python script </a>
        that would exhaustively check every single university and see if it laid
        within every single native territory. By the end, we would have a list of
        all native lands a singular university exists on as well as every single
        university that exists in one specific land.
      </p>
    </Fragment>
  )
}
let Qtech = (props) => {
  return (
    <Fragment>
      <ui.Header>What tools/programming languages did you use to make this?</ui.Header>
      <p>
        <b>To compile the data</b>: Python. Read in the appropriate csv/geojson
        files, then used <a href="https://pandas.pydata.org/">Pandas</a> and 
        <a href="https://github.com/Toblerity/Shapely">Shapely</a> for data handling/geolocation needs.

      </p>

      <p>
        <b>To present the data</b>: React (JavaScript/HTML/CSS). Semantic UI 
        for most of the UI look, Leaflet for the maps, React Tables for the tables.
      </p>
    </Fragment>
  )
}
let Qbroke = (props) => {
  return (
    <Fragment>
      <ui.Header>Something broke/I have a request</ui.Header>
      <p>Feel free to PM me on twitter
        <a href="https://twitter.com/asg_027"> @asg_027</a> or send me a message on Facebook!
      </p>
    </Fragment>
  )
}
let Questions = (props) => {
  return (
    <ui.Segment style={{paddingLeft: '10%', paddingRight:'10%'}}>
      <ui.Header as='h2'>Frequently Asked Questions</ui.Header>
      <Qdata/>
      <Qmissing/>
      <Qhow/>
      <Qtech/>
      <Qbroke/>
    </ui.Segment>
  )
}
export default class FaqSection extends Component {
  render() {
    return (
      <ui.Grid style={{paddingLeft: '10%', paddingRight:'10%'}}>
        <ui.Grid.Row>
          <Questions/>
        </ui.Grid.Row>
      </ui.Grid>
    )
  };
}
