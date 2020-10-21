import React, { Component } from 'react'
import { Map as LeafletMap, Marker, TileLayer, Popup } from 'react-leaflet'

class GelMap extends Component {
  render() {
    const position = [44.390384, -79.684633]
    const accessToken = 'pk.eyJ1IjoiZ2VsYWdlbmN5IiwiYSI6ImNqdDRxczNpcjA0M2E0M3RlNnI2czZlbXgifQ.zErWHDn2YAu4Y7twTTqG1w'

    if(typeof(window) !== 'undefined') {
      return (
        <LeafletMap
          center={position}
          tileSize={512}
          zoom={16}
          maxZoom={18}
          style={{ height: '300px' }}
        >
          <TileLayer
            id='mapbox/streets-v11'
            accessToken={accessToken}
            url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          />
          <Marker
            position={position}
          >
            <Popup>
            89 Collier Street, Suite 201 <br />Barrie, ON L4M 1H2
            </Popup>
          </Marker>
        </LeafletMap>
      )
    }
    return null
  }
}

export default GelMap