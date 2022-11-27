import Section from "../../containers/Section/Section";
import Product from "../../components/Product/Product";
import Products from "../../components/Products/Products";
import Maps from "../../components/Maps"
import Slider from "../../components/Slider/Slider"
import "./Home.css"

const slides = [
  {url:'http://localhost:3000/image-1.jpg',title:"p1"}, 
  {url:'http://localhost:3000/image-2.jpg',title:'p2'},
  {url:'http://localhost:3000/image-3.jpg',title:'p3'}
]

const Home =({ addClick, imageClick, products})=>{
  return(
    <div className="home">
      <Slider slides={slides} />
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

