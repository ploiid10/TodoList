import styled from 'styled-components'

const FormWrapper = styled.div`
  margin: 4rem auto;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  place-items: center;
  flex-direction: column;
  div {
    max-width: 760px;
    box-sizing: border-box;
  }
  button {
    width: 100%;
    color: white;
    border-radius: 2px;
    margin-bottom: 0.5rem;
    border: none;
    outline: none;
    padding: 10px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }

  button.is-not-valid {
    border-color: gray;
    background-color: gray;
    opacity: 0.2;
    color: black;
  }

  button.signup {
    outline: none;
    border: none;
    background-color: #fff;
    color: blue;
  }

  button.is-valid {
    background-color: #23aaaa;
    border-color: #23aaaa;
  }

  div.login-error {
    text-align: left;
    color: red;
  }
`

export default FormWrapper