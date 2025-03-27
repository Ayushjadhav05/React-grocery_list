import React from "react";
import ItemList from "./itemList";

function Content({item , handlecheck , handleDelete}) {
  
  return ( 
    < >
      {item.length ? (
        <ItemList item={item} handleDelete={handleDelete} handlecheck={handlecheck}/>
      ) : (
        <p style={{ marginTop:"2rem" }}>List is Empty.</p>
      )}
    </>
  );
}
export default Content;
