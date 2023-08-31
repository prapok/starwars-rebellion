import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import userMarkerIconImage from "../assets/user-marker3.png"; // custom user marker icon image
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
// Redux actions
import { setUserMarker } from "../redux/userMarkerSlice";
import {
  fetchEntityData,
  setFetchedEntities,
} from "../redux/fetchedEntitiesSlice";

delete L.Icon.Default.prototype._getIconUrl; // deletes leaflet default icons

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const icon = new L.Icon({
  iconUrl: userMarkerIconImage, // Use the imported user marker icon image
  iconSize: [32, 32], // Adjust the size as needed
});

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
};

const WorldMap = ({ locations, mapHeight, center }) => {
  const dispatch = useDispatch();
  const userMarker = useSelector((state) => state.userMarker);
  const fetchedEntities = useSelector((state) => state.fetchedEntities);
  const [userMarkerIcon, setUserMarkerIcon] = useState(null);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    dispatch(setUserMarker({ lat, long: lng }));
    setUserMarkerIcon(icon);
    dispatch(setFetchedEntities([]));
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  const userEntities = locations.map((entity) => ({
    ...entity,
    distance: calculateDistance(
      userMarker.lat,
      userMarker.long,
      entity.lat,
      entity.long
    ),
  }));

  userEntities.sort((a, b) => a.distance - b.distance);

  useEffect(() => {
    const fetchDataForEntities = async () => {
      if (userMarker.lat !== 0) {
        const fetchedData = [];
        for (const entity of userEntities) {
          const response = await dispatch(fetchEntityData(entity.id));
          if (fetchEntityData.fulfilled.match(response)) {
            const fetchedEntityWithDistance = {
              ...response.payload,
              distance: entity.distance,
            };
            fetchedData.push(fetchedEntityWithDistance);
          }
        }
        dispatch(setFetchedEntities(fetchedData));
      }
    };

    fetchDataForEntities();
  }, [userEntities, userMarker, dispatch]);

  return (
    <>
      <div className="container">
        <MapContainer
          center={center}
          zoom={2}
          style={{ height: mapHeight }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            noWrap="true"
          />
          <MapClickHandler />

          {locations.map((location, index) => (
            <Marker key={index} position={[location.lat, location.long]} />
          ))}

          {userMarker &&
            userMarkerIcon && ( // Render user marker if it exists
              <Marker
                position={[userMarker.lat, userMarker.long]}
                icon={userMarkerIcon}
              >
                <Popup>
                  Lat:{userMarker.lat.toFixed(2)}, Long:{" "}
                  {userMarker.long.toFixed(2)}
                </Popup>
              </Marker>
            )}
        </MapContainer>
      </div>

      {userMarker.lat !== 0 && fetchedEntities.length > 0 && (
        <div className="mx-auto max-w-screen-lg w-1000px">
          <h1 className="text-center">In Closest Distance from You</h1>

          <div className="flex flex-wrap">
            {fetchedEntities.map((entity, index) => (
              <div className="w-full md:w-1/2 p-2 flex" key={index}>
                <UserCard user={entity} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default WorldMap;
