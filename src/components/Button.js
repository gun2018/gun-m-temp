import React from 'react';
import PropTypes from 'prop-types';
import px2rem from '../styles/px2rem';
import close from '../static/icon/close.svg';

const typeObj = {
  close: close,
};

const Button = ({
  style,
  shape,
  disabled,
  children,
  className,
  onClick,
  type,
}) => (
  <button
    className={className}
    disabled={disabled}
    onClick={onClick}
    style={{
      outline: 'none',
      border: 'none',
      color: style.color || '#fff',
      fontSize: style.fontSize || px2rem(14),
      padding: '4px 6px',
      backgroundColor: disabled
        ? 'rgb(147, 143, 143)'
        : style.backgroundColor || '#ED642A',
      borderRadius: shape === 'circle' ? '50%' : style.borderRadius || '8px',
    }}
  >
    {type && (
      <i
        style={{
          display: 'inline-block',
          width: px2rem(50),
          height: px2rem(50),
          background: `no-repeat center/100% url(${typeObj[type]})`,
        }}
      />
    )}
    {/* {type && <Icon type="cross" />} */}
    {children && <span>{children}</span>}
  </button>
);
Button.propTypes = {
  style: PropTypes.object,
  shape: PropTypes.string,
  children: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};
Button.defaultProps = {
  style: {},
  shape: '',
  className: '',
  disabled: false,
  children: '',
  onClick: () => {},
  type: '',
};
export default Button;
