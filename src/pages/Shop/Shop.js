import "./Shop.css"
import { useState } from "react"
const Shop =({ products })=>{
  const [count,setCount] = useState(1);
  const handleAddOne=()=>{
    setCount(count + 1)
  }
  const handleRemoveOne=()=>{
    if (count === 1){
      setCount(1)
    }else{
      setCount(count - 1)
    }

  }
  return(
    <div className="shop">
      {products.map(product=>
        <div key={product.id} className="product-shop">
          <img src={product.image} className="product-shop-image" alt=""/>
          <h2 className="product-shop-title">{product.title}</h2>
          <div className="shop-content">
            <button className="add-one" onClick={handleAddOne}>+</button>
            <span className="count-product">{count}</span>
            <button className="remove-one" onClick={handleRemoveOne}>-</button>
          </div>
          <div className="del-btn">
            <button onClick={()=>onDeleteClicked(product.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
     
  )
}
export default Shop;
