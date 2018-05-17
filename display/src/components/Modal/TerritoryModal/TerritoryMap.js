import React, {Component} from 'react';
import { 
  Map, 
  Marker, 
  Tooltip,
  TileLayer,
  GeoJSON,
  LayersControl,
  FeatureGroup,
} from 'react-leaflet';
import { geoPath} from 'd3-geo';
import {schemeCategory10} from 'd3-scale-chromatic';
import * as ui from 'semantic-ui-react';

export default class TerritoryMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    let territory = this.props.territory;
    let colleges = territory.properties.colleges;
    for(let i=0; i < colleges.length; i++) {
      colleges[i].cmapColor = schemeCategory10[i%10];
    }
    let path = geoPath();
    let bound = path.bounds(territory);
    bound[0].reverse();
    bound[1].reverse();
    return (
      <div style={{width:'100%'}}>
        <ui.Header as='h3'>Map</ui.Header>
        <Map bounds={bound} style={{height: '500px'}}>
          <TileLayer
            url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}@2x.png"
            attribution="Wikimedia maps beta | &copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          />
          <LayersControl position="bottomright">
            <LayersControl.Overlay name={`Universities (${colleges.length})`} checked={true}>
              <FeatureGroup>
              {colleges.map( (c) => {
                let pos = [c.lat, c.lon];
                return (
                  <Marker 
                  position={pos}
                  key={c.name}>
                    <Tooltip>
                      <span>{c.name}</span>
                    </Tooltip>
                  </Marker>
                )
              })}
            </FeatureGroup>
            </LayersControl.Overlay>

            <LayersControl.Overlay name={territory.properties.Name} checked={true}>
              <GeoJSON data={territory}/>
            </LayersControl.Overlay>
          </LayersControl>


      </Map>
      <ui.Segment>
        <CollegesList colleges={colleges}/>
      </ui.Segment>

    </div>
    );
  };
  componentDidMount() {

  }
}

class CollegesList extends Component {
  render() {
    let colleges = this.props.colleges;
    return (
      <React.Fragment>
        <ul>
          { colleges.map( (c,i) => <li key={`${c.name}`}>{c.name} - {c.city}, {c.state}</li>) }
        </ul>
      </React.Fragment>
    )
  }
}
