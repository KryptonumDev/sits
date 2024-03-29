import { graphql, useStaticQuery } from "gatsby"
import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { Grid } from "./cookies-grid"
import scrollLock from './../helpers/scroll-lock'
import { getCookie, setCookie } from "../helpers/coockie-manager"
import { AnimatePresence, motion } from "framer-motion"
import { allowButton, allowChosenButton, setButton, denyButton, aboutTabName, detailsTabName, consentTabName } from "../texts/cookie"
import { myContext } from "../hooks/provider"

function datalayerArguments() {
    if (typeof window !== "undefined" && !!arguments) {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push(arguments)
    }
}

export default function Cookies({ language }) {
    const { isCookiesActive: isActive, setIsCookiesActive: setIsActive } = useContext(myContext)
    const { allWpPage } = useStaticQuery(graphql`
        query Cookies($language: WpLanguageCodeEnum){
            allWpPage(filter: {template: {templateName: {eq: "Global Config"}}, language: {code: {eq: $language}}}) {
                nodes{
                    language {
                        code
                    }
                    cookies {
                        consentTab {
                            tabContent
                        }
                        aboutCookiesTab {
                            tabContent
                        }
                        detailsTab {
                            cookies {
                                partName
                                workPartName
                                partDescription
                                innerParts {
                                    innerPartName
                                    cookieDescriptionUrl
                                    innerPartCookies {
                                        cookieName
                                        cookieDescription
                                        expireTime
                                        cookieType
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `)
    const { cookies: { consentTab, aboutCookiesTab, detailsTab } } = allWpPage.nodes.filter(el => el.language.code === language)[0]

    const [activeTab, setActiveTab] = useState(0)

    const [activeCookie, setActiveCookie] = useState(() => {
        const arr = []
        detailsTab.cookies.forEach(el => {
            const isActive = el.workPartName === 'necessary'
            arr.push({ name: el.workPartName, isActive: isActive })
        })
        return arr
    })

    const changeTabs = (index) => {
        const arr = [...activeCookie]

        if (arr[index].name === "necessary") {
            return null
        }

        arr[index].isActive = !arr[index].isActive

        setActiveCookie(arr)
    }

    useEffect(() => {
        if (getCookie('necessary')) {
            datalayerArguments("consent", "default", {
                'ad_storage': getCookie('marketing'),
                'analytics_storage': getCookie('statistics'),
                'functionality_storage': getCookie('necessary'),
                'personalization_storage': getCookie('preferences'),
                'unclassified_storage': getCookie('unclassified'),
                'wait_for_update': 2500
            });
            datalayerArguments("set", "ads_data_redaction", true);
            setIsActive(false)
            scrollLock.disable('cookie')
        } else {
            datalayerArguments("consent", "default", {
                'ad_storage': "denied",
                'analytics_storage': "denied",
                'functionality_storage': "denied",
                'personalization_storage': "denied",
                'security_storage': "granted",
                'unclassified_storage': "denied",
                'wait_for_update': 2500
            });
            datalayerArguments("set", "ads_data_redaction", true);
            window.addEventListener('scroll', () => {
                setIsActive(true)
            }, { once: true })
            scrollLock.enable('cookie')
        }

        return () => {
            scrollLock.disable('cookie')
        }
    }, [])

    const acceptAll = () => {
        activeCookie.forEach(el => {
            setCookie(el.name, 'granted', 365)
        })
        datalayerArguments('consent', 'update', {
            'ad_storage': 'granted',
            'analytics_storage': "granted",
            'functionality_storage': "granted",
            'personalization_storage': "granted",
            'unclassified_storage': "granted",
        });

        setIsActive(false)
    }

    const acceptPart = () => {
        activeCookie.forEach(el => {
            setCookie(el.name, el.isActive ? 'granted' : 'denied', 365)
        })
        datalayerArguments('consent', 'update', {
            'ad_storage': getCookie('marketing'),
            'analytics_storage': getCookie('statistics'),
            'functionality_storage': getCookie('necessary'),
            'personalization_storage': getCookie('preferences'),
            'unclassified_storage': getCookie('unclassified'),
        });

        setIsActive(false)
    }

    if (!isActive) {
        scrollLock.disable('cookie')
    }

    const rejectAll = () => {
        activeCookie.forEach(el => {
            setCookie(el.name, 'denied', 365)
        })
        datalayerArguments('consent', 'update', {
            'ad_storage': 'denied',
            'analytics_storage': "denied",
            'functionality_storage': "denied",
            'personalization_storage': "denied",
        });

        setIsActive(false)
    }

    const isMobile = (() => {
        if (typeof window !== 'undefined')
            return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        return true;
    })()

    return (
        <AnimatePresence initial={false} mode="wait">
            {isActive && (
                <>
                    <Overlay initial={{ opacity: isMobile ? 1 : 0 }} animate={{ opacity: 1, transition: { duration: .5 } }} exit={{ opacity: 0, transition: { duration: .3 } }} key='cookie-overlay' />
                    <Wrapper initial={{ opacity: isMobile ? 1 : 0 }} animate={{ opacity: 1, transition: { duration: .5 } }} exit={{ opacity: 0, transition: { duration: .3 } }} key='cookie-wrapper'>
                        <Content>
                            <TabsControl>
                                <button tabIndex={isActive ? '0' : '-1'} onClick={() => { setActiveTab(0) }}>
                                    {consentTabName[language]}
                                    {activeTab === 0 && (
                                        <motion.div
                                            key={'1'}
                                            className="underline"
                                            layoutId="underline"
                                        />
                                    )}
                                </button>
                                <button tabIndex={isActive ? '0' : '-1'} onClick={() => { setActiveTab(1) }}>
                                    {detailsTabName[language]}
                                    {activeTab === 1 && (
                                        <motion.div
                                            key={'2'}
                                            className="underline"
                                            layoutId="underline"
                                        />
                                    )}
                                </button>
                                <button tabIndex={isActive ? '0' : '-1'} onClick={() => { setActiveTab(2) }}>
                                    {aboutTabName[language]}
                                    {activeTab === 2 && (
                                        <motion.div
                                            key={'3'}
                                            className="underline"
                                            layoutId="underline"
                                        />
                                    )}
                                </button>
                            </TabsControl>
                            <TabWrapper transition={{ duration: .5 }}>
                                <AnimatePresence initial={false} mode='wait'>
                                    {activeTab === 0 && (
                                        <Tab key='cookies-first-tab' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <div className="content" dangerouslySetInnerHTML={{ __html: consentTab.tabContent }} />
                                        </Tab>
                                    )}
                                    {activeTab === 1 && (
                                        <Tab key='cookies-second-tab' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            {detailsTab.cookies.map((el, index) => {
                                                let count = 0
                                                el.innerParts?.forEach(inEl => {
                                                    count += inEl.innerPartCookies.length
                                                })
                                                return (
                                                    <div key={el.partName + index} className="parts">
                                                        <div className="name">
                                                            <button tabIndex={isActive ? '0' : '-1'} className={activeCookie[index].isActive ? "radio active" : 'radio'} onClick={() => { changeTabs(index) }}><span /></button>
                                                            {el.partName} {count > 0 && `(${count})`}
                                                        </div>
                                                        <p className="description">
                                                            {el.partDescription}
                                                        </p>
                                                        {el.innerParts?.map((el, id) => (
                                                            <React.Fragment key={el.innerPartName + id}><Grid language={language} isActive={isActive} active={activeCookie[index].isActive} el={el} /></React.Fragment>
                                                        ))}
                                                    </div>
                                                )
                                            })}
                                        </Tab>
                                    )}
                                    {activeTab === 2 && (
                                        <Tab key='cookies-third-tab' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <div className="content" dangerouslySetInnerHTML={{ __html: aboutCookiesTab.tabContent }} />
                                        </Tab>
                                    )}
                                </AnimatePresence>
                            </TabWrapper>
                            <Buttons>
                                <button tabIndex={isActive ? '0' : '-1'} onClick={() => { rejectAll() }}>
                                    {denyButton[language]}
                                </button>
                                {activeTab === 1 ? (
                                    <button onClick={() => { acceptPart() }} tabIndex={isActive ? '0' : '-1'}>
                                        {allowChosenButton[language]}
                                    </button>
                                ) : (
                                    <button onClick={() => { setActiveTab(1) }} tabIndex={isActive ? '0' : '-1'}>
                                        {setButton[language]}
                                    </button>
                                )}
                                <button tabIndex={isActive ? '0' : '-1'} onClick={() => { acceptAll() }} className="allow">
                                    {allowButton[language]}
                                </button>
                            </Buttons>
                        </Content>
                    </Wrapper>
                </>
            )}
        </AnimatePresence>
    )
}

