import React, { useEffect, useRef } from "react"
import { Marker, Popup } from 'react-leaflet'
import * as L from "leaflet"
import MapMarkerSVG from './../../../static/MapMarker.svg'
import MapMarkerChosenSVG from './../../../static/MapMarkerChosen.svg'
import { buttonTitle } from "../../texts/map"

let iconPerson
let chosenIcon

if (typeof window !== 'undefined') {

    chosenIcon = new L.Icon({
        iconUrl: MapMarkerChosenSVG,
        iconRetinaUrl: MapMarkerChosenSVG,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: [27, 36],
        iconAnchor: [13.5, 36],
        popupAnchor: [0, -36],
        className: ''
    });

    iconPerson = new L.Icon({
        iconUrl: MapMarkerSVG,
        iconRetinaUrl: MapMarkerSVG,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: [27, 36],
        iconAnchor: [13.5, 36],
        popupAnchor: [0, -36],
        className: ''
    });
}

export default function MapMarker({ language, isActive, markerClick, index, el, map }) {
    let popupRef = useRef();

    if (isNaN(el.Latitude) || isNaN(el.Longitude)) {
        console.log(el.name + ' has wrong coordinates')
    }

    useEffect(() => {
        if (isActive && popupRef?.current) {
            popupRef.current.openOn(map.current)
        }
    }, [isActive, map, popupRef])

    return (
        <Marker
            icon={isActive ? chosenIcon : iconPerson}
            position={[el.Latitude, el.Longitude]}
            eventHandlers={{
                click: () => { markerClick(index) },
            }}
        >
            <Popup ref={popupRef}>
                <div>
                    <p className="p">{el['Shop name']}</p>
                    <p className="p-l">{el.Address}</p>
                    <p className="p-l">{el.City ? el.City + ', ' : ''}{el.Country}</p>
                    <a href={'tel:' + el.Phone} className="p-l phone">{el.Phone}</a>
                </div>
                {(el.Website && el.Website !== ' ') && <a className="link underline" rel='noopener noreferrer nofollow' target='_blank' href={el.Website}>{buttonTitle[language]}</a>}
            </Popup>
        </Marker>
    )
}