import { Route, Routes } from 'react-router-dom'
import CountryDetail from './CountryDetail'
import HomePage from './HomePage'
import ThemeContext from './ThemCotext'
import { useEffect, useState, useContext } from 'react'

export default function AppRoutes() {
    const [country, setCountry] = useState(null)
    const [clickedCoutry, setClickCountry] = useState(null)
    const theme = useContext(ThemeContext);

    const getCountryData = (data) => {
        setCountry(data)
    }

    useEffect(() => {
        setClickCountry(country)
    }, [country])

    return (
        <Routes>
            <Route path='/' element={<HomePage getCountryData={getCountryData} theme={theme} />} />
            <Route path='/countryDetail' element={<CountryDetail clickedCoutry={clickedCoutry} theme={theme} />} />
        </Routes>

    )
}