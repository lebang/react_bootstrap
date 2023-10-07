import http from '@/utils/http'
import { useEffect } from 'react'
import { Button } from 'antd'
import _ from 'lodash-es'

export default () => {
  console.log('env mode:', process.env.APP_ENV)
  useEffect(() => {
    const params = {}
    // 获取首页数据
    http.post('/home/index', params).catch((e) => Promise.reject(e))
  }, [])
  return (
    <>
      <Button
        onClick={() => {
          _.add(1, 3)
        }}
      >
        按钮
      </Button>
    </>
  )
}
