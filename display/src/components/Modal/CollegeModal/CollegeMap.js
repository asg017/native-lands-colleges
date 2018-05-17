import React, {Component} from 'react';
import { 
  Map, 
  Marker, 
  TileLayer,
  GeoJSON,
} from 'react-leaflet';
import { geoPath} from 'd3-geo';
import {schemeCategory10} from 'd3-scale-chromatic';
import * as ui from 'semantic-ui-react';

export default class CollegeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    let college = this.props.college;
    let territories = this.props.college.territories;
    let center = [college.lat, college.lon];
    let path = geoPath();
    let bound = territories.reduce((a,c) => {
      let currBBound = path.bounds(c);
      a[0][0] = (currBBound[0][0] < a[0][0]) ? currBBound[0][0] : a[0][0];
      a[0][1] = (currBBound[0][1] < a[0][1]) ? currBBound[0][1] : a[0][1];
      a[1][0] = (currBBound[1][0] > a[1][0]) ? currBBound[1][0] : a[1][0];
      a[1][1] = (currBBound[1][1] > a[1][1]) ? currBBound[1][1] : a[1][1];
      return a;
    }, [[999,999],[-999,-999]]);
    bound[0].reverse();
    bound[1].reverse();
    for(let i=0; i < territories.length; i++) {
      territories[i].cmapColor = schemeCategory10[i%10];
    }


    return (
      <div style={{width:'100%'}}>
        <Map bounds={bound} style={{height: '500px'}}>
          <TileLayer
            url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}@2x.png"
            attribution="Wikimedia maps beta | &copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          />
          <Marker position={center} radius={500}/>
          <GeoJSON 
            data={territories} 
            onEachFeature={ (f,l) => {
              if (f.properties && f.properties.Name) {
                l.bindPopup(`<b>${f.properties.Name}</b>`);
              }
            }}
            style={(f) => {
            return {
              fillColor: f.cmapColor,
              color: f.cmapColor,
            };
            }}/>

        <ui.Header as='h3'>Map</ui.Header>
      </Map>
      <Legend territories={territories}/>
    </div>
    );
  };
  componentDidMount() {

  }
}
class Legend extends Component {
  render() {
    let territories = this.props.territories
    return (
      <ui.Segment style={{width:'100%'}}>
        {territories.map( (t) => {
          return (
            <ui.Label 
              key={t.id} 
              style={{backgroundColor: t.cmapColor, color:'#fff', cursor:'pointer'}}
              onClick={(e) => {}}
            >
              {t.properties.Name}
            </ui.Label>
          );
        })}
      </ui.Segment>
    );
  };
}
