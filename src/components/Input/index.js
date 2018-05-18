import React, { PureComponent } from 'react';
import classNames from 'classnames';
import './Input.css';

export default class Input extends PureComponent {
  render() {
    let { className, inputRef, ...props } = this.props;
    let passProps = { ...props, children: null };

    return (
      <input
        {...passProps}
        ref={inputRef}
        className={classNames('Input__input', className)}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    );
  }
}
