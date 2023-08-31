import React, { useEffect } from "react";
import WorldMap from "./components/WorldMap";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations, selectDecodedLocations } from "./redux/locationsSlice";
import swLogo from "./assets/star_wars_logo.png";

const App = () => {
  const center = [10, 0];
  const dispatch = useDispatch();
  const decodedLocations = useSelector(selectDecodedLocations);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  return (
    <>
      <section>
        <center>
          <img className="sw-logo" src={swLogo} alt="Star Wars Logo" />
          <p>
            Click on the map to set your distance and find out who is closer to
            you in distance.
          </p>
        </center>
        <WorldMap
          locations={decodedLocations}
          mapHeight={450}
          center={center}
        />
      </section>
    </>
  );
};

export default App;
