import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import './index.css'
import App from './App'

ReactDOM.render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>,
  document.getElementById('root')
)
