import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Slider from 'react-slick'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {topRated: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedBooks = data.books.map(each => ({
        title: each.title,
        id: each.id,
        coverPic: each.cover_pic,
        authorName: each.author_name,
      }))
      this.setState({
        topRated: updatedBooks,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="home-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => {
    const callUrl = () => {
      this.getTopRatedBooks()
    }

    return (
      <div className="home-failure-view-container">
        <img
          className="home-error-image"
          src="https://res.cloudinary.com/kesav-kuchi/image/upload/v1649519276/ErrorImage_asvwox.png"
          alt="failure view"
        />
        <p className="home-failure-heading">
          Something went wrong, Please try again.
        </p>
        <button type="button" className="home-try-again" onClick={callUrl}>
          Try Again
        </button>
      </div>
    )
  }

  renderBooksListView = () => {
    const {topRated} = this.state
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1048,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <>
        <Slider {...settings}>
          {topRated.map(each => (
            <Link to={`/books/${each.id}`} className="nav-link">
              <div className="item-container" key={each.id}>
                <img
                  src={each.coverPic}
                  alt={each.title}
                  className="top-cover-pic"
                />
                <h1 className="title">{each.title}</h1>
                <p className="top-author-name">{each.authorName}</p>
              </div>
            </Link>
          ))}
        </Slider>
      </>
    )
  }

  renderAllBooks = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBooksListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <>
            <h1 className="find-your-books" key="title">
              Find Your Next Favorite Books?
            </h1>
            <p className="book-description">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <Link to="/shelf" className="nav-link home-find-books-link">
              <button type="button" className="home-find-books">
                Find Books
              </button>
            </Link>
            <div className="top-rated-books-container">
              <div className="top-container">
                <h1 className="top-rated-heading">Top Rated Books</h1>
                <Link to="/shelf">
                  <button type="button" className="find-books">
                    Find Books
                  </button>
                </Link>
              </div>
              {this.renderAllBooks()}
            </div>
          </>
          <footer className="home-footer-home-section">
            <div className="icon-container" style={{listStyleType: 'none'}}>
              <a
                rel="noreferrer"
                href="https://www.google.com/"
                target="_blank"
              >
                <FaGoogle className="icons" />
              </a>
              <a
                rel="noreferrer"
                href="https://www.twitter.com"
                target="_blank"
              >
                <FaTwitter className="icons" />
              </a>
              <a
                rel="noreferrer"
                href="https://www.instagram.com"
                target="_blank"
              >
                <FaInstagram className="icons" />
              </a>
              <a
                rel="noreferrer"
                href="https://www.youtube.com"
                target="_blank"
              >
                <FaYoutube className="icons" />
              </a>
            </div>
            <p className="contact-us">Contact us</p>
          </footer>
        </div>
      </>
    )
  }
}

export default Home
