import React from 'react'
import styled from 'styled-components'

import IMAGES from '../constants/images'
import {useAuth} from '../context/AuthContext'

const Wrapper = styled.div`
  nav.main-nav {
    height: 45px;
    padding: 0 20px;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    background-color: rgba(35,170,170,1.00);
    div.nav-item-container {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: row;
      * {
        width: 50%;
        img {
          width: 122px;
          height: 40px;
        }
        button {
          width: 80px;
          margin: 8px 1rem;
          float: right;
          background-color: #feb708;
          border: none;
          border-radius: 2px;
          color: #fff;
          padding: 6px;
          cursor: pointer;
        }
      }
    }
  }

  @media (min-width: 1440px) {
    nav.main-nav {
      padding: 0;

      div.nav-item-container {
        * {
          display: flex;
          place-content: center;
        }
      }
    }
  }

`

function Navbar() {
  const {logout, user} = useAuth()
  return (
    <Wrapper>
      <nav className="main-nav">
        <div className="nav-item-container">
          <div>
            <img src={IMAGES.NAVBAR} alt="CareLuLu Logo"/>
          </div>
          <div>
            {user.firstName && (
              <button onClick={logout}>Logout</button>
            )}
          </div>
        </div>
      </nav>
    </Wrapper>
  )
}

export default Navbar 