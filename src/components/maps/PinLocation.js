import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
// import image from "../../assets/icons/pin.png";
import image from "../../assets/trash.png"
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
// import image2 from "../../assets/icons/image2.png";
// import cross from "../../assets/icons/crossIcon.svg";

import Modal from '@mui/material/Modal';
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 29.3117,
  lng: 47.4818,
};

const center2 = {
  lat: 48.8428,
  lng: 2.4179,
};

const PinLocation = () => {
  const [address, setAddress] = useState([]);
  // const [addresses, setAddresses] = useState([]);
  // console.log("add", address);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCUojSPU_m-yCXQOIv5aBt4wc1zXe0cHXI",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds({
      lat: currentLatitude,
      lng: currentLongitude,
    });
    map.setZoom(5);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  var lati;
  var longi;
  // const [show, setShow] = useState(false);
  // console.log("show",show)
  const [currentLatitude, setCurrentLatitude] = useState();
  const [currentLongitude, setCurrentLongitude] = useState();
  console.log("Latitude is :", currentLatitude);
  console.log("Longitude is :", currentLongitude);
  const [currentAddress, setCurrentAddress] = useState();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrentLatitude(position.coords.latitude);
      setCurrentLongitude(position.coords.longitude);
    });
  }, []);
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=24.860966,66.990501&key=AIzaSyCUojSPU_m-yCXQOIv5aBt4wc1zXe0cHXI`
  //       // "https://maps.googleapis.com/maps/api/geocode/json?latlng=${},67.1128551&key=AIzaSyDgNhGdb3o38JyBRJVHHqYNv4VyqqiUihg"
  //     )
  //     .then((res) => {
  //       setCurrentAddress(res?.data?.results[0].formatted_address);
  //       console.log(res?.data?.results[0].formatted_address);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [currentLatitude, currentLongitude]);
  return isLoaded ? (
    <Modal size="lg" open={true}
    // onHide={()=>{setShowModal(false);setShow(false);}}
    >
      <Modal.Body>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {" "}
          {/* <img
            style={{
              width: "30px",
              height: "30px",
            }}
            onClick={() => {
              console.log("clicked");
              setShow(false);
              setShowModal(false);
            }}
            src={cross}
            alt=""
          /> */}
        </div>

        <>
          {/* <div>
            <GooglePlacesAutocomplete
              fetchDetails={true}
              GooglePlacesDetailsQuery={{ fields: "geometry" }}
              selectProps={{
                placeholder: currentAddress,

                address,
                onChange: (res) => {
                  var add = res.label;
                  geocodeByAddress(add)
                    .then((results) => getLatLng(results[0]))
                    .then(({ lat, lng }) => {
                      setAddresses([
                        ...addresses,
                        {
                          latitude: lat,
                          longitude: lng,
                          companyAddress: add,
                        },
                      ]);
                      console.log("Successfully got latitude and longitude", {
                        lat,
                        lng,
                        add,
                      });
                    });
                  res.label = null;
                },
              }}
            />
          </div> */}
          <div>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "400px" }}
              center={{ lat: 24.860966, lng: 66.990501 }}
              zoom={10}
              // onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {/* {data?.map((item) => { */}
              {/* return ( */}

              {/* ); */}
              {/* })} */}

              {/* {addresses?.map((item) => {
                return (
                  <Marker
                    position={{
                      lat: Number(item?.latitude),
                      lng: Number(item?.longitude),
                    }}
                    icon={{
                      url: image2,
                    }}
                  />
                );
              })} */}
            
                <Marker
                  draggable={true}
                  onDragEnd={(e) => {
                    setCurrentLatitude(e.latLng.lat());
                    setCurrentLongitude(e.latLng.lng());
                  }}
                  position={{
                    lat: Number(currentLatitude),
                    lng: Number(currentLongitude),
                  }}
                  // position={{ lat: 24.9005804, lng: 67.1128551 }}

                  icon={{
                    // path: google.maps.SymbolPath.CIRCLE,
                    url: image,
                  }}
                />
              

              <></>
            </GoogleMap>
          </div>
     
        </>
      </Modal.Body>
    </Modal>
  ) : null;
};
export default PinLocation;