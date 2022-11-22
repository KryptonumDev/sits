import React from "react"
import styled from "styled-components"

export const DownloadWithArrow = ({ className, file, children }) => (
    <Link className={className} href={file} download>
        <span>
            {children}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20.87" height="29.711" viewBox="0 0 20.87 29.711">
            <g id="Group_137" data-name="Group 137" transform="translate(-1849.282 -1467.289)">
                <path id="Path_16" data-name="Path 16" d="M0,0,9.688,8.864,0,17.339" transform="translate(1868.385 1477.503) rotate(90)" fill="none" stroke="#31231e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" />
                <line id="Line_75" data-name="Line 75" y1="17.927" transform="translate(1859.627 1468.539)" fill="none" stroke="#31231e" stroke-linecap="round" stroke-width="2.5" />
                <line id="Line_76" data-name="Line 76" x2="17.263" transform="translate(1851.66 1495.75)" fill="none" stroke="#31231e" stroke-width="2.5" />
            </g>
        </svg>
    </Link>
)

const Link = styled.a`
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 16px;
    width: fit-content;
    align-items: center;

    &:hover{
        #Path_16{
        }
    }

    #Path_16{
    }

    span{
        font-size: 20px;
        line-height: 150%;
        display: block;
        position: relative;
        width: fit-content;

        &::after{
            content: '';
            position: absolute;
            left: 0;
            right: 10px;
            bottom: 0;
            border: 1px solid var(--text-color);
        }
    }
`