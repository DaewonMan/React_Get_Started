import React, { useState, useEffect, useMemo, memo, useContext, useCallback  } from 'react';
import * as Cpt from 'components';
import * as utils from 'utils/utils';
import * as api from 'utils/api';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { ApiContext } from 'App';
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
      sortable: true,
      cellStyle: { textAlign: 'center' }
  }), []);

  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
        { statusPanel: 'agTotalRowCountComponent', align: 'center' },
        { statusPanel: 'agFilteredRowCountComponent' },
        { statusPanel: 'agSelectedRowCountComponent' },
        { statusPanel: 'agAggregationComponent' },
      ],
    };
  }, []);

  // changes, needs to be state
  const [rowData, setRowData] = useState();
  
  const onClick = useCallback(() => {
    setIsCallApi(true);
    api
      .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then(res => {
        debugger
        setRowData(res);
        utils.clearTimeoutInstcs('progress');
        utils.timeoutInstcs.progress = setTimeout(() => {
          debugger
          setIsCallApi(false);
          utils.clearTimeoutInstcs('progress');
        }, 1000);
      });
  }, []);
  
  return (
    <div className="ag-theme-alpine" style={{height: 500, width: '100%'}}>
      <Cpt.Button text={'test'} onClick={onClick} />
      <AgGridReact
        className="ag-theme-alpine"
        animateRows="true"
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        enableRangeSelection="true"
        rowData={rowData}
        rowSelection="multiple"
        suppressRowClickSelection="true"
        statusBar={statusBar}
      />
    </div>
  );
};

export default memo(Home);
