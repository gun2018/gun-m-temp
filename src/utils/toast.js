import React from 'react';
import ReactDOM from 'react-dom';
import Toast from '../components/Toast';

export default function(text = '', duration = 2000) {
  if (!process.browser) {
    // eslint-disable-next-line no-console
    console.log(`[Toast]${text}`);
    return;
  }
  const div = document.createElement('div');
  document.body.appendChild(div);

  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  }, duration);

  ReactDOM.render(<Toast text={text} />, div);
}
