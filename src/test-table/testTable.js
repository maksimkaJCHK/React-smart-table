import React, {Component} from 'react';
import SortTable from '../sortTable/';
import Pagination from '../pagination/';
import Search from '../Search/';
import Get from '../services/get';

export default class TestTable extends Component {
  constructor(props) {
    super(props);
    let pageCount = Get('page')
      ? Get('page')
      : 1;

    let sortValue = Get('sortValue')
      ? Get('sortValue')
      : 'id';

    let sortDirectionUp = Get('sortDirectionUp') == 'true'
      ? true
      : false;

    let searchText = Get('searchText')
      ? Get('searchText')
      : '';

    this.state = {
      data: this.props.data,
      filtrData: null,
      pagData: null,
      visibleItems: this.props.visibleItems,
      isMove: false,
      wFCell: '33',
      wSCell: '33',
      wTCell: '33',
      offsetSortTable: null,
      widthTable: null,
      searchText,
      pageCount,
      sortValue,
      sortDirectionUp
    }
    this.checkPag = this.checkPag.bind(this);
    this.handlePag = this.handlePag.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleMoveCell_1_2 = this.handleMoveCell_1_2.bind(this);
    this.handleMoveCell_2_3 = this.handleMoveCell_2_3.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.calcTableParam = this.calcTableParam.bind(this);
  }

  calcTableParam() {
    let sortTable = document.getElementById('test-table');
    let offsetSortTable = sortTable.offsetLeft;
    let widthTable = sortTable.offsetWidth;

    this.setState({
      offsetSortTable,
      widthTable
    });
  }

  componentDidMount() {
    let calcTableParam = this.calcTableParam;
    calcTableParam();
    window.onresize = function() {
      calcTableParam();
    };
  }

  handleMouseOver() {
    this.setState({
      isMove: false
    });
  }

  handleMouseUp() {
    this.setState({
      isMove: false
    });
  }

  handleMouseDown() {
    this.setState({
      isMove: true
    });
  }

  handleMoveCell_1_2(e) {
    let {wTCell, isMove, offsetSortTable, widthTable} = this.state;
    if(isMove) {
      let offsetCursor = e.pageX;
      let calcPerc = parseFloat((offsetCursor - offsetSortTable)/widthTable * 100);
      let calcSizeFCell = 100 - wTCell - calcPerc;

      this.setState({
        wFCell: calcPerc,
        wSCell: calcSizeFCell
      });
    }
  }

  handleMoveCell_2_3(e) {
    let {wFCell, isMove, offsetSortTable, widthTable} = this.state;
    if(isMove) {
      let offsetCursor = e.pageX;
      let calcPerc = parseFloat((offsetCursor - offsetSortTable)/widthTable * 100);
      let calcSCell = calcPerc - wFCell;
      let calcTCell = 100 - wFCell - calcSCell;

      this.setState({
        wSCell: calcSCell,
        wTCell: calcTCell
      });
    }
  }

  componentWillMount() {
    this.checkPag(this.state.pageCount - 1);
  }

  filterData(obj, sText) {
    sText = sText.toLowerCase();
    if(obj.length) {
      let filterObj = obj.filter(el => {
        return el.id == parseInt(sText) || el.name.toLowerCase().indexOf(sText) != -1 || el.value == parseInt(sText);
      });
      return filterObj;
    }
    return obj;
  }

  buildPageParam(count = this.state.pageCount, sortValue = this.state.sortValue, sortDirectionUp = this.state.sortDirectionUp, searchText = this.state.searchText) {

    let countPage = (+count+1);
    let pageCount = Get('page');

    if(countPage > 1 || pageCount || searchText) {
      let state = {'page': countPage};
      let title = 'Пример страниц';

      let url = `?searchText=${searchText}&page=${countPage}&sortValue=${sortValue}&sortDirectionUp=${sortDirectionUp}`;
      history.pushState(state, title, url);
    }
    return countPage;
  }

  buildPagData(count, fData, vItems) {
    let {sortValue, sortDirectionUp} = this.state;
    let sliceCount = count * vItems;
    let pagData = fData.slice(sliceCount, (sliceCount + vItems));

    if(sortDirectionUp) {
      pagData.sort((a, b) => {
        if (a[sortValue] > b[sortValue]) return 1;
        if (a[sortValue] == b[sortValue]) return 0;
        if (a[sortValue] < b[sortValue]) return -1
      });
    } else {
      pagData.sort((a, b) => {
        if (a[sortValue] > b[sortValue]) return -1;
        if (a[sortValue] == b[sortValue]) return 0;
        if (a[sortValue] < b[sortValue]) return 1
      });
    }

    return pagData;
  }

  checkPag(count) {
    let {data, searchText, visibleItems} = this.state;
    let filtrData = this.filterData(data, searchText);
    let pageCount = this.buildPageParam(count);
    let pagData = this.buildPagData(count, filtrData, visibleItems);

    this.setState({
      pagData,
      pageCount,
      filtrData
    });
  }

  handlePag(e) {
    let count = e.target.getAttribute('data-count');
    this.checkPag(count);
  }

  handleSort(e) {
    let {pagData, sortValue, sortDirectionUp} = this.state;
    let sortParam = e.target.textContent.toLowerCase();

    let newData = [...pagData];
    if((sortValue != sortParam) || (sortValue == sortParam && !sortDirectionUp)) {
      sortDirectionUp = true;
      newData.sort((a, b) => {
        if (a[sortParam] > b[sortParam]) return 1;
        if (a[sortParam] == b[sortParam]) return 0;
        if (a[sortParam] < b[sortParam]) return -1
      });
    } else {
      sortDirectionUp = false;
      newData.sort((a, b) => {
        if (a[sortParam] > b[sortParam]) return -1;
        if (a[sortParam] == b[sortParam]) return 0;
        if (a[sortParam] < b[sortParam]) return 1
      });
    }
    this.buildPageParam((this.state.pageCount - 1), sortParam, sortDirectionUp);
    this.setState({
      pagData: newData,
      sortValue: sortParam,
      sortDirectionUp
    });
  }

  handleSubmitForm(searchText) {
    let filtrData = this.filterData(this.state.data, searchText);
    let pageCount = this.buildPageParam(0);
    let pagData = this.buildPagData(0, filtrData, this.state.visibleItems);
    this.buildPageParam(0, this.state.sortValue, this.state.sortDirectionUp, searchText);
    this.setState({
      searchText,
      pageCount,
      pagData,
      filtrData
    });
  }

  render() {
    let {filtrData, pagData, sortValue, sortDirectionUp, pageCount, visibleItems, searchText, wFCell, wSCell, wTCell} = this.state;

    return (
      <div className="test-table">
        <Search handleSubmitForm = {this.handleSubmitForm} searchText = {searchText} />
        <SortTable data = {pagData} handleSort = {this.handleSort} sortValue = {sortValue} sortDirectionUp = {sortDirectionUp} wFCell = {wFCell} wSCell ={wSCell} wTCell  = {wTCell} moveCell_1_2 = {this.handleMoveCell_1_2} moveCell_2_3 = {this.handleMoveCell_2_3} mouseUp = {this.handleMouseUp} mouseDown = {this.handleMouseDown}  mouseOver = {this.handleMouseOver} />
        <Pagination data = {filtrData} checkPag = {this.handlePag} pageCount = {pageCount} visibleItems = {visibleItems} />
      </div>
    )
  }
}