import React, {Component} from 'react';
import {getColleges, getTerritories} from '../getData.js';
import * as ui from 'semantic-ui-react';
import {sum} from 'd3-array';

import { 
  Map, 
  Marker, 
  Popup, 
  TileLayer,
  Circle,
  GeoJSON,
  FeatureGroup,
  LayersControl
} from 'react-leaflet';


class Territories extends Component {
  constructor(props) {
    super(props);
    //this.state = {geojson:[]};
  }
  render() {
    if(this.props.geojson == null){
      return null;
    }

    return (
      <div>
        <GeoJSON data={this.props.geojson}
          style={(f) => {
            return {
              fillColor:f.properties.color,
              color:f.properties.color,
              fillOpacity: .3,
            };
          }}
          onEachFeature={(f,l) => {
            l.bindPopup(f.properties.Name);
          }}
        />
      </div>
    )
  };
}

class SchoolCircles extends Component {
  constructor(props) {
    super(props);
    this.state = {colleges:[]};
  }
  render() {
    return (
      <div>
        {this.props.colleges.map( (s,i) => {
          return (<Circle 
            key={`school-circle${i}`}
            center={[s.lat, s.lon]} 
            fillColor="pink" 
            radius={3000}>
            <Popup>
              <span>{s.name}</span>
            </Popup>
          </Circle>
          )
        })}
      </div>
    )
  };
}
export default class MainMap extends Component {
  constructor(props) {
    super(props);
    this.state = {

      schools : {
        loading: true,
        data:[],
        map:null
      },
      territories : {
        loading: true,
        geojson:null,
        map:null
      },

    };
  }

  render() {
    if(this.state.loading) {
      return 'loading...';
    }

    console.log(this.state);
    let numSchools = (this.state.schools.data) ? this.state.schools.data.length: 0;
    let numTerritories = (this.state.territories.geojson) ? this.state.territories.geojson.features.length: 0;
    let numOccupations = sum(this.state.schools.data, (s) => s.territories.length);
    let usCenter = [38.702249038932734, -102.56467401981355];
    return (
      <div style={{width:'100%'}}>

        <ui.Statistic.Group style={{marginTop:'14px'}}>
          <ui.Statistic>
            <ui.Statistic.Value>
              {numSchools}
            </ui.Statistic.Value>
            <ui.Statistic.Label>
              Universities
            </ui.Statistic.Label>
          </ui.Statistic>

          <ui.Statistic>
            <ui.Statistic.Value>
              {numTerritories}
            </ui.Statistic.Value>
            <ui.Statistic.Label>
              Territories
            </ui.Statistic.Label>
          </ui.Statistic>

          <ui.Statistic>
            <ui.Statistic.Value>
              {numOccupations}
            </ui.Statistic.Value>
            <ui.Statistic.Label>
              Occupations
            </ui.Statistic.Label>
          </ui.Statistic>
        </ui.Statistic.Group>

        <Map center={usCenter} zoom={4} style={{height: '80vh', width:'90vw'}}>
          <TileLayer
            url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}@2x.png"
            attribution="Wikimedia maps beta | &copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          />

        <LayersControl position="bottomright">

          <LayersControl.Overlay name="Territories" checked={true}>
            <FeatureGroup>
              <Territories geojson={this.state.territories.geojson}/>
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Universities" checked={true}>
            <FeatureGroup>
              <SchoolCircles colleges={this.state.schools.data}/>
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
        </Map>
      </div>
    );
  }
  componentDidMount() {
    getColleges
      .then( (data) => this.setState({schools: {
        loading: false,
        data:data.colleges,
        map:data.map
      }}))

    getTerritories
      .then( (data) => this.setState({
        territories: {
          loading: false,
          geojson: data.territories,
          map: data.map,
        }
      }))

  }
}
