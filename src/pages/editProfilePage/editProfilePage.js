import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';

import { useUpdateUserMutation } from '../../redux';
import TextField from '../../components/input';

import Class from './styles.module.scss';

const EditProfilePage = () => {
  const [updateUser, { data }] = useUpdateUserMutation();
  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
    if (data) {
      localStorage.setItem(
        'login',
        JSON.stringify({
          token: data.user.token,
          username: data.user.username,
          image: data.user.image,
        })
      );
      navigate('/articles');
    }
  }, [data]);

  const update = async (e) => {
    await updateUser({ user: e });
    reset();
    console.log(e);
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
        <TextField placeholder="New password" name="password" control={control} lengthInterval={[6, 40]} />
        <TextField
          placeholder="Avatar image"
          name="image"
          control={control}
          patternValue={/https?:\/\/(?:www\.)?\S+\.\S+(?:\/[^\s]*)?/gi}
        />
        <Button type="primary" block onClick={handleSubmit(update)}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditProfilePage;
