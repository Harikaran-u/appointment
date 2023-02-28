// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointList, changeIsFavorite} = props
  const {appointment, date, id, isFavorite} = appointList

  console.log(isFavorite)

  const changeStatus = () => {
    changeIsFavorite(id)
  }
  const imgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const appointments = (
    <div className="li-cont">
      <li className="appointment-list-cont">
        <div className="info-cont">
          <p className="list-name">{appointment}</p>
          <p className="date">Date: {date}</p>
        </div>
        <button
          className="star-btn"
          type="button"
          data-testId="star"
          onClick={changeStatus}
        >
          <img alt="star" className="star" src={imgUrl} />
        </button>
      </li>
    </div>
  )
  return appointments
}

export default AppointmentItem
