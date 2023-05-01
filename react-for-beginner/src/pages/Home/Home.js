import React, { useState, useEffect, useMemo, memo, useContext, useCallback, useLayoutEffect, useRef   } from 'react';
import * as Cpt from 'components';
import * as utils from 'utils/utils';
import * as utilsApi from 'utils/api';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

import './Home.css';

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

import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';


// const MyRenderer = (params) => {
//   return (
//     <span className="my-renderer">
//       <img src="https://d1yk6z6emsz7qy.cloudfront.net/static/images/loading.gif" className="my-spinner" />
//       {params.value}
//     </span>
//   );
// };

const styles = {
  active: {
    backgroundColor: 'blue',
    color: 'white'
  }
};

//////////////=================================
const MyGroupHeader = memo((props) => {

  const [expanded, setExpanded] = useState();
  const { columnGroup } = props;
  const expandable = columnGroup.isExpandable();
  const providedColumnGroup = columnGroup.getProvidedColumnGroup();

  const onExpandClicked = useCallback(() => props.setExpanded(!columnGroup.isExpanded()), []);

  useEffect(() => {
      const listener = () => {
          setExpanded(columnGroup.isExpanded());
      };
      debugger;
      listener();
      providedColumnGroup.addEventListener('expandedChanged', listener);
      return () => providedColumnGroup.removeEventListener('expandedChanged', listener);
  }, []);

  const showExpandJsx = () => (
      <button 
        className="my-expand"
        onClick={onExpandClicked} 
      >
          {expanded ? '<' : '>'}
      </button>
  );

  return (
      // <span className="my-group-header">
      <span className="top-total-header">
          {/* <img src="https://d1yk6z6emsz7qy.cloudfront.net/static/images/loading.gif" className="my-spinner" /> */}
          {/* {props.displayName} */}
          {/* {expandable && showExpandJsx()} */}
          {props.displayName == 'Total' ?  props.displayName : _.map(columnGroup.displayedChildren, (x, idx) => {
            return (
              // <div className="top-col" style={{width: x.actualWidth, padding: idx == 0 ? 0 : '0 18px 0 18px'}}>{x.colId}</div>
              <div className="top-col" style={{width: x.actualWidth}}>{x.colId}</div>
            );
          })}
      </span>
  );
});

const SortingHeader = memo((props) => {

  const [sortState, setSortState] = useState();

  const onClick = useCallback(() => {
      props.progressSort();
  });

  useEffect(() => {
      const listener = () => {
          if (props.column.isSortAscending()) {
              setSortState('ASC');
          } else if (props.column.isSortDescending()) {
              setSortState('DESC');
          } else {
              setSortState(undefined);
          }
      };

      props.column.addEventListener('sortChanged', listener);

      return () => props.column.removeEventListener('sortChanged', listener);;
  }, []);

  return (
      <span className="my-header" onClick={onClick}>
          {/* <img src="https://d1yk6z6emsz7qy.cloudfront.net/static/images/loading.gif" className="my-spinner" /> */}
          {props.displayName} {sortState}
      </span>
  );
});

// const MyTooltip = () => {    
//   return (
//       <div className='my-tooltip'>
//           My Tooltip: {params.value}
//       </div>
//   )
// };

// const MyStatusPanel = ((props, ref) => {
 
//   const [value, setValue] = useState(0);

//   // expose AG Grid Filter Lifecycle callbacks
//   useImperativeHandle(ref, () => {
//       return {
//           sampleStatusPanelMethod() {
//               setValue( value => value + 1);
//           }
//       }
//   });

//   return (
//       <div className='my-status-panel'>
//           <span>
//               Sample Status Panel
//           </span>
//           <span className='my-status-panel-value'>
//               {value}
//           </span>
//       </div>
//   )
// });

