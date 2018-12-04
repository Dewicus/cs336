import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './commentBox.js';
import '../css/base.css';

import { Router, Route, browserHistory } from 'react-router';

ReactDOM.render((
    <Router history={browserHistory}>
            <Route path="/" component={CommentBox}/>
            <Route path="/:id" component={CommentEdit}/>
        </Router>
    ), document.getElementById('content')
);
