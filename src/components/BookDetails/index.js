import Cookies from 'js-cookie'
import {Component} from 'react'
import {BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import FooterView from '../FooterView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {bookItm: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getBookItem()
  }

  getBookItem = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        id: data.book_details.id,
        aboutAuthor: data.book_details.about_author,
        authorName: data.book_details.author_name,
        aboutBook: data.book_details.about_book,
        coverPic: data.book_details.cover_pic,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }
      this.setState({
        bookItm: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => {
    const onGetBooks = () => {
      this.getBookItem()
    }
    return (
      <div className="failure-view-container">
        <img
          className="error-image"
          src="https://res.cloudinary.com/kesav-kuchi/image/upload/v1649519276/ErrorImage_asvwox.png"
          alt="failure view"
        />
        <p className="failure-heading">
          Something went wrong, Please try again.
        </p>
        <button type="button" className="try-again" onClick={onGetBooks}>
          Try Again
        </button>
      </div>
    )
  }

  renderBooksListView = () => {
    const {bookItm} = this.state
    const {
      authorName,
      aboutAuthor,
      coverPic,
      rating,
      title,
      readStatus,
      aboutBook,
    } = bookItm
    return (
      <div>
        <div className="book-item-container">
          <div className="book-item-box-container">
            <div className="books-details-container">
              <img src={coverPic} alt={title} className="cover-pic" />
              <div className="book-item-description">
                <h1 className="book-title">{title}</h1>
                <p className="author-name">{authorName}</p>
                <p className="avg-rating">
                  Avg Rating <BsFillStarFill className="star-icon" /> {rating}
                </p>
                <p className="status">
                  Status: <span className="read-status">{readStatus}</span>
                </p>
              </div>
            </div>
            <hr />
            <h1 className="about-author">About Author</h1>
            <p className="description">{aboutAuthor}</p>
            <h1 className="about-book">About Book</h1>
            <p className="description">{aboutBook}</p>
          </div>
        </div>
        <FooterView />
      </div>
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
      <div>
        <Header />
        {this.renderAllBooks()}
      </div>
    )
  }
}

export default BookDetails
