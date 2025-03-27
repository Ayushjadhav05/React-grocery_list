import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import SearchItem from "./SearchItem";
import { useState, useEffect } from "react";
import AddItem from "./AddItem";
import apiRequest from "./apiRequest";

function App() { 
  const API_Url = "http://localhost:3500/items";

  const [item, setItem] = useState(
    JSON.parse(localStorage.getItem("shopingList")) || []
  );

  const [search, setSearch] = useState("");

  const [newItem, setNewItem] = useState("");

  const [fetchError, setFetchError] = useState(null);

  const [isLoading, setIsLodaing] = useState(true);

  useEffect(() => {
    const fetchItems = async () => { 
      try { 
        const response = await fetch(API_Url); 
        if (!response.ok) throw Error("Did not received expected data!");
        const listItems = await response.json(); 
        // console.log(listItems);
        setItem(listItems);
        setFetchError(null); 
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLodaing(false);
      } 
    }; 

    setTimeout(() => {
      fetchItems();
    }, 1000); 
  }, []);

  // const setItem = (newItems) => {
  //   setItem(newItems);
  //   localStorage.setItem("shopingList", JSON.stringify(newItems));
  // };

  const addItem = async (newItemText) => {
    const id = item.length ? item[item.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item: newItemText }; // fixed property name here
    const listItems = [...item, myNewItem];
    setItem(listItems); 

    const postOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(myNewItem),
    };
    const result = await apiRequest(API_Url, postOptions);
    if (result) setFetchError(result);
  };

  const handlecheck = async (id) => {
    const listItems = item.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItem(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    const reqUrl = `${API_Url}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  }


  const handleDelete = async(id) => {
    const listItems = item.filter((item) => item.id !== id);
    setItem(listItems);

    const deleteOptions = {
      method: 'DELETE'
    };
    const reqUrl = `${API_Url}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  const handlesubmit = (e) => { 
    e.preventDefault();
    if (!newItem) return;
    console.log(newItem);
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      <Header />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handlesubmit={handlesubmit}
      />

      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading && <p>Is Loading...</p>}
        {fetchError && (
          <p style={{ color: "red" }}>{`Error : ${fetchError}`}</p>
        )}
        {!fetchError && !isLoading && (
          <Content
            item={item.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handlecheck={handlecheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={item.length} />
    </div>
  );
}

export default App;
