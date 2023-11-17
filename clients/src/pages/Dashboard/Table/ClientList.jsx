/* eslint-disable react/prop-types */

export default function ClientList({ list, index }) {
  return (
    <tr>
      <td>{ index+1 }</td>
      <td>{list.kosts.name}</td>
      <td>{list.createdAt}</td>
      <td className="info"><span className={list.status === "settlement" ? "active" : "nonactive"}>{list.status}</span></td>
    </tr>
  )
}