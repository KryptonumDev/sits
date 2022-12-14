import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { graphql, useStaticQuery } from "gatsby"
import { Container } from "../atoms/container"
import { csvParser } from './../../helpers/csvParser'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import * as L from "leaflet"
import MapMarker from './../../../static/MapMarker.svg'
import MapMarkerChosen from './../../../static/MapMarkerChosen.svg'
// import { FullscreenControl } from "react-leaflet-fullscreen";
require('react-leaflet-markercluster/dist/styles.min.css')

const retailersTitle = {
    en: 'RETAILERS'
}

const filterTitle = {
    en: 'Country / City / Area'
}

const phoneTitle = {
    en: 'Phone'
}

const buttonTitle = {
    en: 'WEBSITE'
}
let iconPerson
let chosenIcon

if (typeof window !== 'undefined') {

    chosenIcon = new L.Icon({
        iconUrl: MapMarkerChosen,
        iconRetinaUrl: MapMarkerChosen,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: [27, 36],
        iconAnchor: [13.5, 36],
        popupAnchor: [0, -36],
        className: ''
    });

    iconPerson = new L.Icon({
        iconUrl: MapMarker,
        iconRetinaUrl: MapMarker,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: [27, 36],
        iconAnchor: [13.5, 36],
        popupAnchor: [0, -36],
        className: ''
    });
}

export default function Map() {

    const { wpPage: { retailers: { csvFile } } } = useStaticQuery(graphql`
    query {
        wpPage(id: {eq: "cG9zdDozMDkxNA=="}) {
            retailers {
                csvFile {
                  id
                  localFile {
                    publicURL
                  }
                }
            }
        }
    }
  `)

    const [mapCenter] = useState({ Latitude: 52.5144926020739, Longitude: 13.388333544050788 })
    const [retailers, setRetailers] = useState(null)
    const [filtredRetailers, setFiltredRetailers] = useState(null)
    const [filter, changeFilter] = useState('')

    useEffect(() => {
        fetch(csvFile.localFile.publicURL)
            .then(res => res.text())
            .then(data => {
                let arr = csvParser(data)
                setRetailers(arr)
                setFiltredRetailers(arr)
            })
    }, [csvFile.localFile.publicURL])

    useEffect(() => {
        if (retailers) {
            setFiltredRetailers(retailers.filter((el) =>
                el.City.toLowerCase().includes(filter.toLowerCase())
                || el.Country.toLowerCase().includes(filter.toLowerCase())
                || el.Continent.toLowerCase().includes(filter.toLowerCase())
                || el.Address.toLowerCase().includes(filter.toLowerCase())
                || el.Region.toLowerCase().includes(filter.toLowerCase())
            ))
        }
    }, [retailers, filter])

    const [activeDot, setActiveDot] = useState(null)
    const map = useRef()

    useEffect(() => {
        if (activeDot !== null) {
            map.current.setView([filtredRetailers[activeDot].Latitude, filtredRetailers[activeDot].Longitude], 14)
        }
    }, [activeDot])

    const markerClick = (index) => {
        setActiveDot(index)
        const offset = document.getElementById('map-item-' + index).offsetTop
        document.getElementById('map-content').scrollTo(0, offset)
    }

    const itemClick = (index) => {
        setActiveDot(index)
    }

    return (
        <Wrapper>
            <a className="no-focus" href="#footer" aria-label='skip link to footer' />
            <Container>
                <Content>
                    <Title>{retailersTitle['en']}</Title>
                    <InputWrapper>
                        <input value={filter} onChange={(e) => { changeFilter(e.currentTarget.value) }} placeholder={filterTitle['en']} />
                        <svg xmlns="http://www.w3.org/2000/svg" width="19.207" height="18.207" viewBox="0 0 19.207 18.207">
                            <g id="Group_149" data-name="Group 149" transform="translate(-445.619 -133.752)">
                                <g id="Ellipse_23" data-name="Ellipse 23" transform="translate(445.619 133.752)" fill="#fff" stroke="#0b0b0b" strokeWidth="2">
                                    <circle cx="8" cy="8" r="8" stroke="none" />
                                    <circle cx="8" cy="8" r="7" fill="none" />
                                </g>
                                <line id="Line_81" data-name="Line 81" x2="5.053" y2="5.053" transform="translate(459.066 146.199)" fill="none" stroke="#0b0b0b" strokeWidth="2" />
                            </g>
                        </svg>
                    </InputWrapper>
                    <MapItems>
                        <ItemsContent id='map-content'>
                            {filtredRetailers?.map((el, index) => {
                                return (
                                    <Item id={'map-item-' + index} onClick={() => { itemClick(index) }} className={activeDot === index ? 'active' : ''} key={index}>
                                        <p className="">{el['Shop name']}</p>
                                        <p className="l">{el.Address}</p>
                                        <p className="l">{el.City}, {el.Country}</p>
                                        <a href={'tel:' + el.Phone} className="l">{el.Phone}</a>
                                        {(el.Website && el.Website !== ' ') && <a className="link" rel='noopener noreferrer' target='_blank' href={el.Website}>{buttonTitle['en']}</a>}
                                    </Item>
                                )
                            })}
                        </ItemsContent>
                    </MapItems>
                    <MapContainer whenCreated={mapInstance => { map.current = mapInstance }} center={[mapCenter.Latitude, mapCenter.Longitude]} zoom={4} minZoom={3} maxZoom={16} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                        />
                        {/* <FullscreenControl position='topright'/> */}
                        <MarkerClusterGroup showCoverageOnHover={false}>
                            {filtredRetailers?.map((el, index) => (
                                <Marker
                                    key={index}
                                    icon={activeDot === index ? chosenIcon : iconPerson}
                                    position={[el.Latitude, el.Longitude]}
                                    eventHandlers={{
                                        click: () => { markerClick(index) },
                                    }}
                                >
                                </Marker>
                            ))}
                        </MarkerClusterGroup>
                    </MapContainer>
                </Content>
            </Container>
        </Wrapper>
    )
}

