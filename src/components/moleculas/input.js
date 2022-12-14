import { Link, navigate } from "gatsby"
import React from "react"
import styled from "styled-components"
import { myContext } from "./../../hooks/provider"

export const Input = ({ func, tabIndex, placeholder }) => {

    const enterListener = (e, input) => {
        if (e.key === "Enter") {
            navigate(input ? ('/search/?search=' + input) : '/search/')
            func()
        }
    }

    return (
        <myContext.Consumer>
            {context => {
                return (
                    <Wrapper>
                        <span>{placeholder}</span>
                        <input onKeyDown={(e) => { enterListener(e, context.searchInputValue) }} tabIndex={tabIndex} onChange={(e) => { context.setSearchInputValue(e.target.value) }} placeholder={placeholder} />
                        <Link onClick={func} tabIndex={tabIndex} aria-label={'search: ' + context?.searchInputValue} to={context?.searchInputValue ? ('/search/?search=' + context?.searchInputValue) : '/search/'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19.207" height="18.207" viewBox="0 0 19.207 18.207">
                                <g id="Group_149" data-name="Group 149" transform="translate(-445.619 -133.752)">
                                    <g id="Ellipse_23" data-name="Ellipse 23" transform="translate(445.619 133.752)" fill="#fff" stroke="#0b0b0b" strokeWidth="2">
                                        <circle cx="8" cy="8" r="8" stroke="none" />
                                        <circle cx="8" cy="8" r="7" fill="none" />
                                    </g>
                                    <line id="Line_81" data-name="Line 81" x2="5.053" y2="5.053" transform="translate(459.066 146.199)" fill="none" stroke="#0b0b0b" strokeWidth="2" />
                                </g>
                            </svg>
                        </Link>
                    </Wrapper>
                )
            }}
        </myContext.Consumer>
    )
}

const Wrapper = styled.label`
    span{
        display: none;
    }
    border-bottom: 1px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button{
        border: none;
        background-color: transparent;
        cursor: pointer;
    }

    input{
        border: none;
        width: 100%;
        font-size: 14px;
        padding-bottom: 10px;
    }
`