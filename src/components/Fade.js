/**
 * TODO，动画组件
 */

import React from 'react';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';

const duration = 100;

const defaultStyle = {
  transition: `opacity ${duration}ms cubic-bezier(0.22, 0.61, 0.36, 1)`,
  opacity: 0,
  visibility: 'visible',
  zIndex: '0',
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1, visibility: 'visible', zIndex: '9999' },
};

const Fade = ({ in: inProp, children }) => (
  <Transition in={inProp} timeout={duration} appear>
    {state => (
      <div
        style={{
          ...defaultStyle,
          ...transitionStyles[state],
        }}
      >
        {children}
      </div>
    )}
  </Transition>
);

Fade.propTypes = {
  in: PropTypes.bool,
  children: PropTypes.objectOf(PropTypes.any),
};

Fade.defaultProps = {
  in: false,
  children: null,
};

export default Fade;
