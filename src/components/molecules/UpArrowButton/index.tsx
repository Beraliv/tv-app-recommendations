import classNames from 'classnames';
import React, { FunctionComponent } from "react";
import { ButtonParams, Button } from "../../atoms/Button";
import { UpArrowIcon } from "../../atoms/UpArrowIcon";
import './index.css';

export type UpArrowButtonProps = ButtonParams;

export const UpArrowButton: FunctionComponent<UpArrowButtonProps> = React.memo(({ className, onKeyPress }) => (
  <Button className={classNames('UpArrowButton__button', className)}onKeyPress={onKeyPress}>
    <div style={{ position: 'relative' }}>
      <UpArrowIcon className='UpArrowButton__icon' />
    </div>
  </Button>
));