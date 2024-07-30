/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Checkbox } from 'antd';

import TextField from '../../components/input';
import { useRegistryUserMutation } from '../../redux';

import Class from './styles.module.scss';

const SignUpPage = () => {
  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
  });
  const [registryUser, { data }] = useRegistryUserMutation();
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
    if (data) {
      localStorage.setItem(
        'login',
        JSON.stringify({
          token: data.user.token,
          username: data.user.username,
        })
      );
      navigate('/articles');
    }
  }, [data]);

  const registry = async (e) => {
    if (checkbox) {
      delete e['repeat password'];
      await registryUser({ user: e });
      reset();
    } else {
      setError('error');
    }
    console.log(e);
  };

  return (
    <div className={Class.form}>
      <h1 className={Class.title}>Create new account</h1>
      <form className={Class.flex}>
        <TextField
          placeholder="Username"
          name="username"
          control={control}
          lengthInterval={[3, 20]}
          patternValue={/[а-яА-Яa-zA-Z0-9._-]/}
        />
        <TextField
          placeholder="Email address"
          name="email"
          control={control}
          patternValue={/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/}
        />
        <TextField
          placeholder="Password"
          name="password"
          control={control}
          lengthInterval={[6, 40]}
          setPassword={setPassword}
          confirmPassword={password}
        />
        <TextField
          placeholder="Password"
          name="repeat password"
          control={control}
          confirmPassword={password}
        />
        <Checkbox
          className={error ? `${Class.checkbox} ${Class.error}` : Class.checkbox}
          checked={checkbox}
          onChange={() => {
            setCheckbox(!checkbox);
            if (!checkbox) setError('');
          }}
        >
          I agree to the processing of my personal information
        </Checkbox>
        <Button type="primary" block onClick={handleSubmit(registry)}>
          Create
        </Button>
        <div className={Class.reminder}>
          Already have an account?{' '}
          <Link to={'/sign-up'} className={Class.link}>
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};
export default SignUpPage;
