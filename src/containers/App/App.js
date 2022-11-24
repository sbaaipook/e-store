import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import "./App.css"



const containerStyle = {
  width: '600px',
  height: '500px'
};

const center = {
  lat: 30.925360,
  lng: -6.904081
}

const App =()=>{
  const [products,setProducts] = useState([]);
  const [proShop, setProShop] = useState([]);
  const [notify,setNotify] = useState([]); 
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    region: "Morocco",
    googleMapsApiKey: "AIzaSyDtGJ3eQC9SiY0-db6ymPUc0Rt6xnMsMeU"
  })
  
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  useEffect(()=>{
    axios.get("https://fakestoreapi.com/products?limit=6")
      .then(res=>{
        console.log(res.data)
        setProducts(res.data)
      })
  },[])
  
  const handleAddClick = id =>{
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res=>{
        console.log(res.data)
        
        if (notify.indexOf(res.data.id) === -1){ 
          setProShop([...proShop,res.data])
          setNotify([...notify,res.data.id])
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${res.data.title} has added !`,
            showConfirmButton: false,
            timer: 1500,
            iconColor: 'orange'
          })
        }
      })
  }

  const handlImageClick=id=>{
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res=>{
        Swal.fire({
          title: res.data.title,
          text: res.data.description,
          imageUrl: res.data.image,
          imageWidth: 300,
          imageHeight: 500,
          imageAlt: 'Custom image',
          confirmButtonColor: 'orange',
})
      })
  }

  return(
    <div className="app">
      {/*Header components */}

      <header className="navbar">
        <h3 className="navbar-logo">Store</h3>
        <nav className="navbar-nav">
          <ul className="navbar-items">
            <li className="navbar-item"><a href="/" className="navbar-link">Acceuil</a></li>
            <li className="navbar-item"><a href="/products" className="navbar-link">Products</a></li>
            <li className="navbar-item craft"><a href="/craft" className="navbar-link">Craft</a><span className={proShop.length===0?"desible-notify":"notify"}>{notify.length}</span></li>
          </ul>
        </nav>
      </header>
      
      {/* Slider */}

      {/* Products  components */}

      <section className="container">
        <h1 className="section-title">Products</h1>
        <div className="products">
          {products && products.map(product=>
            <div key={product.id} className="product">
              <img src={product.image} className="product-img" onClick={()=>handlImageClick(product.id)} alt=""/>
              <h2 className="product-title">{product.title}</h2>
              <span className="product-price">{product.price} $</span>
              <button className="product-btn" onClick={()=>handleAddClick(product.id)}>Add</button>
            </div>
            )
          }
        </div>
      </section>
      
      {/* Maps */}

      <section className="container">
        <h1 className="section-title">Maps</h1>
        <div className="maps">
          {isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>}
        </div>
      </section>

    </div>
  )
}
export default App;
