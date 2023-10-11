import http from '@/utils/http'
import { useEffect } from 'react'
import { Button } from 'tea-component'
import _ from 'lodash-es'
import { useTranslation } from 'react-i18next'

export default () => {
  console.log('env mode:', process.env.APP_ENV)
  const { t } = useTranslation()
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
        {t('按钮')}
      </Button>
    </>
  )
}
