import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';

import { useUpdateUserMutation } from '../../redux';
import TextField from '../../components/input';

import Class from './styles.module.scss';

const EditProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('login'));
  const [updateUser, { data, isError }] = useUpdateUserMutation();
  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: { username: user.username, image: user.image, password: '', email: user.email },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      localStorage.setItem(
        'login',
        JSON.stringify({
          token: data.user.token,
          username: data.user.username,
          image: data.user.image,
          email: data.user.email,
        })
      );
      navigate('/articles');
    }
  }, [data]);

  const update = async (e) => {
    await updateUser({ user: e });
  };

  return (
    <div className={Class.form}>
      <h1 className={Class.title}>Edit Profile</h1>
      <form className={Class.flex}>
        <TextField
          placeholder="Username"
          name="username"
          control={control}
          patternValue={/[а-яА-Яa-zA-Z0-9._-]/}
        />
        <TextField
          placeholder="Email address"
          name="email"
          control={control}
          patternValue={/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/}
        />
        <TextField
          placeholder="New password"
          name="password"
          control={control}
          lengthInterval={[6, 40]}
          patternValue={/[a-zA-Z0-9._-]/}
        />
        <TextField
          placeholder="Avatar image"
          name="image"
          control={control}
          patternValue={/https?:\/\/(?:www\.)?\S+\.\S+(?:\/[^\s]*)?/gi}
        />
        {isError && (
          <p className={Class.error}>This username or email adress has already been used</p>
        )}
        <Button type="primary" block onClick={handleSubmit(update)} style={{ height: '40px' }}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditProfilePage;
