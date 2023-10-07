import Router from './router'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import 'antd/dist/reset.css'
import './App.less'

export default function App() {
  return (
    <ConfigProvider locale={zhCN} prefixCls={'antd'}>
      <Router />
    </ConfigProvider>
  )
}
