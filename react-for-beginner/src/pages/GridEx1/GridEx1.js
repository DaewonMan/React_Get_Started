import React, { useCallback, useMemo, useRef, useState, memo, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './GridEx1.css';
import CustomHeader from './CustomHeader';
import { ApiContext } from 'App';
import * as api from 'utils/api';
import * as utils from 'utils/utils';
import * as Cpt from 'components';

const GridEx1 = () => {
  const { isCallApi, setIsCallApi } = useContext(ApiContext);

  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '500px', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', suppressMenu: true, minWidth: 120 },
    {
      field: 'age',
      sortable: false,
      headerComponentParams: { menuIcon: 'fa-external-link-alt' },
    },
    { field: 'country', suppressMenu: true, minWidth: 120 },
    { field: 'year', sortable: false },
    { field: 'date', suppressMenu: true },
    { field: 'sport', sortable: false },
    {
      field: 'gold',
      headerComponentParams: { menuIcon: 'fa-cog' },
      minWidth: 120,
    },
    { field: 'silver', sortable: false },
    { field: 'bronze', suppressMenu: true, minWidth: 120 },
    { field: 'total', sortable: false },
  ]);
  const components = useMemo(() => {
    return {
      agColumnHeader: CustomHeader,
    };
  }, []);
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
      headerComponentParams: {
        menuIcon: 'fa-bars',
      },
    };
  }, []);

  // const onGridReady = useCallback((params) => {
  //   fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setRowData(data.slice(0, 10));
  //     });
  // }, []);

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
    <div style={containerStyle}>
      <Cpt.Button text={'test'} onClick={onClick} />
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          suppressMenuHide={true}
          components={components}
          defaultColDef={defaultColDef}
          // onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default memo(GridEx1);