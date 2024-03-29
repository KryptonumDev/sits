import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { getCookie, setCookie } from '../../helpers/coockie-manager'
import { toast } from 'react-toastify'
import { Link } from 'gatsby'
import { myContext } from '../../hooks/provider'
import { addMessage, favouriteLink, removeMessage } from '../../texts'
import { favouritesUrl } from '../../texts/urls'


const Toast = ({ toastProps }) => {
  return (
    <ToastWrapper to={favouritesUrl[toastProps.language]}>
      {toastProps.type === 'add'
        ? toastProps.title + addMessage[toastProps.language]
        : toastProps.title + removeMessage[toastProps.language]
      }
      <span className='underline' dangerouslySetInnerHTML={{ __html: favouriteLink[toastProps.language] }} />
    </ToastWrapper>
  )
}

const ToastWrapper = styled(Link)`
  display: block;
  .underline{
    display: inline;
    font-size: 14px;
  }

  &:hover{
    .underline{
      background-size: 100% 1px;
    }
  }
`

export default function AddToFauvorite({ language, setRerender = () => { }, rerender, type, title }) {
  const [isActive, setIsActive] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }
    let cookie = getCookie(type + language)
    if (!cookie) {
      setCookie(type + language, '')
    }
    return cookie?.includes(title)
  })

  const clickHandler = (e, recalculate, language) => {
    e.preventDefault()
    let cookie = getCookie(type + language)
    if (cookie?.includes(title)) {
      cookie = cookie.replace(title + '|', '')
      setCookie(type + language, cookie)
      setIsActive(false)
      toast(<Toast />, { type: 'remove', title: title, language: language })
    } else {
      setCookie(type + language, cookie + title + '|')
      setIsActive(true)
      toast(<Toast />, { type: 'add', title: title, language: language })
    }
    setRerender(Math.random())
    recalculate()
  }

  useEffect(() => {
    setIsActive(() => {
      if (typeof window === 'undefined') {
        return false
      }
      let cookie = getCookie(type + language)
      if (!cookie) {
        setCookie(type + language, '')
      }
      return cookie?.includes(title)
    })
  }, [rerender, type, title])

  return (
    <myContext.Consumer>
      {context => {
        return (
          <Button
            aria-label={
              isActive
                ? 'remove item from favourite list'
                : 'add item to favourite list'
            }
            onClick={(e) => {
              clickHandler(e, context.recalculateFavouritesCount, language);
            }}
            className={isActive ? 'active hearth' : 'hearth'}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='30'
              viewBox='0 0 32 30'>
              <g id='Fav' transform='translate(1.25 1.25)'>
                <path
                  id='Path_155'
                  data-name='Path 155'
                  d='M14.665,27.375l-1.5-1.382a131.466,131.466,0,0,1-9.569-9.71Q0,12.138,0,7.88A7.7,7.7,0,0,1,2.218,2.259,7.375,7.375,0,0,1,7.7,0a8.214,8.214,0,0,1,3.7.915,8.759,8.759,0,0,1,3.263,3.006A10.7,10.7,0,0,1,18,.915,7.631,7.631,0,0,1,21.63,0a7.375,7.375,0,0,1,5.481,2.259A7.7,7.7,0,0,1,29.329,7.88q0,4.258-3.593,8.4a131.465,131.465,0,0,1-9.569,9.71Zm0-2.95'
                  transform='translate(0 0)'
                  fill='rgba(219,135,122,0)'
                  stroke='#bababa'
                  strokeWidth='2.5'
                />
              </g>
            </svg>
          </Button>
        )
      }}
    </myContext.Consumer>
  )
}

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  transform-origin: 50% 50%;

  &:hover {
    svg path{
      stroke: #edc53d;
    }
  }

  &.active {
    path {
      fill: #edc53d;
      stroke: #edc53d;
    }
  }

  svg {
    path{
      transition: all .3s cubic-bezier(0.42, 0, 0.58, 1);
    }
    width: 28px;
    height: 26px;

    @media (max-width: 1194px) {
      width: 23px;
      height: 21px;
    }

    @media (max-width: 640px) {
      width: 21px;
      height: 19px;
    }
  }
`
