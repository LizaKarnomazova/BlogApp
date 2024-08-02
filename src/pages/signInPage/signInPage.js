import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';

import { useLoginUserMutation } from '../../redux';
import TextField from '../../components/input';

import Class from './styles.module.scss';

const SignInPage = () => {
  const [loginUser, { data, isError }] = useLoginUserMutation();
  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      localStorage.setItem(
        'login',
        JSON.stringify({
          token: data.user.token,
          username: data.user.username,
          image: data.user.image || null,
        })
      );
      navigate('/');
    }
  }, [data]);

  const login = async (e) => {
    await loginUser({ user: e });
  };

  return (
    <div className={Class.form}>
      <h1 className={Class.title}>Sign In</h1>
      <form className={Class.flex}>
        <TextField
          placeholder="Email address"
          name="email"
          control={control}
          patternValue={/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/}
        />
        <TextField placeholder="Password" name="password" control={control} />
        {isError && <p className={Class.error}>Incorrect email adress or password</p>}
        <Button type="primary" block onClick={handleSubmit(login)} style={{ height: '40px' }}>
          Login
        </Button>
        <div className={Class.reminder}>
          Don’t have an account?
          <Link to={'/sign-up'} className={Class.link}>
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
