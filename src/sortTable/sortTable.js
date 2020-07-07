import React, {Component} from 'react';
import CompareObj from '../services/compareObj';
import './sortTable.scss';

export default class SortTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      wFCell: this.props.wFCell,
      wSCell: this.props.wSCell,
      wTCell: this.props.wTCell,
    }
  }
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    let isSomeProps = CompareObj(nextProps.data, this.props.data);
    if(!isSomeProps) {
      this.setState({
        data: nextProps.data
      });
    }

    if(this.props.wFCell != nextProps.wFCell || this.props.wSCell != nextProps.wSCell || this.props.wTCell || nextProps.wTCell) {
      this.setState({
        wFCell: nextProps.wFCell,
        wSCell: nextProps.wSCell,
        wTCell: nextProps.wTCell,
      });
    }
  }

  render() {
    let {data, wFCell, wSCell, wTCell} = this.state;
    let {sortDirectionUp, sortValue} = this.props;
    let isSortDirectionUp = sortDirectionUp ? ' up' : '';
    let classId = sortValue == 'id' ? 'active'+isSortDirectionUp : null;
    let classN = sortValue == 'name' ? 'active'+isSortDirectionUp : null;
    let classValue = sortValue == 'value' ? 'active'+isSortDirectionUp : null;

    return (
      <div className = 'sortTable-wrap'>
        {data.length
        ? <table className = 'sortTable' id='sortTable'>
            <thead>
              <th style = {{width: `${wFCell}%`}} onClick = {this.props.handleSort} className = {classId}>
                <span>ID</span>
              </th>
              <th style = {{width: `${wSCell}%`}} onClick = {this.props.handleSort} className = {classN}>
                <span>Name</span>
                <div className = 'sortTable-move-block' onClick = {e => e.stopPropagation()} onMouseOver = {this.props.mouseOver} onMouseMove = {this.props.moveCell_1_2} onMouseUp = {this.props.mouseUp} onMouseDown = {this.props.mouseDown} ></div>
              </th>
              <th style = {{width: `${wTCell}%`}} onClick = {this.props.handleSort} className = {classValue}>
                <span>Value</span>
                <div className = 'sortTable-move-block' onClick = {e => e.stopPropagation()} onMouseOver = {this.props.mouseOver} onMouseMove = {this.props.moveCell_2_3} onMouseUp = {this.props.mouseUp} onMouseDown = {this.props.mouseDown} ></div>
              </th>
            </thead>
            <tbody>
              {data.map((el, count)=><tr key={count}>
                  <td>{el.id}</td>
                  <td>{el.name}</td>
                  <td>{el.value}</td>
                </tr>
              )}
            </tbody>
          </table>
        : 'Нет данных для отображения'
        }
      </div>
    )
  }
}