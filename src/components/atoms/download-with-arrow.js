import { motion } from "framer-motion"
import React from "react"
import styled from "styled-components"

export const DownloadWithArrow = ({ linkAnimation, className, file, children }) => (
    <motion.div variants={linkAnimation}>
        <Link className={className} href={file} download>
            <span className="underline">
                {children}
            </span>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20.87" height="29.711" viewBox="0 0 20.87 29.711">
                    <g id="Group_137" data-name="Group 137" transform="translate(-1849.282 -1467.289)">
                        <path id="Path_16" data-name="Path 16" d="M0,0,9.688,8.864,0,17.339" transform="translate(1868.385 1477.503) rotate(90)" fill="none" stroke="#31231e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        <line id="Line_75" data-name="Line 75" y1="17.927" transform="translate(1859.627 1468.539)" fill="none" stroke="#31231e" strokeLinecap="round" strokeWidth="2" />
                    </g>
                </svg>
            </div>
        </Link>
    </motion.div>
)

const Link = styled.a`
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 16px;
    width: fit-content;
    align-items: center;

    background-size: inherit;

    &:hover{
        span{
            background-size: 100% 1px;
        }
    }

    span{
        font-size: clamp(16px, ${18 / 1194 * 100}vw, 18px);
        line-height: 150%;
        display: block;
        position: relative;
        width: fit-content;
        background-size: inherit;
    }

    div{
        transition: all .5s cubic-bezier(0.42, 0, 0.58, 1);
    }

    &:hover{
        div{
            transform: translateY(6px) !important;
        }
    }
`