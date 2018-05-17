import * as d3 from 'd3';
import React from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import 'semantic-ui-css/semantic.min.css';
import matchSorter from 'match-sorter';

class Rendered extends React.Component {
  render() {

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
        id: 'num_terr',
        defaultSortDesc: true,
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
        Header: '% Native American',
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
        style={{cursor:'pointer'}}
        defaultSorted={[ {'id': 'num_terr', desc:true} ]}
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: (e,orig) => {
              let college = rowInfo.original;
              for(let i = 0; i < college.territories.length; i++) {
                college.territories[i] = this.props.territoriesMap[college.territories[i].id];
              }
              college.modalType = 'college';
              this.props.updateModal(college);
            },
          }
        }}
      />
    )

    return table;

  }
}
export class SchoolList extends React.Component {

  render() {
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

