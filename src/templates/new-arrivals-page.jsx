import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import Map from "../components/sections/map"
import Content from "../components/sections/new-arrivals-content"
import Wrapper from "../components/sections/page-wrapper"
import Seo from "../layout/seo"

export function Head({ pageContext, data: { wpPage: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }} />
      <Seo seo={seo} pageContext={pageContext}/>
    </>
  )
}

export default function NewArrivalsPage({ data: { wpPage, allWpProduct }, pageContext, location }) {
    return (
        <Wrapper>
            <Content data={wpPage.newArrivals.products} />
            <Map/>
        </Wrapper>
    )
}

export const query = graphql`
    query newArrivals($id: String!) {
        wpPage(id: {eq: $id}){
            id
            seo {
              canonical
              metaDesc
              opengraphSiteName
              title
              opengraphImage {
                localFile {
                  publicURL
                }
              }
            }
            newArrivals {
              products {
                product {
                  ... on WpProduct {
                    types {
                      nodes {
                        name
                        collectionTypes {
                          typeArchive {
                            url
                          }
                        }
                      }
                    }
                    products {
                      collection {
                        ... on WpCollection {
                          slug
                          title
                          covers {
                            nodes {
                              name
                            }
                          }
                          upholsterys{
                            nodes{
                              name
                            }
                          }
                          types {
                            nodes {
                              name
                              collectionTypes {
                                typeArchive {
                                  url
                                }
                              }
                            }
                          }
                        }
                      }
                      isNewArrival
                      productGallery {
                        popupNames {
                          fabric
                          cover
                          leather
                          model
                        }
                        productsImages {
                          isMainImage
                          featuredProductImage {
                            altText
                            localFile {
                              childImageSharp {
                                gatsbyImageData
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
        }
    }
`