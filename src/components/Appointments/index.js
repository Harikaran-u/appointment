// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem/index'

import './index.css'

class Appointments extends Component {
  state = {
    appointment: '',
    appointmentDate: '',
    appointmentList: [],
    inActive: false,
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {appointment, appointmentDate} = this.state
    if (appointment === '' || appointmentDate === '') {
      console.log('Enter Your Details')
    } else {
      const newAppointment = {
        id: uuidv4(),
        appointment,
        date: appointmentDate,
        isFavorite: false,
      }
      this.setState(prevState => ({
        appointmentList: [...prevState.appointmentList, newAppointment],
        appointment: '',
        appointmentDate: '',
      }))
    }
  }

  addAppointment = event => {
    this.setState({appointment: event.target.value})
  }

  addDate = event => {
    const correctDate = format(
      new Date(event.target.value),
      'dd MMMM yyyy, EEEE',
    )
    this.setState({appointmentDate: correctDate})
  }

  changeIsFavorite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachApp => {
        if (eachApp.id === id) {
          return {...eachApp, isFavorite: !eachApp.isFavorite}
        }
        return eachApp
      }),
    }))
  }

  starredAppointments = () => {
    this.setState(prevState => ({
      inActive: !prevState.inActive,
    }))
  }

  render() {
    const {appointment, appointmentList, inActive} = this.state

    let filterData = appointmentList.filter(eachAppointment => {
      if (inActive === true) {
        return eachAppointment.isFavorite === true
      }
      return eachAppointment
    })
    if (filterData.length === 0) {
      filterData = appointmentList
    }

    const appointmentApp = (
      <div className="home-app-cont">
        <div className="content-cont">
          <div className="appointment-form-cont">
            <div className="add-cont">
              <h1 className="title">Add Appointment</h1>
              <form
                className="appointment-form"
                onSubmit={this.onAddAppointment}
              >
                <label htmlFor="add-title" className="label-text">
                  TITLE
                </label>
                <input
                  type="text"
                  className="appointment-input"
                  id="add-title"
                  placeholder="Title"
                  onChange={this.addAppointment}
                  value={appointment}
                />
                <label htmlFor="date-name" className="label-text">
                  DATE
                </label>
                <input
                  type="date"
                  id="date-name"
                  className="appointment-input"
                  onChange={this.addDate}
                  placeholder="dd-mm-yyyy"
                  value=""
                />
                <button className="add-btn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="display-img"
              alt="appointments"
            />
          </div>
          <hr size="3" className="hr-line" />
          <div className="list-bottom-cont">
            <h1 className="app-list-head">Appointments</h1>
            <button
              className="star-text"
              type="button"
              onClick={this.starredAppointments}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list-cont">
            {filterData.map(eachAppointment => (
              <AppointmentItem
                appointList={eachAppointment}
                key={eachAppointment.id}
                changeIsFavorite={this.changeIsFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
    return appointmentApp
  }
}

export default Appointments
