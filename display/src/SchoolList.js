import * as d3 from 'd3';
import React from 'react';
import * as ui from 'semantic-ui-react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import 'semantic-ui-css/semantic.min.css';

//data
class TerritoryCell extends React.Component {
  render() {
    return (
      <div>
        {this.props.data.territories.map((t) => {
          return (<ui.Label>
            {t['name']}
          </ui.Label>)
        })}
      </div>
    )
  }
}
export class SchoolList extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      table: [],
    }
  }
  render() {
    if (this.state.loading) {
      return (
        <div>
          loading...
        </div>
      )
    }
    else {
      return (
        <div>
          {this.state.table}
        </div>
      )
    }
  }
  componentDidMount() {

    let schools;
    let l = '/schools.csv'
    d3.csv(l, (d) => {
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
    }).then((schools) => {

      const columns = [{
          Header:'University',
          accessor: 'name',
      },
        {
          Header:'Size',
          accessor: (s) => d3.format(',')(s.size),
          sortMethod: (a,b) => {
            a = Number(a.replace(',',''))
            b = Number(b.replace(',',''))
            return a - b;
          },
          id: 'size_ca',
        },
        {
          Header: props => (<span>% Native American<ui.Icon name='question'/></span>),
          accessor: (s) => d3.format('.02%')(s.ugds_aian),
          id: 'percent_na',
        },
        {
          Header: 'Territories',
          accessor: (s) => <TerritoryCell data={s}/>,
          id: 'percent_natt',
        },
      ]

      let table = (
        <ReactTable
          data={schools}
          columns={columns}
        />
      )

      this.setState({table:table, loading:false});
    })

  }

}

