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

export const getTerritories = () => {}

  /*
module.exports = {
  getColleges: getColleges,
  getTerritories: getTerritories,
}*/
