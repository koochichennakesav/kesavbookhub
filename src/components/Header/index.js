import {AiFillCloseCircle} from 'react-icons/ai'
import {useState} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const {location} = props
  const home = location.pathname === '/' ? 'active' : ''
  const bookShelves = location.pathname === '/shelf' ? 'active' : ''
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const [options, setOptions] = useState(false)

  return (
    <>
      <ul
        className="header-container"
        style={{paddingLeft: '0px', listStyleType: 'none'}}
      >
        <Link to="/">
          <img
            className="book-hub-logo"
            src="https://res.cloudinary.com/kesav-kuchi/image/upload/v1648060130/bookhublogo_r7wcay.png"
            alt="website logo"
          />
        </Link>
        <li>
          <nav className="header-links-container list-item-header">
            <Link to="/">
              <button type="button" className={`header-button ${home}`}>
                Home
              </button>
            </Link>
            <Link to="/shelf">
              <button type="button" className={`header-button ${bookShelves}`}>
                Bookshelves
              </button>
            </Link>
            <button
              type="button"
              className="header-button logout-button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </nav>
        </li>
      </ul>
      <nav className="header-container-mobile">
        <Link to="/">
          <img
            className="book-hub-logo"
            src="https://res.cloudinary.com/kesav-kuchi/image/upload/v1648060130/bookhublogo_r7wcay.png"
            alt="website logo"
          />
        </Link>
        <button
          type="button"
          className="menu-button hamburger-menu"
          onClick={() => setOptions(true)}
        >
          <GiHamburgerMenu className="ham-berger" style={{color: '#475569'}} />
        </button>
      </nav>
      {options && (
        <nav className="header-links-container-elements">
          <Link to="/">
            <button type="button" className={`header-button ${home}`}>
              Home
            </button>
          </Link>

          <Link to="/shelf">
            <button type="button" className={`header-button ${bookShelves}`}>
              Bookshelves
            </button>
          </Link>

          <button
            type="button"
            className="header-buttons logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>

          <button
            type="button"
            className="close-button"
            onClick={() => setOptions(false)}
          >
            <AiFillCloseCircle className="close" />
          </button>
        </nav>
      )}
    </>
  )
}

export default withRouter(Header)
