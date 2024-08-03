import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Space, Spin } from 'antd';

const LoadingSpin = () => (
  <Space
    style={{
      position: 'absolute',
      left: '50%',
      top: '30%',
    }}
  >
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 48,
          }}
          spin
        />
      }
    />
  </Space>
);
export default LoadingSpin;
