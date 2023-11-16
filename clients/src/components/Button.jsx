/* eslint-disable react/prop-types */
import './styles/Button.css'

export default function Button({ value, type, color }) {
  return (
    <button type={type} id="btn-component" className={color}>{value}</button>
  )
}