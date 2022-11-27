import useLocalStorage from "../../hooks/useLocalStorage/useLocalStorage"
import { useContext, useState } from "react"
import { ProShopContext } from "../../containers/App/App"
import "./Shop.css"



const Shop =({onDeleteClicked })=>{
  



  const products = useContext(ProShopContext)
  const [ total,setTotal ] = useLocalStorage("total",0)
  return(
    <div className="shop">
      {products.map(product=>
        <ProShop
          key={product.id}
          product={product} 
          onDeleteClicked={onDeleteClicked}
        />)}
      <div>
        <p>Total : {total}</p>
        <button>Buy</button>
      </div>
    </div>
     
  )
}
export default Shop;


const ProShop =({ product, onDeleteClicked })=>{

  
  const [ count, setCount ] = useState(1)

  return(
     <div className="product-shop">
          <img src={product.image} className="product-shop-image" alt=""/>
          <h2 className="product-shop-title">{product.title}</h2>
          <p>{product.price*count} $</p>
          <div className="shop-content">
            <button className="remove-one" onClick={()=>{count>1?setCount(count - 1):setCount(1)}}>-</button>
            <span className="count-product">{count}</span>
            <button className="add-one" onClick={()=>{setCount(count + 1)}}>+</button>
          </div>
          <div className="del-btn">
            <button onClick={()=>onDeleteClicked(product.id)}>Delete</button>
          </div>
        </div>

  )
} 
