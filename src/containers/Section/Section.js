import "./Section.css"

const Section =({ title, children })=>{
  return(
    <section className="container">
      <h1 className="section-title">{title}</h1>
      { children }
    </section>
  )
}
export default Section;
