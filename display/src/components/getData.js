import * as d3 from 'd3';


let cl = '/schools.csv'
export const getColleges = 
  d3.csv(cl, (d) => {
    return {
      'id':  +d.UNITID,
      'name':  d.INSTNM,
      'city':  d.CITY,
      'state':  d.STABBR,
      'zip':  d.ZIP,
      'website':  d.INSTURL,
      'size':  +d.UGDS,
      'lat':  +d.LATITUDE,
      'lon':  +d.LONGITUDE,
      'admit_rate':  +d.ADM_RATE,
      'high_deg':  +d.HIGHDEG,
      'control':  +d.CONTROL,
      'ccbasic':  +d.CCBASIC,
      'ccugprof':  +d.CCUGPROF,
      'ccsizset':  +d.CCSIZSET,
      'tribal':  +d.TRIBAL,
      'nanti':  +d.NANTI,
      'ugds_aian':  +d.UGDS_AIAN,
      'ug_aianold':  +d.UG_AIANOLD,
      'territories':  JSON.parse(d.territories)
    }
  })
  .then(data => {
    let colleges = data;
    let d = {};
    for(let i = 0; i < colleges.length; i++) {
      d[colleges[i].id] = colleges[i];
    }
    return {
      colleges: colleges,
      map: d,
    }
  });

let vl = '/variables.json'
export const getVariables = 
  d3.json(vl)
  .then(data => {
    let d = {};
    d['id'] = data.UNITID;
    d['name'] = data.INSTNM; 
    d['city'] = data.CITY; 
    d['state'] = data.STABBR;
    d['zip'] = data.ZIP; 
    d['website'] = data.INSTURL; 
    d['size'] = data.UGDS;
    d['lat'] = data.LATITUDE; 
    d['lon'] = data.LONGITUDE;
    d['admit_rate'] = data.ADM_RATE;
    d['high_deg'] = data.HIGHDEG; 
    d['control'] = data.CONTROL;
    d['ccbasic'] = data.CCBASIC;
    d['ccugprof'] = data.CCUGPROF;
    d['ccsizset'] = data.CCSIZSET;
    d['tribal'] = data.TRIBAL;
    d['nanti'] = data.NANTI;
    d['ugds_aian'] = data.UGDS_AIAN;
    d['ug_aianold'] = data.UG_AIANOLD;
    return d;
  })

let tl = '/territories.geojson'
export const getTerritories = 
  d3.json(tl)
  .then(data => {
    let fs = data.features;
    let map = {};

    for(let i = 0; i < fs.length; i++) {
      map[fs[i].id] = fs[i];
    }
    return {
      territories:data,
      map:map,
    }
  });

  /*
module.exports = {
  getColleges: getColleges,
  getTerritories: getTerritories,
}*/
