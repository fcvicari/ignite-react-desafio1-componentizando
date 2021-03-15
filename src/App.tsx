import { ApiContextProvider } from './context/ApiContext';
import './styles/global.scss';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

export function App() {
  return (
    <ApiContextProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Content />
      </div>
    </ApiContextProvider>
  )
}