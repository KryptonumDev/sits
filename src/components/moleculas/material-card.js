import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import styled from "styled-components"

export const MaterialCard = ({ data: { materials: { materialColorVariants: variants }, title, slug } }) => {

    const [choosenVariant, setChoosenVariant] = useState(() => {
        for (let i = 0; i < variants.length; i++) {
            if (variants[i].isMainColor) {
                return i
            }
        }
        return 0
    })

    const onVariantChange = (index) => {
        document.getElementById('background').style.backgroundColor = variants[choosenVariant].squarePreviewImage.localFile.childImageSharp.gatsbyImageData.backgroundColor
        setChoosenVariant(index)
    }

    return (
        <Wrapper>
            <Link to={'/material/' + slug + '/'}>
                <SliderWrapper id='background'>
                    {variants.map((el, index) => (
                        <SliderContent className={index === choosenVariant ? 'active' : ''}>
                            <GatsbyImage className="image" image={el.squarePreviewImage.localFile.childImageSharp.gatsbyImageData} alt={el.squarePreviewImage.altText} />
                        </SliderContent>
                    ))}
                </SliderWrapper>
            </Link>
            <span className="title">{title}</span>
            <VariantsPicker>
                {variants.map((el, index) => (
                    <VariantCircle onClick={() => { onVariantChange(index) }} className={index === choosenVariant ? 'active' : ''} image={el.variantColorImage?.localFile?.publicURL} color={el.variantColor}>
                    </VariantCircle>
                ))}
            </VariantsPicker>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    max-width: 430px;

    .title{
        margin-top: 10px;
        margin-bottom: 16px;
        display: block;
        font-size: clamp(16px, ${26 / 1194 * 100}vw, 32px);
        font-weight: 300;
    }
`

const VariantsPicker = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    padding: 0 6px;
`

const VariantCircle = styled.button`
    background-color: ${props => props.color};
    background-image: url(${props => props.image});
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 1px solid #BABABA;
    transition: border .2s cubic-bezier(0.39, 0.575, 0.565, 1);

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &::after{
        content: "";
        position: absolute;
        left: -6px;
        right: -6px;
        bottom: -6px;
        top: -6px;
        border: 1px solid #0B0B0B;
        border-radius: 50%;
        opacity: 0;
        transition: opacity .3s cubic-bezier(0.39, 0.575, 0.565, 1);
    }

    svg{
        opacity: 0;
        transition: opacity .2s cubic-bezier(0.39, 0.575, 0.565, 1);
        mix-blend-mode: color-burn;
    }

    &.active{
        &::after{
            opacity: 1;
        }
    }
`

const SliderWrapper = styled.div`
    position: relative;
    background-color: #777;
`

const SliderContent = styled.div`
    position: absolute;
    opacity: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: opacity .3s cubic-bezier(0.39, 0.575, 0.565, 1);

    &.active{
        position: relative;
        opacity: 1;
    }
`