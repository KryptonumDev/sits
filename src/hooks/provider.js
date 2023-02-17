import React, { useEffect, useState } from "react"
import { getCookie } from "../helpers/coockie-manager"

export const myContext = React.createContext();

const Provider = ({ children }) => {

    const [currentAlternates, changeAlternates] = useState(null)
    const [transition, setTransition] = useState(0)
    const [searchInputValue, setSearchInputValue] = useState(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search)
            const search = urlParams.get('search')
            return search ? search : ''
        }

        return ''
    })
    const [favouritesCount, setFavouritesCount] = useState(0)

    const recalculateFavouritesCount = () => {
        let itemsCount = 0
        if (typeof window !== 'undefined') {
            let collection = getCookie('collections')
            let products = getCookie('products')
            let materials = getCookie('materials')
            let colors = getCookie('colors')

            if (collection?.includes("|")) {
                itemsCount += getCookie('collections').split("|").length - 1
            }
            if (products?.includes("|")) {
                itemsCount += getCookie('products').split("|").length - 1
            }
            if (materials?.includes("|")) {
                itemsCount += getCookie('materials').split("|").length - 1
            }
            if (colors?.includes("|")) {
                itemsCount += getCookie('colors').split("|").length - 1
            }
        }

        setFavouritesCount(itemsCount)
    }

    useEffect(() => {
        recalculateFavouritesCount()
    }, [])
    return (
        <myContext.Provider value={{
            currentAlternates,
            changeAlternates,
            searchInputValue,
            setSearchInputValue,
            favouritesCount,
            recalculateFavouritesCount,
            transition,
            setTransition
        }}>
            {children}
        </myContext.Provider>
    )

}

export default Provider