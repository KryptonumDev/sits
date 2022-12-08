import React from "react"
import styled from "styled-components"
import { CloseButton } from "../atoms/close-button"
import { Container } from "../atoms/container"
import { DropDown } from "../moleculas/dropdown"
import { Search } from "../moleculas/search"

export const FilterComponent = ({
    filterTitle,
    sortByTitle,
    sortBy,
    name,
    typeTitle,
    sofasTypes,
    upholsterysTitle,
    upholsterysArr,
    coversTitle,
    covesArr,
    reset,
    view,
    sort,
    type,
    upholsterys,
    cover,
    sortFilterTitle,
    setMobileFilterOpened,
    isMobileFilterOpened,
    setUpholsterys,
    setCover,
    setType,
    setSort,
    clearAll
}) => (
    <>

        <MobileFilters className={isMobileFilterOpened ? 'active' : ''}>
            <Flex>
                <b>{filterTitle}</b>
                <CloseButton func={setMobileFilterOpened} val={false} />
            </Flex>
            <FilterBlock>
                <span>{sortByTitle}</span>
                <div className="flex">
                    {sortBy.map(el => (
                        <button onClick={() => { setSort(el.val) }} className={el.val === sort ? 'active' : ''}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15.541" height="11.357" viewBox="0 0 15.541 11.357">
                                <path id="Path_160" data-name="Path 160" d="M2040.209,10461.905l4.285,4.092,9.881-9.252" transform="translate(-2039.519 -10456.016)" fill="none" stroke="#cead89" stroke-width="2" />
                            </svg>
                            {el.name}
                        </button>
                    ))}
                </div>
            </FilterBlock>
            {name === 'Sofas' && (
                <FilterBlock>
                    <span>{typeTitle}</span>
                    <div className="flex">
                        {sofasTypes.map(el => (
                            <button onClick={() => { setType(el.val) }} className={el.val === type ? 'active' : ''}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15.541" height="11.357" viewBox="0 0 15.541 11.357">
                                    <path id="Path_160" data-name="Path 160" d="M2040.209,10461.905l4.285,4.092,9.881-9.252" transform="translate(-2039.519 -10456.016)" fill="none" stroke="#cead89" stroke-width="2" />
                                </svg>
                                {el.name}
                            </button>
                        ))}
                    </div>
                </FilterBlock>
            )}
            {name !== "Coffee tables" && (
                <FilterBlock>
                    <span>{upholsterysTitle}</span>
                    <div className="flex">
                        {upholsterysArr.map(el => (
                            <button onClick={() => { setUpholsterys(el.val) }} className={el.val === upholsterys ? 'active' : ''}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15.541" height="11.357" viewBox="0 0 15.541 11.357">
                                    <path id="Path_160" data-name="Path 160" d="M2040.209,10461.905l4.285,4.092,9.881-9.252" transform="translate(-2039.519 -10456.016)" fill="none" stroke="#cead89" stroke-width="2" />
                                </svg>
                                {el.name}
                            </button>
                        ))}
                    </div>
                </FilterBlock>
            )}
            {name !== "Coffee tables" && (
                <FilterBlock>
                    <span>{coversTitle}</span>
                    <div className="flex">
                        {covesArr.map(el => (
                            <button onClick={() => { setCover(el.val) }} className={el.val === cover ? 'active' : ''}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15.541" height="11.357" viewBox="0 0 15.541 11.357">
                                    <path id="Path_160" data-name="Path 160" d="M2040.209,10461.905l4.285,4.092,9.881-9.252" transform="translate(-2039.519 -10456.016)" fill="none" stroke="#cead89" stroke-width="2" />
                                </svg>
                                {el.name}
                            </button>
                        ))}
                    </div>
                </FilterBlock>
            )}
            <Flex className="center">
                <button className="underlined" onClick={() => { clearAll(); setSort('Popular') }}>
                    {reset}
                </button>
                <button className="filled" onClick={() => { setMobileFilterOpened(false); window?.scrollTo({ top: 0 }) }}>
                    {view}
                </button>
            </Flex>
        </MobileFilters>
        <Filter>
            <Container className="container">
                <div className="left">
                    <DropDown controller={sort} func={setSort} data={sortBy} controlTitle={sortByTitle + ': ' + sort} />
                    {name === 'Sofas' && <DropDown controller={type} func={setType} data={sofasTypes} controlTitle={typeTitle} />}
                    {name !== "Coffee tables" && <DropDown controller={upholsterys} func={setUpholsterys} data={upholsterysArr} controlTitle={upholsterysTitle} />}
                    {name !== "Coffee tables" && <DropDown controller={cover} func={setCover} data={covesArr} controlTitle={coversTitle} />}
                </div>
                <div className="left-alt">
                    <button onClick={() => { setMobileFilterOpened(true) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14.595" viewBox="0 0 15 14.595">
                            <g id="Group_520" data-name="Group 520" transform="translate(5432.613 -238.318)">
                                <line id="Line_258" data-name="Line 258" y2="14.595" transform="translate(-5430.658 238.318)" fill="none" stroke="#31231e" stroke-width="1" />
                                <line id="Line_259" data-name="Line 259" y2="14.595" transform="translate(-5425.122 238.318)" fill="none" stroke="#31231e" stroke-width="1" />
                                <line id="Line_260" data-name="Line 260" y2="14.595" transform="translate(-5419.586 238.318)" fill="none" stroke="#31231e" stroke-width="1" />
                                <g id="Ellipse_295" data-name="Ellipse 295" transform="translate(-5432.613 243.55)" fill="#fff" stroke="#31231e" stroke-width="1">
                                    <circle cx="2" cy="2" r="2" stroke="none" />
                                    <circle cx="2" cy="2" r="1.5" fill="none" />
                                </g>
                                <g id="Ellipse_296" data-name="Ellipse 296" transform="translate(-5427.113 238.55)" fill="#fff" stroke="#31231e" stroke-width="1">
                                    <circle cx="2" cy="2" r="2" stroke="none" />
                                    <circle cx="2" cy="2" r="1.5" fill="none" />
                                </g>
                                <g id="Ellipse_297" data-name="Ellipse 297" transform="translate(-5421.613 248.55)" fill="#fff" stroke="#31231e" stroke-width="1">
                                    <circle cx="2" cy="2" r="2" stroke="none" />
                                    <circle cx="2" cy="2" r="1.5" fill="none" />
                                </g>
                            </g>
                        </svg>
                        {sortFilterTitle}
                    </button>
                </div>
                <div>
                    <Search type='extended' />
                </div>
            </Container>
        </Filter>
    </>
)

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    b{
        font-size: clamp(18px, ${18 / 1194 * 100}vw, 20px);
    }

    .underlined{
        background-color: transparent;
        border: unset;
        color: #CEAD89;
        border-bottom: 1px solid #CEAD89;
        padding: 0 7px 3px 0;
    }

    .filled{
        background-color: #CEAD89;
        border: unset;
        color: #fff;
        padding: 12px 60px;
    }

    &.center{
            margin-top: 50px;
        justify-content: start;
        gap: 50px;
        @media (max-width: 500px) {
            justify-content: space-evenly;
        }
    }
`

const FilterBlock = styled.div`
    margin-top: 30px;

    span{
        font-size: 24px;
        font-weight: 300;
    }

    button{
        padding: 5px 12px;
        border-radius: 50px;
        border: 2px solid #CCCCCC;
        background-color: transparent;
        display: flex;
        align-items: center;
        gap: 10px;

        svg{
            display: none;
        }

        &.active{
            border-color: #CEAD89;
            color: #CEAD89;

            svg{
                display: block;
            }
        }
    }

    .flex{
        margin-top: 12px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
`

const MobileFilters = styled.div`
    position: fixed;
    z-index: 102;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transform: translateX(100%);
    transition: transform .3s cubic-bezier(0.39, 0.575, 0.565, 1);
    background-color: #fff;
    padding: 32px 24px;
    max-height: 100vh;
    overflow: auto;

    @supports  (-webkit-touch-callout: none){
        padding-bottom: 120px;
    }

    &.active{
        transform: unset;
    }
`

const Filter = styled.div`
    position: sticky;
    z-index: 101;
    top: 109px;
    left: 0;
    right: 0;
    height: 107px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    margin-top: -1px;

    @media (max-width: 1180px){
        height:64px;
    }

    @media (max-width: 840px) {
        top: 75px;
    }
    

    .container{
        display: flex;
        justify-content: space-between;

        @media (max-width: 1180px){
            align-items: center;
            height: 100%;
        }
    }

    .left{
        display: flex;
        gap: clamp(40px, ${40 / 1194 * 100}vw, 120px);

        @media (max-width: 1180px) {
            display: none;
        }
    }

    .left-alt{
        display: none;
        @media (max-width: 1180px) {
            display: block;

            button{
                border: none;
                background-color: transparent;
                display: flex;
                gap: 12px;
                align-items: center;
                font-size: 18px;

                svg{
                    margin-top: 2px;
                    width: 24px;
                    height: 24px;
                }
            }
        }

        @media (max-width: 600px) {
            button{
                font-size: 16px;

                svg{
                    width: unset;
                    height: unset;
                }
            }
        }
    }

   .label{
        padding: 22px;
        margin: 22px -22px 0 -22px;
        cursor: pointer;

        
        @media (max-width: 1180px) {
            margin: 0;
            padding: 0;
        }
    }
`