import React from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import 'semantic-ui-css/semantic.min.css';
import matchSorter from 'match-sorter';

export class TerritoryList extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      table: [],
    }
  }
  render() {
    if (this.props.data.loading) {
      return (
        <div>
          loading...
        </div>
      )
    }
    else {
      const columns = [{ 
        Header:'Territory', 
        accessor: t => t.properties.Name,
        filterMethod: (filter, rows) => {
          return matchSorter(rows, filter.value, {'keys':['territory']}) 
        },
        filterAll:true, 
        id: 'territory',
      }, 
      {
        Header: 'Number Universities', 
        accessor: t => t.properties.colleges.length,
        'id': 'num_unis',
      }, 
      ];

      let table = (
        <ReactTable
          data={this.props.data.data} 
          filterable
          style={{cursor:'pointer'}}
          columns={columns}
          defaultSorted={[ {'id': 'num_unis', desc:true} ]}
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: (e,orig) => {
              let territory = rowInfo.original;
              for(let i = 0; i < territory.properties.colleges.length; i++) {
                territory.properties.colleges[i] = this.props.collegesMap[territory.properties.colleges[i]];
              }
              territory.modalType = 'territory';
              this.props.updateModal(territory);
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

}
