import React from "react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./App.css"
import { fetcher } from "../../helpers/fetcher";
import Maps from "../../components/Maps/Maps";
import Product from "../../components/Product/Product";
import Products from "../../components/Products/Products";
import Section from "../Section/Section";
import Header from "../../commons/Header/Header";
import useLocalStorage from "../../hooks/useLocalStorage"

const App =()=>{
  const [products,setProducts] = useState([]);
  const [proShop, setProShop] = useLocalStorage("proShop",[]);
  const [notify,setNotify] = useState([]); 

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
      {/*Header components */}
      <Header proShop={proShop} notify={notify} />
      
      {/* Slider */}

      {/* Products  components */}

      <Section title={"Products"}>
        <Products> 
          {products && products.map(product=>
            <Product 
              key={product.id} 
              id={product.id} 
              title={product.title}
              image={product.image}
              price={product.price}
              onImageClicked={()=>handlImageClick(product.id)}
              onAddClicked={()=>handleAddClick(product.id)}
              /> 
            )
          }
        </Products>
      </Section>
      
      {/* Maps */}
      <Maps />

    </div>
  )
}
export default App;
