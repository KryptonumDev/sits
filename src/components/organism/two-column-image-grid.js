import { GatsbyImage } from "gatsby-plugin-image"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { ImageGridItem } from "../moleculas/image-grid-item"
import { Popup } from "../moleculas/popup"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import AddToFauvorite from "../atoms/add-to-favourite"
import { AnimatePresence, motion } from "framer-motion"
import { inThisImage } from "../../texts"



export const TwoColumnImageGrid = ({ language, sliderAnimation, gallery, popupNames, collectionPagePreviewImage, products, title }) => {
    const [isPopUpOpened, setPopUpOpened] = useState(false)

    var settings = {
        infinite: true,
        fade: true,
        dots: true,
        arrows: false,
        slidesToShow: 1,
    };

    const [popUpImages, setPopImages] = useState(() => {
        let images = []

        products.forEach((el, index) => {
            el.products.productGallery.forEach((el, inIndex) => {
                el.productsImages.forEach(inInEl => {
                    images.push({ image: inInEl.featuredProductImage, popupNames: el.popupNames, idProduct: String(index) + String(inIndex) })
                })
            })
        })

        if (collectionPagePreviewImage) {
            let mainProduct = products.length + '0'

            images.every(el => {
                let elpopupNames = {}
                for (let key in el.popupNames) {
                    elpopupNames[key] = el.popupNames[key]?.replace(/\s/g, '')
                }

                let locpopupNames = {}
                for (let key in el.popupNames) {
                    locpopupNames[key] = popupNames[key]?.replace(/\s/g, '')
                }

                if (JSON.stringify(elpopupNames) === JSON.stringify(locpopupNames)) {
                    mainProduct = el.idProduct
                    return false
                }

                return true
            })

            images.unshift({ image: collectionPagePreviewImage, popupNames: popupNames, idProduct: mainProduct })

            // search for images with same idProduct and push them to the start of array
            images.forEach((el, index) => {
                if (el.idProduct === mainProduct && index !== 0) {
                    images.splice(index, 1)
                    images.splice(1, 0, el)
                }
            })
        }
        return images
    })

    useEffect(() => {
        if (isPopUpOpened) {
            let arr = []
            let chosenModel = popUpImages.filter(el => el.image.title === isPopUpOpened)[0].idProduct
            
            popUpImages.forEach(el => {
                if (el.image.title === isPopUpOpened) {
                    arr.unshift(el)
                    return
                }
                arr.push(el)
            })

            // unshift all images with chosen model to position after first image
            arr.forEach((el, index) => {
                if (el.idProduct === chosenModel && index !== 0) {
                    arr.splice(index, 1)
                    arr.splice(1, 0, el)
                }
            })

            document.getElementById('popup').scrollTo(0, 0);
            setPopImages(arr)
        }
    }, [isPopUpOpened])

    const [mouseMoved, setMouseMoved] = useState(false)

    const handleClick = (el) => {
        if (!mouseMoved) {
            setPopUpOpened(el.image.title)
        }
    }

    const [rerender, setRerender] = useState(false)

    return (
        <Box variants={sliderAnimation}>
            <AnimatePresence mode='wait'>
                {isPopUpOpened && (
                    <Popup id='popup' title={title} setPopUpOpened={setPopUpOpened} isPopUpOpened={isPopUpOpened}>
                        <PopupGrid>
                            {popUpImages?.map((el, index) => (
                                <React.Fragment key={el.popupNames.model + index}>
                                    <ImageGridItem language={language} setRerender={setRerender} rerender={rerender} image={el.image} popupNames={el.popupNames} />
                                </React.Fragment>
                            ))}
                        </PopupGrid>
                    </Popup>
                )}
            </AnimatePresence>
            <Wrapper>
                {collectionPagePreviewImage
                    ? <>
                        {(() => {
                            let { popupNames } = popUpImages.filter(inEl => inEl.image.title === collectionPagePreviewImage.title)[0]
                            return (
                                <div className="image-wrap">
                                    <AddToFauvorite language={language} setRerender={setRerender} rerender={rerender} type={'products'} title={popupNames.model} />
                                    <button aria-label='open pop-up with images' onClick={() => { setPopUpOpened(collectionPagePreviewImage.title) }}>
                                        <GatsbyImage image={collectionPagePreviewImage.localFile.childImageSharp.gatsbyImageData} alt={collectionPagePreviewImage.altText} />
                                        <span className="in"> {inThisImage[language]} <b>+</b> </span>
                                    </button>
                                </div>
                            )
                        })()}
                    </>
                    : null}
                <ImagesGrid>
                    {gallery?.map((el, index) => {
                        let popUp = popUpImages.filter(inEl => inEl.image.title === el.title)
                        if (popUp.length === 0) {
                            return (
                                <div className="image-wrap">
                                    <button key={el.title + index} aria-label='open pop-up with images' onClick={() => { setPopUpOpened(popUpImages[0].title) }}>
                                        <GatsbyImage className="image" image={el.localFile.childImageSharp.gatsbyImageData} alt={el.altText} />
                                    </button>
                                </div>
                            )
                        }
                        return (
                            <div className="image-wrap">
                                <AddToFauvorite language={language} setRerender={setRerender} rerender={rerender} type={'products'} title={popUp[0].popupNames.model} />
                                <button key={el.title + index} aria-label='open pop-up with images' onClick={() => { setPopUpOpened(el.title) }}>
                                    <GatsbyImage className="image" image={el.localFile.childImageSharp.gatsbyImageData} alt={el.altText} />
                                    <span className="in"> {inThisImage[language]} <b>+</b> </span>
                                </button>
                            </div>
                        )
                    })}
                </ImagesGrid>
            </Wrapper>
            <SliderWrapper>
                <Slider {...settings}>
                    {/* {collectionPagePreviewImage
                        ? <button
                            aria-label='open pop-up with images'
                            onMouseMove={() => setMouseMoved(true)}
                            onMouseDown={() => setMouseMoved(false)}
                            onMouseUp={() => handleClick(collectionPagePreviewImage)}
                        >
                            <GatsbyImage className="image" image={collectionPagePreviewImage.localFile.childImageSharp.gatsbyImageData} alt={collectionPagePreviewImage.altText} />
                            <span className="in">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                    <g id="Group_510" data-name="Group 510" transform="translate(-1557.5 -1810.5)">
                                        <line id="Line_134" data-name="Line 134" y2="14" transform="translate(1564.5 1810.5)" fill="none" stroke="#31231e" strokeWidth="1.5" />
                                        <line id="Line_137" data-name="Line 137" y2="14" transform="translate(1571.5 1817.5) rotate(90)" fill="none" stroke="#31231e" strokeWidth="1.5" />
                                    </g>
                                </svg>
                            </span>
                        </button>
                        : null} */}
                    {popUpImages?.map((el, index) => (
                        <button
                            key={el.image.title + index}
                            aria-label='open pop-up with images'
                            onMouseMove={() => setMouseMoved(true)}
                            onMouseDown={() => setMouseMoved(false)}
                            onMouseUp={() => handleClick(el)}
                        >
                            <GatsbyImage className="image" image={el.image.localFile.childImageSharp.gatsbyImageData} alt={el.altText} />
                            <span className="in">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                                    <g id="Group_510" data-name="Group 510" transform="translate(-1557.5 -1810.5)">
                                        <line id="Line_134" data-name="Line 134" y2="14" transform="translate(1564.5 1810.5)" fill="none" stroke="#31231e" strokeWidth="1.5" />
                                        <line id="Line_137" data-name="Line 137" y2="14" transform="translate(1571.5 1817.5) rotate(90)" fill="none" stroke="#31231e" strokeWidth="1.5" />
                                    </g>
                                </svg>
                            </span>
                        </button>
                    ))}
                </Slider>
            </SliderWrapper>
        </Box>
    )
}

