import React from "react"
import styled from "styled-components"

export const CloseButton = ({ tabIndex = 0, as, func, val }) => (
    <Button tabIndex={tabIndex} aria-label='close button' as={as} onClick={() => {
        if (as) {
            func(val)
        }
    }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <g id="Group_148" data-name="Group 148" transform="translate(-453.793 -46.793)">
                <line id="Line_78" data-name="Line 78" x1="18.148" y2="18.148" transform="translate(454.5 47.5)" fill="none" stroke="#0b0b0b" strokeWidth="2" />
                <line id="Line_79" data-name="Line 79" x2="18.148" y2="18.148" transform="translate(454.5 47.5)" fill="none" stroke="#0b0b0b" strokeWidth="2" />
            </g>
        </svg>
    </Button>
)

const Button = styled.div`
    height: 20px;
    width: 20px;
    border: none;
    background: transparent;
    cursor: pointer;

    svg{
        transition: transform .4s cubic-bezier(0.42, 0, 0.58, 1);
    }

    &:hover{
        svg{
        }
    }

    @media (max-width: 640px) {
        width: 15px;
        height: 15px;
        transform: translateY(-2px);
        svg{
        width: 15px;
        height: 15px;

        }
    }
`