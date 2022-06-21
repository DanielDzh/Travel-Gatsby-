import React, { useState, useEffect } from 'react'
import Img from "gatsby-image"
import styled from "styled-components"
import { FaRegLightbulb } from 'react-icons/fa'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { graphql, useStaticQuery } from 'gatsby'
import './mystle.css'


const Testimonials = () => {

   useEffect(() => {
      function onEntry(entry) {
         entry.forEach(change => {
            if (change.isIntersecting) {
               change.target.classList.add('element-show');
            }
         });
      }

      let options = {
         threshold: [0.5]
      };
      let observer = new IntersectionObserver(onEntry, options);
      let elements = document.querySelectorAll('.element-animation');

      for (let elm of elements) {
         observer.observe(elm);
      }
   }, [])

   const data = useStaticQuery(graphql`
   query {
      allFile(filter: {ext: {regex: "/(png)|(jpeg)|(jpg)/"}, 
        name: {in: ["testimonials1", "testimonials2"]}}) {
        edges {
          node {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    
   `)

   return (
      <TestimonialsContainer>
         <TopLine className="element-animation">
            Testimonials
         </TopLine>
         <Description className="element-animation">
            What Peaple are Saying
         </Description>
         <ContentWrapper>
            <ColumnOne>
               <Testimonial className="element-animation">
                  <IoMdCheckmarkCircleOutline css={`color: #3fffa8; font-size: 2rem; margin-bottom: 1rem;`} />
                  <h3>Sean Michaels</h3>
                  <p>
                     "The greatest experience of my life! It was so much fun exploring
                     the mountains and they made it super easy to book my trip and accommodation."
                  </p>
               </Testimonial>
               <Testimonial className="element-animation">
                  <FaRegLightbulb css={`color: #f9b19b; font-size: 2rem; margin-bottom: 1rem;`} />
                  <h3>Sarah Kin</h3>
                  <p>
                     "It was so ease to set up my trip! They answered all my qyestions
                     right away and gave me the best price out of all the companies
                     researched"
                  </p>
               </Testimonial>
            </ColumnOne>
            <ColumnTwo>
               {data.allFile.edges.map((image, key) => (
                  <Images key={key} fluid={image.node.childImageSharp.fluid} />
               ))}
            </ColumnTwo>
         </ContentWrapper>
      </TestimonialsContainer>
   )
}

export default Testimonials

const TestimonialsContainer = styled.div`
   width: 100%;
   background: #f9f9f9;
   color: #000;
   padding: 5rem calc((100vw - 1300px) / 2);
   height: 100%;
`

const TopLine = styled.div`
   color: #077bf1;
   font-size: 1rem;
   padding-left: 2rem;
   margin-bottom: 0.75rem;
`

const Description = styled.div`
   text-align: start;
   padding-left: 2rem;
   margin-bottom: 4rem;
   font-size: clamp(1.5rem, 5vw, 2rem);
   font-weight: bold;
`
const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;

    @media screen and (max-width: 768px){
       grid-template-columns: 1fr;
    }
`

const ColumnOne = styled.div`
   display: grid;
   grid-template-rows: 1fr 1fr;
`

const Testimonial = styled.div`
   padding-top: 1rem;
   padding-right: 2rem;

   h3{
      margin-bottom: 1rem;
      font-size: 1.5rem;
      font-style: italic;
   }

   p{
      color: #3b3b3b;
   }
`

const ColumnTwo = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr;
   margin-bottom: 4rem;
   grid-gap: 10px;

   @media screen and (max-width: 500px){
      grid-template-columns: 1fr;
   }
`

const Images = styled(Img)`
   border-radius: 10px;
   height: 100%;
`