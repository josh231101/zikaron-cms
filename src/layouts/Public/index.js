import { withRouter } from 'react-router-dom'

const PublicLayout = ({ children }) => {
  return (
    <div>
      <h1>PUBLIC</h1>
      {children}
    </div>
  )
}

export default withRouter(PublicLayout)
