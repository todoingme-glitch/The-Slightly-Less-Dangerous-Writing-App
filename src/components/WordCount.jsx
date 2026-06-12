import React from 'react';
import {withAppContext} from './AppContext';

const WordCount = ({words}) =>
  <div className="wordcount">{ words || 0 } 자</div>

export default withAppContext(WordCount);
