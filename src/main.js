import React, {Component} from 'react';
import {render} from 'react-dom';
import TestTable from './test-table/';

let node = document.getElementById('test-table');

let data = [
  { id: 1, name: "Облигации плюс", value: 4.41 },
  { id: 2, name: "Сбалансированный", value: -4.83 },
  { id: 3, name: "Валютные облигации", value: 2.19 },
  { id: 4, name: "Акции", value: 0.95 },
  { id: 5, name: "Золото", value: 8.75 },
  { id: 6, name: "Фонд международных дивидендов", value: -5.31 },
  { id: 7, name: "Индия", value: 8.55 },
  { id: 8, name: "Нефть", value: 3.73 },
  { id: 9, name: "Электроэнергетика", value: 2 },
  { id: 10, name: "Еврооблигаций", value: 14 },
  { id: 11, name: "Глобальный долговой рынок", value: 29.5 },
  { id: 12, name: "Денежный", value: 12 },
  { id: 13, name: "Глобальное машиностроение", value: 2.5 },
  { id: 14, name: "Биотехнологии", value: 5.7 },
];

if(node) {
  render(
    <TestTable data = { data } visibleItems = { 5 }  />,
    node
  )
}
