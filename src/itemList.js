
import React from 'react'
// import { FaTrashAlt } from "react-icons/fa";
import LineItem from './LineItem';

const itemList = ({item , handlecheck , handleDelete}) => {
  return (

    <ul>
          {item.map((item) => (
            <LineItem  key={item.id} item={item} handleDelete={handleDelete} handlecheck={handlecheck} />
          ))}
        </ul>
  )
}

export default itemList