const TabWrapper = styled(motion.div)`
    overflow: auto;
    max-height: calc(100vh - 200px - 48px - 48px - 48px - 32px);
    padding-right: 20px;
    margin-right: -20px;

    @media (max-height: 639px) {
        max-height: calc(100vh - 48px - 48px - 92px - 32px);
    }
`

const Overlay = styled(motion.div)`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: #888888;
    mix-blend-mode: multiply;
    z-index: 10000;
    pointer-events: none;
`

const Wrapper = styled(motion.aside)`
    position: fixed;
    z-index: 100000;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    max-width: 800px;
    width: 100%;
    max-height: calc(100vh - 200px);


    @media (max-height: 639px) {
        max-height: 100vh;
    }

    *{
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 0.003em;

        @media (max-width: 440px){
            font-size: 14px;
        }
    }

    .item-wrapper{
        *{
            color: #BBBBBB !important;
            
            transition: color .2s cubic-bezier(0.39, 0.575, 0.565, 1);
        }

        .underline{
            background-image: linear-gradient(#BBBBBB, #BBBBBB);
        }

        &.active{
            *{
                color: #31231E !important;
            }

            .underline{
                
                background-image: linear-gradient(#31231E, #31231E);
            }
        }
    }
`

const Content = styled.div`
    width: 100%;
    max-height: 100%;
    background-color: #fff;
    padding: clamp(16px, ${32 / 540 * 100}vw, 48px) clamp(16px, ${32 / 540 * 100}vw, 96px);
`

