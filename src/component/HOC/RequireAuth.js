import { useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function RequireAuth({ children }) {
  const location = useLocation()
  const auth = useSelector((state) => state.mode.login)

  if (!auth) return <Navigate to="/signin" state={{ from: location }} />
  return children
}

export default RequireAuth
