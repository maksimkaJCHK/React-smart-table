import React, {Component} from 'react';
import './pagination.scss';

export default function Pagination(props) {
  let {data, checkPag, pageCount, visibleItems} = props;
  pageCount = (pageCount == '') ? 0 : pageCount - 1;

  if(data.length <= visibleItems) {
    return null;
  }

  let countPag = Math.ceil(data.length/visibleItems);
  let buildPag = [];
  for (let index = 0; index < countPag; index++) {
    buildPag.push(<li className = {(index == pageCount) ? 'active' : '' } onClick = {checkPag} key={index} data-count = {index}>{index+1}</li>);
  }
  return <ul className = "pagination">{buildPag}</ul>
};