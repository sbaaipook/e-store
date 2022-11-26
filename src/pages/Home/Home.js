import Section from "../../containers/Section/Section";
import Product from "../../components/Product/Product";
import Products from "../../components/Products/Products";
import Maps from "../../components/Maps"
import Slider from "../../components/Slider/Slider"
import "./Home.css"

const Home =({ addClick, imageClick, products})=>{
  return(
    <div className="home">
      <Slider/>
      <Section title={"Products"}>
        <Products> 
          {products && products.map(product=>
            <Product 
              key={product.id} 
              id={product.id} 
              title={product.title}
              image={product.image}
              price={product.price}
              onImageClicked={()=>imageClick(product.id)}
              onAddClicked={()=>addClick(product.id)}
              /> 
            )
          }
        </Products>
      </Section>
      <Maps />
    </div>
  )
}

export default Home;

