
import React, { Component } from 'react'
import { withRouter } from "react-router";
import FilterableTable from 'react-filterable-table';

class _TeamSqoud extends Component {

  componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem("loginUser"))
    if (!user) {
      this.props.history.push('/')
    }
  }
  render() {

    const data = [
      { name: "Steve", age: 27, job: "Sandwich Eater" },
      { name: "Gary", age: 35, job: "Falafeler" },
      { name: "Greg", age: 24, job: "Jelly Bean Juggler" },
      { name: "Jeb", age: 39, job: "Burrito Racer" },
      { name: "Jeff", age: 48, job: "Hot Dog Wrangler" }
    ];
    const fields = [
      { name: 'name', displayName: "Name", inputFilterable: true, sortable: true },
      { name: 'age', displayName: "Age", inputFilterable: true, exactFilterable: true, sortable: true },
      { name: 'job', displayName: "Occupation", inputFilterable: true, exactFilterable: true, sortable: true }
    ];
    return (
      <div>
        <FilterableTable
          namespace="People"
          initialSort="name"
          data={data}
          fields={fields}
          noRecordsMessage="There are no people to display"
          noFilteredRecordsMessage="No people match your filters!"
        />      </div>
    )
  }
}

export const TeamSqoud = withRouter(_TeamSqoud)
