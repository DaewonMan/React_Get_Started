import React, { useState, useEffect, useMemo, memo, useContext, useCallback, useLayoutEffect, useRef   } from 'react';
import * as Cpt from 'components';
import * as utils from 'utils/utils';
import * as utilsApi from 'utils/api';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

import { ApiContext } from 'App';

import _ from 'lodash';


// Redux
import { useSelector, useDispatch } from 'react-redux';
import { productAction } from 'redux/action/productAction';
import store from 'redux/store';

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

const styles = {
  active: {
    backgroundColor: 'blue',
    color: 'white'
  }
};

const Home = () => {
  const { isCallApi, setIsCallApi } = useContext(ApiContext);

  const [gridApi, setGridApi] = useState();
  const [showArea, setShowArea] = useState('all');

  // const dispatch = useDispatch();
  // const product = useSelector((state) => state.product);
  // const status = useSelector(productAction)


  const columnDefs = [
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
  ]

  // never changes, so we can use useMemo
  const defaultColDef = {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      // filter: true,
      flex: 1,
      minWidth: 100,

      cellStyle: { textAlign: 'center' }
  };

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
  
  const onClick2 = useCallback(() => {
    setIsCallApi(true);
    // setRowData([]);
    utilsApi
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
  
  const onClick = useCallback(() => {
    // productAction.getProducts();
    // dispatch(productAction.getProducts())

    // console.log('store ===> ', store);
    console.log('store.getState ===> ', store.getState().product.productList);
    // console.log('product ===> ', product);
  }, []);

  const onGridReady = useCallback((params) => {
    debugger
    // setRowData([]);
    setGridApi(params.api);
  }, []);

  useEffect(() => {
    // gridApi?.pushServerSideDatasource(params);
    // console.log('store ===> ', store);
    console.log('store.getState ===> ', store.getState().product.productList);
    // console.log('product ===> ', product);
  }, []);

  useLayoutEffect(() => {
    debugger
    setRowData([]);
  }, []);

  const buttonGrpClick = useCallback((e) => {
    debugger
    setShowArea(e.target.id);
  }, []);
  
  return (
    <div className="ag-theme-alpine" style={{height: 500, width: '100%', padding: '1rem'}}>
      <Cpt.Button text={'test'} onClick={onClick2} />
      {/* https://mui.com/material-ui/react-table/ (mui 참고) */}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}>
        <ButtonGroup 
          variant="outlined" 
          aria-label="outlined button group"
          onClick={buttonGrpClick}
        >
          <Button id="all" style={showArea == 'all' ? styles.active : null}>전체</Button>
          <Button id="person" style={showArea == 'person' ? styles.active : null}>개인</Button>
        </ButtonGroup>
      </div>

      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={rowData}
        rowSelection="multiple"
        animateRows={true}
        enableRangeSelection={true}
        suppressRowClickSelection={true}
        suppressColumnVirtualisation={true}
        suppressRowVirtualisation={true}
        // statusBar={statusBar}
        pagination={true}
        paginationPageSize={100}
        onGridReady={onGridReady}
      >
      </AgGridReact>
    </div>
  );
};

export default memo(Home);
