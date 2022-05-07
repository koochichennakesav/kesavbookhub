import {Link} from 'react-router-dom'
import './index.css'

const TopRatedBooks = props => {
  const {bookItem} = props
  const {id, title, authorName, coverPic} = bookItem
  return (
    <Link to={`/books/${id}`} className="nav-link">
      <li className="item-container" key={id}>
        <img src={coverPic} alt={title} className="top-cover-pic" />
        <h1 className="title">{title}</h1>
        <p className="top-author-name">{authorName}</p>
      </li>
    </Link>
  )
}

export default TopRatedBooks
