import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useController } from 'react-hook-form';
import { useEffect } from 'react';

import Class from './styles.module.scss';

const { TextArea } = Input;

function TextField({
  control,
  name,
  placeholder,
  lengthInterval = [0, 1000],
  patternValue = /[а-яА-Яa-zA-Z0-9._,?-]/,
  setPassword,
  confirmPassword,
}) {
  const fieldName = placeholder.toLowerCase();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: { value: !name.includes('tag'), message: 'Required field!' },
      minLength: {
        value: lengthInterval[0],
        message: `Your ${fieldName} needs to be at least ${lengthInterval[0]} characters`,
      },
      maxLength: {
        value: lengthInterval[1],
        message: `Your ${fieldName} must contain no more than ${lengthInterval[1]} characters`,
      },
      pattern: { value: patternValue, message: `Not valid ${fieldName}` },
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
    value: field.value,
    placeholder,
  };

  const errorMsg = <>{error && <p className={Class.errorText}>{error.message}</p>}</>;

  function currentInput() {
    if (name === 'password' || name === 'repeat password') {
      return (
        <Input.Password
          {...attributes}
          status={error && 'error'}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          className={Class.input}
        />
      );
    }
    if (name === 'body') {
      return (
        <TextArea
          {...attributes}
          status={error && 'error'}
          style={{
            height: 170,
            resize: 'none',
          }}
        />
      );
    }
    if (name.includes('tag')) {
      return (
        <div className={Class.tag}>
          <Input {...attributes} className={`${Class.input}`} status={error && 'error'} />
          {errorMsg}
        </div>
      );
    }
    return <Input {...attributes} status={error && 'error'} className={Class.input} />;
  }

  function currentLabel(inputName) {
    if (inputName === 'repeat password') {
      return 'Repeat password';
    }
    if (inputName === 'avatar image') {
      return 'Avatar image (url)';
    }
    if (inputName === 'tag') {
      return 'Tags';
    }
    return placeholder;
  }

  useEffect(() => {
    if (setPassword) setPassword(field.value);
  });

  if (name.includes('tag')) {
    return currentInput();
  }

  return (
    <label>
      {currentLabel(name)}
      {currentInput()}
      {errorMsg}
    </label>
  );
}

export default TextField;
