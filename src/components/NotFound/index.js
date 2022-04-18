import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="page-not-found-container">
    <img
      src="https://res.cloudinary.com/kesav-kuchi/image/upload/v1649790940/page_not_found_zzfnhy.png"
      alt="page not found"
      className="error-page"
    />
    <h1 className="page-not-found">Page Not Found</h1>
    <p className="page-not-found-description">
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/" className="nav-link">
      <button type="button" className="back-to-home">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
