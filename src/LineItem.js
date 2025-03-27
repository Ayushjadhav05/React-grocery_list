import React from 'react'
import { FaTrashAlt } from "react-icons/fa";

const LineItem = ({item , handlecheck , handleDelete}) => {
  return (
    <li className="item" /*key={item.id}*/ >
              <input
                className=""
                type="checkbox"
                onChange={() => handlecheck(item.id)}
                checked={item.checked}
              />
              <label
                onClick={() => handlecheck(item.id)}
                style={item.checked ? { textDecoration: "line-through" } : null}
              >
                {item.item}
              </label>
              <FaTrashAlt
                onClick={() => handleDelete(item.id)}
                role="button"
                tabIndex={0}
                aria-label={`delete ${item.item}`}
              />
            </li>
  )
}

export default LineItem
