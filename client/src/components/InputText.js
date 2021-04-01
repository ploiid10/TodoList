import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  p.error {
    position: absolute;
    bottom: -2px;
    width: 100%;
    font-size: 12px;
    color: red;
  }
  label {
    margin-bottom: 4px;
  }
  input {
    height: 35px;
    padding: 0 12px;
    font-size: 16px;
    margin-bottom: 1.5rem;
    border: 0.5px solid;
    border-color: ${({hasError}) => hasError ? 'red' : 'auto'};
    outline: none;
    border-radius: 2px;
  }
`

function InputText({
  label,
  onChange,
  type,
  name,
  defaultValue,
  error,
}) {
  const inputProps = {
    type,
    name,
    onChange,
    autoComplete: 'off',
    defaultValue,
  }

  return (
    <Wrapper hasError={!!error}>
      <label>{label}</label>
      <input 
        {...inputProps}
      />
      {error && (
        <p className="error">
          {error}
        </p>
      )}
    </Wrapper>
  )    
}

InputText.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string, 
  name: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  error: PropTypes.string,
}

InputText.defaultProps = {
  label: null,
  type: null,
  onChange: () => null,
  name: null,
  error: null,
  defaultValue: '',
}

export default InputText