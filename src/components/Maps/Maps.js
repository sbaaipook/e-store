import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import { useCallback, useState } from "react"
import "./Maps.css"



const containerStyle = {
  width: '600px',
  height: '500px'
};

const center = {
  lat: 30.925360,
  lng: -6.904081
}

const Maps =()=>{
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    region: "Morocco",
    googleMapsApiKey: "AIzaSyDtGJ3eQC9SiY0-db6ymPUc0Rt6xnMsMeU"
  })
  
  const [map, setMap] = useState(null)
  console.log(map)
  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return(
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
  )
}
export default Maps;
