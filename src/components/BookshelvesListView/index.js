import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookshelvesListView = props => {
  const {bookshelvesList} = props
  const {id, coverPic, title, rating, readStatus, authorName} = bookshelvesList

  return (
    <Link to={`/books/${id}`} className="nav-link">
      <li className="book-details-container">
        <img src={coverPic} alt={title} className="cover-picc" />
        <div>
          <h1 className="book-titlee">{title}</h1>
          <p className="author-namee">{authorName}</p>
          <p className="avg-ratingg">
            Avg Rating <BsFillStarFill className="star-icon" /> {rating}
          </p>
          <p className="statuss">
            Status: <span className="read-statuss">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookshelvesListView
