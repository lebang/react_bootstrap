import Router from './router'
import { ConfigProvider } from 'tea-component'
import moment from 'moment'
// import zhCN from 'tea-component/lib/i18n/locale/zh-CN'
import 'moment/dist/locale/zh-cn'
import "tea-component/dist/tea.css"
import './App.less'

moment.locale('zh-cn')
export default function App() {
  return (
    <ConfigProvider classPrefix={'tea'}>
      <Router />
    </ConfigProvider>
  )
}
