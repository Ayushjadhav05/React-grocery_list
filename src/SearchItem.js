import React from 'react'

const SearchItem = ({search, setSearch}) => {
  return (
    
      <form className="searchForm" onSubmit={(e)=> e.preventDefault(e)}>
        <label htmlFor="Search" className="">Search</label> 
        <input  
          id='search'
          type='text'
          placeholder='Search Items'
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
        /> 
      </form>
    
  )
}
export default SearchItem
