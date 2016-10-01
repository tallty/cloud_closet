import './index.html';
// package.json theme配置无效时，使用global覆盖
// import './global.less';
import './index.less';
import ReactDOM from 'react-dom';
import React from 'react';
import { browserHistory } from 'react-router';
import { Routes } from '../routes/index';

sessionStorage.setItem('openid','');//使用方法存储数据,推荐

ReactDOM.render(<Routes history={browserHistory} />, document.getElementById('root'));
