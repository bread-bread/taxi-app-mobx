import * as React from 'react';
import Header from '../../shared/Header';
import mapbox from 'mapbox-gl';
import Order from './Order';
import { withCoordinates } from '../../store/StoreProvider';
import { drawRoute } from './helpers';

import 'mapbox-gl/dist/mapbox-gl.css';
import AppStore from '../../store/AppStore';

type Props = {
  coordinates?: string[];
  resetCoords?: AppStore['resetCoordinates'];
}

class Map extends React.Component<Props> {
  ref = React.createRef<HTMLDivElement | null>();

  map: mapbox.Map = null;

  componentDidMount(){
    mapbox.accessToken = "pk.eyJ1IjoicGFzaGEtcmVlIiwiYSI6ImNrY3dkM3NpZzBjdXYzNG1vejg1bmthemgifQ.AGJze9GF-B-HSOEiEomndw";

    this.map = new mapbox.Map({
        container: this.ref.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [30.3056504, 59.9429126],          
        zoom: 10
    })
  }

  componentDidUpdate(prevProps) {
    const { coordinates } = this.props;
    const { coordinates: prevCoords } = prevProps;
    if (prevCoords !== coordinates) {
      if (this.map && this.map.getLayer('route')) {
        this.map.flyTo({
					center: [30.3056504, 59.9429126],
					zoom: 10
				});
        this.map.removeLayer("route");
				this.map.removeSource("route");
      }

      if (this.map && this.map.isStyleLoaded() && coordinates.length) {
        drawRoute(this.map, coordinates);
      }
    }
  }

  componentWillUnmount(){
    if (this.map) {
      this.map.remove()
    }
  }

  render(): JSX.Element {
    return (
      <div>
        <Header />
        <div
          style={{
            position: "absolute",
            top: '72px',
            right: 0,
            left: 0,
            bottom: 0,
            width: "100%",
            height: 'calc(100% - 72px)'
          }}
          ref={this.ref}
        />
        <Order />
      </div>
    );
  }
}

export default withCoordinates(Map);
