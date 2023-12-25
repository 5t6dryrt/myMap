import React, { useState } from 'react';
import { useControl, Marker } from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

export default function GeocoderControl(props) {
  const [marker, setMarker] = useState(null);

  const geocoder = useControl(
    () => {
      const ctrl = new MapboxGeocoder({
        ...props,
        marker: false,
        accessToken: props.mapboxAccessToken
      });

      ctrl.on('loading', props.onLoading);
      ctrl.on('results', props.onResults);
      ctrl.on('result', evt => {
        props.onResult(evt);

        const { result } = evt;
        const location = result && (result.center || (result.geometry?.type === 'Point' && result.geometry.coordinates));
        if (location && props.marker) {
          setMarker(<Marker {...props.marker} longitude={location[0]} latitude={location[1]} />);
        } else {
          setMarker(null);
        }
      });
      ctrl.on('error', props.onError);
      return ctrl;
    },
    {
      position: props.position
    }
  );

  if (geocoder._map) {
    // The following are settings adjustments; you can extend or modify these as needed
    if (geocoder.getProximity() !== props.proximity && props.proximity !== undefined) {
      geocoder.setProximity(props.proximity);
    }
    // ... Other geocoder settings checks
  }

  return marker;
}

// Default props
GeocoderControl.defaultProps = {
  marker: true,
  onLoading: () => {},
  onResults: () => {},
  onResult: () => {},
  onError: () => {}
};