const Box = styled(motion.div)`
    .in{
        background-color: #F9F5F0;
    }

    .slick-slide{
        transition: opacity var(--animation) !important;
        pointer-events: none;

        &.slick-active{
            pointer-events: all;
        }
    }
`

const SliderWrapper = styled.div`
    width: calc(100% + 90px);
    margin: 0 -45px 36px -45px;
    display: none;
    transform: translateY(-2px);

    @media (max-width: 1024px) {
        display: block;

        .image{
            img{
                margin: 0 auto;
                max-width: fit-content;
            }
        }
    }

    @media (max-width: 768px) {
        width: calc(100% + 48px);
        margin: 0 -24px 36px -24px;
    }

    .image{
        width: 100%;
        aspect-ratio: 1.51750972763;
    }

    .slick-dots{
        li{
            &::before{
                content: "";
                position: absolute;
                left: 2px;
                right: 2px;
                bottom: 2px;
                top: 2px;
                border-radius: 50%;
                border: 1px solid black;
                opacity: 0;
                transition: opacity .4s cubic-bezier(0.39, 0.575, 0.565, 1);
            }

            &.slick-active::before{
                opacity: 1;
            }
        }
    }

    button{
        border: none;
        background-color: transparent;
        margin-bottom: clamp(10.13px, ${10.13 / 1024 * 100}vw, 20.58px);
        position: relative;
        cursor: pointer;

        span{
            font-size: 18px;
            font-weight: 300;
            position: absolute;
            width: clamp(26px, ${40 / 768 * 100}vw, 40px);
            height: clamp(26px, ${40 / 768 * 100}vw, 40px);
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            right: 20px;
            bottom: 20px;
            transition: opacity .5s cubic-bezier(0.42, 0, 0.58, 1);

            b{
                font-size: 24px;
                font-weight: 700;
            }

            &::after{
                content: "";
                position: absolute;
                right: -4px;
                left: 4px;
                bottom: -4px;
                height: 1px;
                background-color: #31231E;
            }

            &::before{
                content: "";
                position: absolute;
                right: -4px;
                top: 4px;
                bottom: -4px;
                width: 1px;
                background-color: #31231E;
            }
        }
    }
`


