import "./Product.css"


const Product =({ id, title, image, price, onImageClicked, onAddClicked })=>{
  return(
    <div key={id} className="product">
      <img src={image} className="product-img" onClick={()=>onImageClicked(id)} alt=""/>
      <h2 className="product-title">{title}</h2>
      <span className="product-price">{price} $</span>
      <button className="product-btn" onClick={()=>onAddClicked(id)}>Add</button>
    </div>
  )
}
export default Product;
