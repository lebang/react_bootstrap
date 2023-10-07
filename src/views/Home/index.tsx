import http from '@/utils/http';
import { useEffect } from 'react';

export default () => {
  console.log('env mode:', process.env.APP_ENV);
  useEffect(() => {
    const params = {};
    // 获取首页数据
    http.post('/home/index', params).catch(e => Promise.reject(e));
  }, [])
  return 'home'
}