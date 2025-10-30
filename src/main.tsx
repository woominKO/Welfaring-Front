import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // 개발 환경에서 StrictMode의 이중 호출을 방지하기 위해 임시로 제거합니다.
  // 프로덕션 빌드에는 영향이 없습니다.
  // <StrictMode>
    <App />
  // </StrictMode>
)
