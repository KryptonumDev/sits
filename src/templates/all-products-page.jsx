import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import ProductGrid from "../components/sections/products-grid"
import Seo from "../layout/seo"

export function Head({ data: { wpPage: { seo } } }) {
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }} />
      <Seo seo={seo} />
    </>
  )
}

export default function AllProducts({ data: { wpPage, homepage }, pageContext, location }) {
    return (
        <main>
            <ProductGrid title={'Discover our collections'} data={homepage.homepage.productsGrid} />
        </main>
    )
}

export const query = graphql`
    query allProducts($id: String!) {
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
        }
        homepage : wpPage(id: {eq: "cG9zdDoyOTY4Mg=="}) {
            id
            homepage{
            productsGrid {
                sectionTitle
                text
                firstLink {
                  url
                  title
                  target
                }
                firstImage {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                secondLink {
                  url
                  title
                  target
                }
                secondImage {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                thirdLink {
                  url
                  title
                  target
                }
                thirdImage {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                fourthLink {
                  url
                  title
                  target
                }
                fourthImage {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                sixthLink {
                  url
                  title
                  target
                }
                sixthImage {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                seventhLink {
                  url
                  title
                  target
                }
                seventhImage {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                eightsLink {
                  url
                  title
                  target
                }
                eightsImage {
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
`