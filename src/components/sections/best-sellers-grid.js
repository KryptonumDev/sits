import React from "react"
import styled from "styled-components"
import { Container } from "../atoms/container"
import { Fifth } from "../organism/best-sellers-grid-fifth"
import { First } from "../organism/best-sellers-grid-first"
import { Fourth } from "../organism/best-sellers-grid-fourth"
import { Second } from "../organism/best-sellers-grid-second"
import { Third } from "../organism/best-sellers-grid-third"

export default function BestSellersGrid({ data, language }) {
    return (
        <Wrapper>
            <Container>
                <Grid>
                    {data.map(el => {
                        if (!el.collection) {
                            return null
                        }
                        if (!el?.collection?.collections?.collectionBestsellerImageGrid?.bigLandscape?.localFile
                            || !el?.collection?.collections?.collectionBestsellerImageGrid?.bigSquare?.localFile
                            || !el?.collection?.collections?.collectionBestsellerImageGrid?.smallLandscape?.localFile
                            || !el?.collection?.collections?.collectionBestsellerImageGrid?.smallSquare?.localFile
                            || !el?.collection?.collections?.collectionBestsellerImageGrid?.tinyLandscape?.localFile) {
                            console.log(el.collection.title + ' Nie ma wszystkich obrazków')
                            return null
                        }
                        switch (el.fieldGroupName) {
                            case "Page_Bestsellers_ImageGrids_First":
                                return <First data={el.collection} language={language} />
                            case "Page_Bestsellers_ImageGrids_Second":
                                return <Second data={el.collection} language={language} />
                            case "Page_Bestsellers_ImageGrids_Third":
                                return <Third data={el.collection} language={language} />
                            case "Page_Bestsellers_ImageGrids_Fourth":
                                return <Fourth data={el.collection} language={language} />
                            case "Page_Bestsellers_ImageGrids_Fifth":
                                return <Fifth data={el.collection} language={language} />
                            default:
                                return null
                        }
                    })}
                </Grid>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    margin-top: 80px;
`

const Grid = styled.div`
    display: grid;
    grid-gap: clamp(80px, ${100 / 1194 * 100}vw, 140px);

.gatsby-image-wrapper{
    width: 100%;
    height: 100%;
}
`