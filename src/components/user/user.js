import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import Class from './user.module.scss';

const User = ({ username, image, date = null, editProfilePage = false }) => (
  <section className={Class.article__user}>
    <div className={Class.info}>
      {editProfilePage ? (
        <Link to={'/profile'} className={Class.name}>
          {username}
        </Link>
      ) : (
        <div className={Class.name}>{username}</div>
      )}
      <div className={Class.date}>{date && format(date, 'LLLL dd, yyyy')}</div>
    </div>
    <Avatar src={image || ''} size={46} icon={<UserOutlined />} />
  </section>
);
export default User;
