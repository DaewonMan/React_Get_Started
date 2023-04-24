import React, { useState, useEffect, useMemo, memo, useContext  } from 'react';
import * as Cpt from '../../components';
import { testCall } from '../../utils/utils';
import { getData, get } from '../../utils/api';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { ApiContext } from '../../App';
// import { AgGridReact } from '@ag-grid-community/react';
// import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
// import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
// import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
// import { RichSelectModule } from '@ag-grid-enterprise/rich-select';

// import '@ag-grid-community/styles/ag-grid.css';
// import '@ag-grid-community/styles/ag-theme-alpine.css';

// import { ModuleRegistry } from '@ag-grid-community/core';
// Register the required feature modules with the Grid
// ModuleRegistry.registerModules([ClientSideRowModelModule, RangeSelectionModule, RowGroupingModule, RichSelectModule]);

// import _ from 'lodash';

// const Hello = () => {
//   return (
//     <h1>Hello</h1>
//   );
// };

const MyRenderer = (params) => {
  return (
    <span className="my-renderer">
      <img src="https://d1yk6z6emsz7qy.cloudfront.net/static/images/loading.gif" className="my-spinner" />
      {params.value}
    </span>
  );
};

const Home = () => {
  const { isCallApi, setIsCallApi } = useContext(ApiContext);
  const columnDefs = useMemo(() => [
    { field: 'athlete' },
    { field: 'age'},
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
  ], []);

  // never changes, so we can use useMemo
  const defaultColDef = useMemo(() => ({
      resizable: true,
      sortable: true
  }), []);

  // changes, needs to be state
  const [rowData, setRowData] = useState();

  // gets called once, no dependencies, loads the grid data
  useEffect(() => {
    setIsCallApi(true);
    // fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    //     .then(resp => resp.json())
    //     .then(data => {
    //       setRowData(data);
    //       setTimeout(() => setIsCallApi(false), 1000);
    //     });
    debugger
    get('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then(res => {
        debugger;
        setRowData(res);
        setTimeout(() => setIsCallApi(false), 1000);
      });
  }, []);
    const onClick = () => {};
  
  return (
    <div className="ag-theme-alpine" style={{height: 500, width: '100%'}}>
      {/* <Cpt.Button text={'test'} onClick={onClick} /> */}
      <AgGridReact
        className="ag-theme-alpine"
        animateRows="true"
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        enableRangeSelection="true"
        rowData={rowData}
        rowSelection="multiple"
        suppressRowClickSelection="true"
      />
    </div>
  );
};

export default memo(Home);
