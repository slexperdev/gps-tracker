import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { Spinner } from "@material-tailwind/react";
import GoogleMapReact from "google-map-react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { geocode, RequestType } from "react-geocode";

import { db } from "../../firebase.init";
import { Constant } from "../../Constant";

import { Navbar } from "../../Components";

export default function Dashboard() {
  const [defaultProps, setDefaultProps] = useState({
    center: {
      lat: null,
      lng: null,
    },
    zoom: 15,
  });
  const [address, setAddress] = useState(null);
  const [temp, setTemp] = useState(null);

  useEffect(() => {
    return () => {
      getLocation();
      getTemp();
    };
  }, []);

  const getLocation = () => {
    const dbRef = ref(db, "GPS_Data");

    onValue(dbRef, (snapshot) => {
      const value = snapshot.val();
      const latitude = parseFloat(value.Latitude);
      const longitude = parseFloat(value.Longitude);
      setDefaultProps({
        ...defaultProps,
        center: {
          lat: latitude,
          lng: longitude,
        },
      });
      getLocationAddress(latitude, longitude);
    });
  };

  const getTemp = () => {
    const dbRef = ref(db, "TEMP_Data");

    onValue(dbRef, (snapshot) => {
      const value = snapshot.val();
      setTemp(value.temperatureC);
    });
  };

  const getLocationAddress = (lat, long) => {
    const cords = `${lat},${long}`;
    geocode(RequestType.LATLNG, cords, {
      key: Constant.GOOGLE_API_KEY,
      language: "en",
      region: "us",
    })
      .then(({ results }) => {
        const address = results[0].formatted_address;
        setAddress(address);
      })
      .catch(console.error);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col">
        {defaultProps.center.lat === null ? (
          <div className="flex flex-col items-center justify-center flex-1">
            <Spinner className="h-12 w-12" color="green" />
          </div>
        ) : (
          <div className="h-screen w-full relative">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: Constant.GOOGLE_API_KEY,
              }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <MapPinIcon width={40} color="red" />
            </GoogleMapReact>

            <div className="absolute top-5 left-5">
              <div className="bg-white drop-shadow-md rounded-lg flex items-center justify-center py-5 px-8">
                <div className="flex flex-col gap-2">
                  <p className="text-sm italic text-gray-500 mb-5">
                    Real time data from GPS tracker
                  </p>
                  <p className="text-md text-gray-600">
                    Latitude:{"   "}
                    <span className="text-red-500">
                      {defaultProps.center.lat}
                    </span>
                  </p>
                  <p className="text-md text-gray-600">
                    Longitude:{"   "}
                    <span className="text-red-500">
                      {defaultProps.center.lng}
                    </span>
                  </p>
                  <p className="text-md text-gray-600">
                    Address:{"   "}
                    <span className="text-red-500">{address}</span>
                  </p>
                  <p className="text-md text-gray-600">
                    Temperature:{"   "}
                    <span className="text-red-500">{temp} C°</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
