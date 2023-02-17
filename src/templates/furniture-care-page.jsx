import { graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import { Title } from "../components/moleculas/title-sub"
import AssemblyInstructions from "../components/sections/assembly-instructions"
import Faq from "../components/sections/faq"
import Handbook from "../components/sections/handbook"
import Map from "../components/sections/map"
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

export default function FurnitureCarePage({ data: { wpPage: { title, furnitureCare } }, pageContext, location }) {
    return (
        <Wrapper>
            <Title title={title} />
            <Faq data={furnitureCare.faq} />
            <Handbook data={furnitureCare.handbook}/>
            <AssemblyInstructions /> 
            <Map />
        </Wrapper>
    )
}

export const query = graphql`
    query furnitureCare($id: String!) {
        wpPage(id: {eq: $id}){
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
            title
            furnitureCare {
              faq {
                answer
                question
              }
              handbook {
                title
                text
                filesUnderText {
                  file {
                    altText
                    title
                    localFile {
                      publicURL
                    }
                  }
                }
              }
            }
        }
    }
`