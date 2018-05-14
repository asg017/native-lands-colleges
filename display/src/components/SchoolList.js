import * as d3 from 'd3';
import React from 'react';
import * as ui from 'semantic-ui-react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import 'semantic-ui-css/semantic.min.css';
import matchSorter from 'match-sorter';

class Rendered extends React.Component {
  render() {
    let schools_map = this.props.schools_map;

    const columns = [{
      Header:'University',
      accessor: 'name',
      filterMethod: (filter, rows) => {
        return matchSorter(rows, filter.value, {'keys':['name']})

      },
      filterAll:true,
      minWidth: 150,

    },
      {
        Header: 'Territories',
        accessor: (s) => s.territories.length,
        id: 'percent_natt',
        width:100,
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
        width:75
      },
      {
        Header: props => (<span>% Native American<ui.Icon name='question'/></span>),
        accessor: (s) => d3.format('.02%')(s.ugds_aian),
        id: 'percent_na',
        minWidth:100,
      },
    ]
    let table = (
      <ReactTable
        data={this.props.schools}
        filterable
        columns={columns}
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: (e,orig) => {
              console.log('state',state, 'row',rowInfo, 'column',column, 'instance',instance, 'e',e);
              console.log(this.props);
              let college = rowInfo.original;
              for(let i = 0; i < college.territories.length; i++) {
                college.territories[i] = this.props.territoriesMap[college.territories[i].id];
              }
              console.log(college);
              college.modalType = 'college';
              this.props.updateModal(college);
            },

            onMouseEnter: (e,orig) => {
            },
            onMouseLeave: (e,orig) => {
            },
          }
        }}
      />
    )

    return table;

  }
}
export class SchoolList extends React.Component {

  constructor(props) {
    super(props);
  };

  render(p) {
    if (this.props.data.loading) {
      return (
        <div>
          loading...
        </div>
      )
    }
    else {
      return (
        <div>
          <Rendered 
            schools={this.props.data} 
            territoriesMap={this.props.territoriesMap} 
            updateModal={this.props.updateModal}/>
        </div>
      )
    }
  }


}

