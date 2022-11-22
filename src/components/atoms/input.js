import React from "react"
import styled from "styled-components"

export const Input = ({ placeholder }) => (
    <Wrapper>
        <input placeholder={placeholder} />
        <button><svg xmlns="http://www.w3.org/2000/svg" width="19.207" height="18.207" viewBox="0 0 19.207 18.207">
            <g id="Group_149" data-name="Group 149" transform="translate(-445.619 -133.752)">
                <g id="Ellipse_23" data-name="Ellipse 23" transform="translate(445.619 133.752)" fill="#fff" stroke="#0b0b0b" stroke-width="2">
                    <circle cx="8" cy="8" r="8" stroke="none" />
                    <circle cx="8" cy="8" r="7" fill="none" />
                </g>
                <line id="Line_81" data-name="Line 81" x2="5.053" y2="5.053" transform="translate(459.066 146.199)" fill="none" stroke="#0b0b0b" stroke-width="2" />
            </g>
        </svg>
        </button>
    </Wrapper>
)

const Wrapper = styled.div`
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
        padding-bottom: 8px;
    }
`