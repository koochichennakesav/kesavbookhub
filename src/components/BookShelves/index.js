import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import SideBar from '../SideBar'
import BookshelvesListView from '../BookshelvesListView'
import FooterView from '../FooterView'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookShelves extends Component {
  state = {
    readStatus: bookshelvesList[0].value,
    searchValue: '',
    apiStatus: apiStatusConstants.initial,
    bookshelvesLists: [],
  }

  componentDidMount() {
    this.renderLoadingView()
    this.getBookshelves()
  }

  onSuccess = data => {
    const updatedData = data.books.map(eachBook => ({
      authorName: eachBook.author_name,
      coverPic: eachBook.cover_pic,
      id: eachBook.id,
      title: eachBook.title,
      readStatus: eachBook.read_status,
      rating: eachBook.rating,
    }))
    this.setState({
      bookshelvesLists: updatedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  getBookshelves = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchValue, readStatus} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${readStatus}&search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      this.onSuccess(data)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onUserInput = event => {
    this.setState({searchValue: event.target.value})
  }

  onSearch = () => {
    this.getBookshelves()
  }

  onClickSidebarOption = id => {
    const changeOption = bookshelvesList.filter(each => each.id === id)
    const {value} = changeOption[0]
    this.setState({readStatus: value}, this.getBookshelves)
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBooksListView = () => {
    const {bookshelvesLists, searchValue} = this.state

    return (
      <div>
        {bookshelvesLists.length > 0 ? (
          <ul className="bookshelves-result-container">
            {bookshelvesLists.map(each => (
              <BookshelvesListView bookshelvesList={each} key={each.id} />
            ))}
          </ul>
        ) : (
          <div className="search-failure-view-container">
            <img
              src="https://res.cloudinary.com/kesav-kuchi/image/upload/v1649657840/search_result_error_svlcd1.png"
              alt="no books"
              className="search-image"
            />
            <p className="error-input">
              Your search for {searchValue} did not find any matches.
            </p>
          </div>
        )}
      </div>
    )
  }

  renderFailureView = () => {
    const onGetBooks = () => {
      this.getBookshelves()
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
    const {readStatus, searchInput} = this.state
    const options = bookshelvesList.filter(each => each.value === readStatus)
    const labels = options[0].label

    return (
      <div className="common-container">
        <Header />
        <div className="book-shelves-container">
          <div className="bookshelves-user-search-input-container">
            <input
              type="search"
              className="bookshelves-user-search-input"
              value={searchInput}
              onChange={this.onUserInput}
            />
            <button
              type="button"
              testid="searchButton"
              className="search-icon"
              onClick={this.onSearch}
            >
              <BsSearch />
            </button>
          </div>
          <h1 className="bookshelves-heading">Bookshelves</h1>
          <ul className="bookshelves-options-container">
            {bookshelvesList.map(each => (
              <SideBar
                sidebarOptions={each}
                key={each.id}
                onActive={readStatus === each.value}
                onChangeOption={this.onClickSidebarOption}
              />
            ))}
          </ul>
          <div className="sidebar-container">
            <h1 className="book-shelves-heading">Bookshelves</h1>
            <ul style={{paddingLeft: '0px', listStyleType: 'none'}}>
              {bookshelvesList.map(each => (
                <SideBar
                  sidebarOptions={each}
                  key={each.id}
                  onActive={readStatus === each.value}
                  onChangeOption={this.onClickSidebarOption}
                />
              ))}
            </ul>
          </div>
          <div className="book-shelves-list-container">
            <div className="bookshelves-search">
              <h1 className="bookshelves-list-heading">{labels} Books</h1>
              <div className="user-search-input-container">
                <input
                  type="search"
                  className="user-search-input"
                  value={searchInput}
                  onChange={this.onUserInput}
                />
                <button
                  type="button"
                  testid="searchButton"
                  className="search-icon"
                  onClick={this.onSearch}
                >
                  <BsSearch />
                </button>
              </div>
            </div>
            {this.renderAllBooks()}
          </div>
        </div>
        <FooterView />
      </div>
    )
  }
}

export default BookShelves
