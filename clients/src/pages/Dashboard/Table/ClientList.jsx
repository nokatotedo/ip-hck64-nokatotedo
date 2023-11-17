/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

export default function ClientList({ list, index }) {
  return (
    <tr>
      <td>{ index+1 }</td>
      <td>{list.kosts.name}</td>
      <td>{list.createdAt}</td>
      <td className="info"><Link to={list.url}><span className={list.status === "settlement" ? "active" : "nonactive"}>{list.status}</span></Link></td>
    </tr>
  )
}