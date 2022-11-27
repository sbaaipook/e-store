import React, { createContext } from "react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./App.css"
import { fetcher } from "../../helpers/fetcher";
import Header from "../../commons/Header/Header";
import useLocalStorage from "../../hooks/useLocalStorage"
import Home from "../../pages/Home/Home";
import Shop from "../../pages/Shop/Shop"
import { 
  BrowserRouter as Router,
  Routes,
  Route
} 
from "react-router-dom"


export const ProShopContext = createContext()
const App =()=>{

  const [products,setProducts] = useState([]);
  const [proShop, setProShop] = useLocalStorage("proShop",[]);
  const [notify,setNotify] = useLocalStorage("notify",[]); 

  useEffect(()=>{
        const fetchData = async ()=>{
          const data = await fetcher("/products?limit=5");
          setProducts(data);
        } 
        fetchData()
  },[])
  
  const handleAddClick = id =>{
    const fetchData = async ()=>{
        const data = await fetcher("/products/"+id)
      
        if (notify.indexOf(data.id) === -1){ 
          setProShop([...proShop,data])
          setNotify([...notify,data.id])
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${data.title} has added !`,
            showConfirmButton: false,
            timer: 1500,
            iconColor: 'orange'
          })
        }
      }
    fetchData();
  }

  const handlImageClick=id=>{
    const fetchData = async () =>{
        const data = await fetcher("/products/"+id)
        Swal.fire({
          title: data.title,
          text: data.description,
          imageUrl: data.image,
          imageWidth: 300,
          imageHeight: 500,
          imageAlt: 'Custom image',
          confirmButtonColor: 'orange',
        })
      }
    fetchData();
  }

  return(
    <div className="app">
      <Router>
        <Header proShop={proShop} notify={notify} />
        <Routes>
          <Route path="/" element={<Home products={products} addClick={handleAddClick} imageClick={handlImageClick} />}/>
          <Route 
            path={"/cart"} 
            element={
            <ProShopContext.Provider value={proShop}>
              <Shop onDeleteClicked={()=>console.log("well")} />
            </ProShopContext.Provider>  
          }/>
        </Routes>
      </Router>
    </div>
  )
}
export default App;