const Home = () => {
  const { isCallApi, setIsCallApi } = useContext(ApiContext);

  const [gridApi, setGridApi] = useState();
  const [showArea, setShowArea] = useState('all');
  const [isAlert, setIsAlert] = useState(false);

  // const dispatch = useDispatch();
  // const product = useSelector((state) => state.product);
  // const status = useSelector(productAction)


  // const columnDefs = useMemo(() => [
  //   { field: 'athlete' },
  //   { field: 'age'},
  //   { field: 'country' },
  //   { field: 'year' },
  //   { field: 'date' },
  //   { field: 'sport' },
  //   { field: 'gold' },
  //   { field: 'silver' },
  //   { field: 'bronze' },
  //   { field: 'total' }
  // ], []);

  const columnDefs = useMemo(() => [
    {
      headerName: 'Total',
      headerClass: 'medals-group',
      resizable: false,
      // headerGroupComponent: MyGroupHeader,
      children: [
          // { field: 'athlete', headerComponent: SortingHeader, columnGroupShow: 'open'  },
          // { field: 'age', headerComponent: SortingHeader },
          { field: 'athlete', align: 'center'  },
          { field: 'age' },
          { field: 'country' },
          { field: 'year'},
      ]
    },
    // {
    //   headerName: 'Group B',
    //   resizable: false,
    //   headerGroupComponent: MyGroupHeader,
    //   children: [
    //       // { field: 'date', columnGroupShow: 'open' },
    //       // { field: 'sport', columnGroupShow: 'open' },
    //       { field: 'date' },
    //       { field: 'sport' },
    //       { field: 'gold' },
    //       { field: 'silver' },
    //       { field: 'bronze' },
    //       { field: 'total' }
    //   ]
    // }
    {
      // field: 'testField',
      headerName: '2',
      headerClass: 'participant-group',
      resizable: false,
      // headerGroupComponent: MyGroupHeader,
      children: [
          { field: '02/01' },
      ]
    },
    {
      headerName: 3,
      headerClass: 'participant-group',
      resizable: false,
      // headerGroupComponent: MyGroupHeader,
      children: [
          { field: '02/02' },
      ]
    },
    {
      headerName: 5,
      headerClass: 'participant-group',
      resizable: false,
      // headerGroupComponent: MyGroupHeader,
      children: [
          { field: '02/03' },
      ]
    },
    {
      headerName: 3,
      headerClass: 'participant-group',
      resizable: false,
      // headerGroupComponent: MyGroupHeader,
      children: [
          { field: '02/04' },
      ]
    },
  ], []);

  // never changes, so we can use useMemo
  const defaultColDef = useMemo(() => ({
      editable: false,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      // filter: true,
      flex: 1,
      minWidth: 100,
      // tooltipComponent: MyTooltip

      cellStyle: { textAlign: 'center' }
  }), []);

  // const statusBar = useMemo(() => {
  //   return {
  //     statusPanels: [
  //       { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
  //       { statusPanel: 'agTotalRowCountComponent', align: 'center' },
  //       { statusPanel: 'agFilteredRowCountComponent' },
  //       { statusPanel: 'agSelectedRowCountComponent' },
  //       { statusPanel: 'agAggregationComponent' },
  //     ],
  //   };
  // }, []);

  // const statusBar = useMemo(() => ({
  //   statusPanels: [
  //       { key: 'myStatusPanel', statusPanel: MyStatusPanel }
  //   ]
  // }), []);

  // changes, needs to be state
  const [rowData, setRowData] = useState();
  
  const onClick2 = useCallback(() => {
    // setIsCallApi(true);
    // utilsApi
    //   .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
    //   .then(res => {
    //     debugger
    //     setRowData(res);
    //     utils.clearTimeoutInstcs('progress');
    //     utils.timeoutInstcs.progress = setTimeout(() => {
    //       debugger
    //       setIsCallApi(false);
    //       utils.clearTimeoutInstcs('progress');
    //     }, 1000);
    //   });
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

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then(resp => resp.json())
      .then(data => setRowData(data.slice(0 , 10)));
  }, []);

  useLayoutEffect(() => {
    debugger
    setRowData([]);
  }, []);

  const buttonGrpClick = useCallback((e) => {
    debugger
    setShowArea(e.target.id);
  }, []);
  
  const handleAlert = () => {
    if(!!utils.timeoutInstcs.alert) return;

    setIsAlert(true);
    utils.timeoutInstcs.alert = setTimeout(() => {
      setIsAlert(false);
      utils.clearTimeoutInstcs('alert');
    }, 1200);
  };

  return (
    <div className="ag-theme-alpine" style={{height: 500, width: '100%', padding: '1rem'}}>
      {/* <Cpt.Button text={'test'} onClick={handleAlert} /> */}
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

      {/* <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={rowData}
        // rowSelection="multiple"
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
      </AgGridReact> */}

      <AgGridReact
        animateRows="true"
        rowGroupPanelShow="always"
        // enableRangeSelection="true"
        // rowSelection="multiple"
        // groupSelectsChildren="true"
        // suppressRowClickSelection="true"
        // statusBar={statusBar}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={rowData}
      />

      {isAlert && <Stack sx={{ width: '50%', zIndex: 1, position: 'absolute', top: '5%', right: '25%'}} spacing={2}>
        {/* <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          This is a success alert — check it out!
        </Alert> */}
        {/* <Alert variant="outlined" severity="warning">
          This is a warning alert — check it out!
        </Alert> */}
        <Alert variant="standard" severity="error">
          프로젝트를 선택하세요.
        </Alert>
      </Stack>}
    </div>
  );
};

export default memo(Home);
