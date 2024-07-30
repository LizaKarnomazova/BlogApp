/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useController } from 'react-hook-form';
import { useEffect } from 'react';

import Class from './styles.module.scss';

function TextField({
  control,
  name,
  placeholder,
  lengthInterval = [3, 150],
  patternValue = /[a-zA-Z0-9._-]/,
  setPassword,
  confirmPassword,
}) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: 'Required field!',
      minLength: {
        value: lengthInterval[0],
        message: `Your password needs to be at least ${lengthInterval[0]} characters`,
      },
      maxLength: {
        value: lengthInterval[1],
        message: `Your password must contain no more than ${lengthInterval[1]} characters`,
      },
      pattern: { value: patternValue, message: `Not valid ${placeholder.toLowerCase()}` },
      validate: (value) => {
        if (name === 'repeat password') return value === confirmPassword || `Passwords don't match`;
        return true;
      },
    },
  });

  const attributes = {
    onChange: field.onChange,
    onBlur: field.onBlur,
    name: field.name,
    placeholder,
  };

  const input =
    name === 'password' || name === 'repeat password' ? (
      <Input.Password
        {...attributes}
        status={error && 'error'}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
    ) : (
      <Input {...attributes} status={error && 'error'} />
    );

  const errorMsg = <>{error && <p className={Class.errorText}>{error.message}</p>}</>;

  function currentLabel(inputName) {
    if (inputName === 'repeat password') {
      return 'Repeat password';
    }
    if (inputName === 'avatar image') {
      return 'Avatar image (url)';
    }
    return placeholder;
  }

  useEffect(() => {
    if (setPassword) setPassword(field.value);
  });

  return (
    <label>
      {currentLabel(name)}
      {input}
      {errorMsg}
    </label>
  );
}

export default TextField;
