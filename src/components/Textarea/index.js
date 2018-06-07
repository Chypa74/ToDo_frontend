import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import TextareaAutoresize from 'react-textarea-autosize';
import './Textarea.css';

const Textarea = ({ inputRef, className, ...props }) => (
  <TextareaAutoresize
    inputRef={inputRef}
    className={classNames('Textarea', className)}
    {...props}
  />
);

Textarea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default Textarea;