const TabsControl = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    button{
        padding: 0 24px 8px 24px;
        border: none;
        background-color: transparent;
        cursor: pointer;
        font-size: 18px;
        position: relative;
        

        @media (max-width: 440px){
            font-size: 14px;
            padding: 0 16px 8px 16px;
        }
        @media (max-width: 340px){
            padding: 0 12px 8px 12px;
        }
        .underline {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            height: 4px;
            background: #926F45;
            opacity: 0.85;
        }
    }
`

const Buttons = styled.div`
    margin-top: 32px;
    display: flex;
    justify-content: center;
    gap: 24px;
    align-items: center;
    

    button{
        padding: 14px 48px;
        background: #F9F5F0;
        border: none;
        cursor: pointer;
        transition: background-color .4s cubic-bezier(0.42, 0, 0.58, 1);

        &:hover{
            background-color: #F4F4F4;
        }

        &.allow{
            color: #fff;
            background-color: var(--color-brown);

            &:hover{
                background-color: #785836;
            }
        }
    }

    @media (max-width: 640px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 16px;

        button{
            padding: 14px 0 ;
            width: 100%;
            text-align: center;
        }

        .allow{
            grid-column-end: 3;
            grid-column-start: 1;
        }
    }
`

const Tab = styled(motion.div)`

    .content{
        display: grid;
        grid-gap: 8px;
        margin-top: 18px;
    }


    .parts{
        margin-top: 26px;
    }

    .name{
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .description{
        margin-top: 8px;
    }

    .show-all{
        text-transform: uppercase;
        width: fit-content;
        border: none;
        background-color: transparent;
        cursor: pointer;
        grid-column-start: 0;
        grid-column-end: 3;
        margin: 0 auto;
        transition: all .4s cubic-bezier(0.42, 0, 0.58, 1);

        @media (max-width: 640px){
            grid-column-start: 1;
            grid-column-end: 3;
        }
    }

    .grid-name{
        margin-top: 16px;
        text-decoration-line: underline;
    }

    .grid{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 16px;
        margin-top: 12px;

        @media (max-width: 640px){
            grid-template-columns: 1fr 1fr;
        }

        @media (max-width: 380px){
            grid-template-columns: 1fr;
        }
    }

    .desctop{
        display: inline;

        @media (max-width: 640px) {
            display: none;
        }
    }

    .tablet{
        display: none;

        @media (max-width: 640px) {
            display: inline;
        }

        @media (max-width: 440px) {
            display: none;
        }
    }

    .mobile{
        display: none;

        @media (max-width: 440px) {
            display: inline;
        }
    }

    .item{
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media (max-width: 640px) {
            &.no-show{
                &:nth-child(3){
                    display: none;
                }
            }
        }

        @media (max-width: 380px){
            &.no-show{
                &:nth-child(2){
                    display: none;
                }
            }
        }
        
        p{
            font-weight: 400;
            font-size: 12px;
            line-height: 15px;
            letter-spacing: 0.003em;
            color: #31231E;
        }

        .item-name{
            margin-bottom: 4px;
        }

        .item-description{
            margin-bottom: 4px;
        }

        .item-flex{
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 4px 8px;
            flex-wrap: wrap;
        }
    }

    .radio{
        width: 45px;
        height: 24px;
        border-radius: 42px;
        background-color: #F8F5F0;
        border: none;
        position: relative;
        cursor: pointer;
        transition: background-color .2s cubic-bezier(0.47, 0, 0.745, 0.715);

        span{
            position: absolute;
            top: 4px;
            left: 4px;
            width: 16px;
            height: 16px;
            background-color: #926F45;
            border-radius: 40px;
            transition: all .2s cubic-bezier(0.645, 0.045, 0.355, 1);
        }


        &.active{
            background-color: #926F45;
            span{
                left: 25px;
                background-color: #fff;
            }
        }
    }
`