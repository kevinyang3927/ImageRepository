import React from "react"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import MainPage from './MainPage'


export default function Dashboard() {
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {

    try {
      await logout()
      history.push("/login")
    } catch {
    }
  }

  return (
    <>
      <div >
        <MainPage userFile = {currentUser.email} />
      </div> 
      <div >
        <button  onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </>
  )
}

