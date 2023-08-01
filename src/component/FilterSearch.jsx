import './FilterSearch.css'
import arrow from '../assets/icon-arrow.svg'
import { useState } from 'react'

function FilterSearch({ getApiByRegion, getApiByName, theme }) {
    const [span, setSpan] = useState(false) // -> filter click
    const [selectedRegion, setSelectedRegion] = useState('Filter by Region'); // -> filter region title
    const [value, setValue] = useState('')
    const listRegions = ["Africa", "America", "Asia", "Europe", "Oceania"]

    const searchForName = (e) => {
        e.preventDefault();
        getApiByName(value)
        setValue('')
    }

    // style
    const displayRegionFilter = {
        height: span ? 'inherit' : '0',
        padding: span ? '1rem' : '0',
        backgroundColor: theme? '#2b3a47': 'var(--white)'
    }
    const activeArrow = { transform: span ? 'rotate(-180deg)' : 'rotate(0)' }
    const cardBg = {
        backgroundColor: theme? '#2b3a47': 'var(--white)',
        color: theme? 'var(--white)': 'var(--dark-blue-lmode-text)'
    }
    const cardBgg = { backgroundColor: theme? '#2b3a47': 'transparent' }
    const displayText = { color: theme? 'var(--white)': 'var(--dark-blue-lmode-text)' }



    return (
        <div className='filter-search'>
            <form onSubmit={searchForName}>
                <input type="text" placeholder='Search for a country...' className='search' value={value} onChange={(e) => setValue(e.target.value)} style={cardBg} />
            </form>

            <div className="filter-region" style={cardBgg}>
                <p className='region-selected' onClick={() => setSpan(!span)} style={cardBg}>
                    {selectedRegion}  <span> <img src={arrow} alt="arrow" className='arrow' style={activeArrow} /> </span>
                </p>

                <div className="region-list" style={displayRegionFilter}>
                    {listRegions.map((region, i) => (
                        <p key={i} style={displayText}
                            onClick={() => {
                                setSpan(false)
                                setSelectedRegion(region)
                                getApiByRegion(`region/${region}`)
                            }}
                        >{region}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FilterSearch