import React from "react"
import styled from "styled-components"
import { Input } from "./input"
import { InputExt } from './input-extended'

const searchTitle = {
    en: 'Search'
}

export const Search = ({ func = () => { }, tabIndex = 0, type }) => {
    return (
        <Wrapper className={type === 'extended' ? 'extended' : ''}>
            {type === 'extended'
                ? <InputExt tabIndex={tabIndex} placeholder={searchTitle['en']} />
                : <Input func={func} tabIndex={tabIndex} placeholder={searchTitle['en']} />}

        </Wrapper>
    )
}

const Wrapper = styled.div`
    input{
        font-weight: 300;
        font-size: 16px;
    }

    &.extended{
        label{
            font-size: clamp(16px, ${16 / 1194 * 100}vw, 20px);
            font-weight: 300;
        }
        input{
            border-bottom: 1px solid #BABABA;
        }
    }
`