const MapItems = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    grid-area: i;
`

const ItemsContent = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow: auto;
    padding-right: 16px;
`

const Item = styled.button`
    border: none;
    background-color: transparent;
    display: block;
    text-align: left;
    width: 100%;

    padding-bottom: 36px;
    padding-top: 36px;
    border-bottom: 1px solid #707070;

    transition: background-color .2s cubic-bezier(0.39, 0.575, 0.565, 1), padding .2s cubic-bezier(0.39, 0.575, 0.565, 1);

    &.active{
        background-color: #F9F5F0;
        padding-left: 20px;
    }

    p,a{
        font-size: 16px;
        line-height: 170%;

        &.l{
            font-weight: 300;
        }

        &.phone{
            margin-top: 16px;
            @media (max-width: 1024px){
                margin-top: 8px;
            }
        }

        &.link{
            text-decoration: underline;
            font-size: 14px;
            display: block;
            margin-top: 16px;
            width: fit-content;
            @media (max-width: 1024px){
                margin-top: 8px;
            }
        }
    }

    @media (max-width: 1024px){
        padding-bottom: 20px;
        padding-top: 20px;
    }
`

const InputWrapper = styled.div`
    margin-top: clamp(32px, ${48 / 1194 * 100}vw,  48px);
    display: grid;
    align-items: flex-end;
    grid-template-columns: 1fr 24px;
    border-bottom: 1px solid #707070;
    padding-bottom: 8px;
    height: 43px;
    grid-area: s;

    input{
        border: none;
        background-color: transparent;
        padding: 11px 0 0 0;
        font-size: 20px;
        font-weight: 300;
    }

    @media (max-width: 864px){
        margin-top: 16px;
    }
`

const Wrapper = styled.section`
    position: relative;
    padding: 45px 0;
    background-color: #FBFAF7;
    margin-bottom: -120px;
    margin-top: clamp(45px, ${120 / 1194 * 100}vw, 160px);

    .leaflet-control{
        border: none;
        box-shadow: 0 3px 6px #00000025;
        span{
            font-family: unset;
            color: #D1D1D1;
        }
    }
    
    /* .leaflet-marker-icon{
        border: none;
        background-color: transparent;
        position: relative;
        svg{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -100%);
        }
    } */

    .marker-cluster{
        background-color: var(--color-brown-light);
        div{
            background-color: var(--color-brown);
            span{
                color: #fff;
                font-weight: 700;
                letter-spacing: 1px;
            }
        }
    }
`

const Content = styled.div`
    display: grid;
    grid-template-columns: 445fr 1370fr;
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
    't m'
    's m'
    'i m';
    grid-gap: 0 16px;
    .leaflet-container{
        height: calc(100vh - 96px);
        position: relative;
        z-index: 0;
        max-width: 1370px;
        grid-area: m;

        @media (max-width: 1024px) {
            height: 600px;
        }

        @media (max-width: 864px){
            height: 400px;
            margin-top: 36px;
        }

        @media (max-width: 400px) {
            height: 350px;
        }
    }

    @media (max-width: 864px) {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto 1fr 1fr;
        grid-template-areas: 
        't'
        's'
        'm'
        'i';
    }
`

const Title = styled.div`
    min-width: clamp(300px, ${392 / 1194 * 100}vw, 445px);
    font-size: 20px;
    font-weight: bold;
    grid-area: t;

    @media (max-width: 400px){
        min-width: unset;
    }
`