const Wrapper = styled.div`

    .image-wrap{
        position: relative;
    }

    .hearth{
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 2;
        opacity: 0;
        transition: opacity .5s cubic-bezier(0.42, 0, 0.58, 1);

        @media (max-width: 1024px) {
            opacity: 1;
        }
    }

    .image-wrap{
        &:hover{
            .hearth{
                opacity: 1;
            }
        }
    }

    b{
        font-weight: 300 !important;
    }

    @media (max-width: 1024px) {
        display: none;
    }

    button{
        border: none;
        background-color: transparent;
        margin-bottom: clamp(10.13px, ${10.13 / 1024 * 100}vw, 20.58px);
        position: relative;
        cursor: pointer;

        &:active{
            span{
                transform: translate(6px, 6px);

                &::after{
                    right: 0;
                    left: 0;
                    bottom: 0;
                }

                &::before{
                    right: 0;
                    top: 0;
                    bottom: 0;
                }
            }
        }

        span{
            font-size: 18px;
            font-weight: 300;
            position: absolute;
            display: block;
            padding: 8px 18px 12px 18px;
            background-color: #fff;
            right: 20px;
            bottom: 20px;
            opacity: 0;
            transition: all .5s cubic-bezier(0.42, 0, 0.58, 1);

            &:hover{
                background-color: #fff;
            }

            b{
                font-size: 24px;
                font-weight: 700;
            }

            &::after{
                content: "";
                position: absolute;
                right: -6px;
                left: 6px;
                bottom: -6px;
                height: 1px;
                background-color: #31231E;
                transition: all .5s cubic-bezier(0.42, 0, 0.58, 1);
            }

            &::before{
                content: "";
                position: absolute;
                right: -6px;
                top: 6px;
                bottom: -6px;
                width: 1px;
                background-color: #31231E;
                transition: all .5s cubic-bezier(0.42, 0, 0.58, 1);
            }
        }

        &:hover, &:focus{
            span{
                opacity: 1;
            }
        }
    }
`

const ImagesGrid = styled.div`
    columns: 2;
    column-gap: clamp(10px, ${10 / 1024 * 100}vw, 20px);
`

const PopupGrid = styled.div`
    display: grid;
    grid-gap: clamp(40px, ${80 / 768 * 100}vw, 80px);
`