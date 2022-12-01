import { createGlobalStyle } from "styled-components"

export const Global = createGlobalStyle`
    :root{
        --light-background: #F9F5F0;
        
        --gray: #707070;
        --brown: #CEAD89;

        --text-color: #31231E;
    }

    * {
        margin: 0;
        padding: 0;
        text-decoration: none;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        color: var(--text-color);
        font-family: 'Gothic';
        line-height: 1.4em;
        text-underline-offset: 6px;
        text-decoration-thickness: 1px !important;
    }

    *:focus{
        outline: none;
    }

    main{
        max-width: 1920px;
        margin: 0 auto;
        width: 100%;
    }

    .archive-title {
        font-size: 44px;
        font-style: italic;
        font-weight: 300;
        line-height: 170%;
        position: relative;
        width: fit-content;
        text-decoration: underline;
    }

    .p{
        font-size: 28px;
        line-height: 135%;
        font-weight: 300;
    }
    
`