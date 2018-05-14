import React, {Component} from 'react';
import {getColleges, getTerritories} from '../getData.js';
import { 
  Map, 
  Marker, 
  Popup, 
  TileLayer,
  Circle,
  GeoJSON,
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
            //console.log(f);
            return {
              fillColor:f.properties.color,
              fillOpacity: .6,
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
    let numSchools = (this.state.schools.data) ? this.state.schools.data.length: '';
    let numTerritories = (this.state.territories.geojson) ? this.state.territories.geojson.features.length: '';
    let usCenter = [38.702249038932734, -102.56467401981355];
    return (
      <div style={{width:'100%'}}>
        <p>{numSchools}</p>
        <p>{numTerritories}</p>
        <Map center={usCenter} zoom={4} style={{height: '500px'}}>
          <TileLayer
            url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}@2x.png"
            attribution="Wikimedia maps beta | &copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          />
          <SchoolCircles colleges={this.state.schools.data}/>
          <Territories geojson={this.state.territories.geojson}/>
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
