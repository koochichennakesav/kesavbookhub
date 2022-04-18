import './index.css'

const SideBar = props => {
  const {sidebarOptions, onChangeOption, onActive} = props
  const {label, id} = sidebarOptions

  const onChangeId = () => {
    onChangeOption(id)
  }
  const onActiveOption = onActive ? 'active' : ''

  return (
    <li className="sidebar-options">
      <button
        type="button"
        className={`bookshelves-sidebar-button ${onActiveOption}`}
        onClick={onChangeId}
      >
        {label}
      </button>
    </li>
  )
}
export default SideBar
