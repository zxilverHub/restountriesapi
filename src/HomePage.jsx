import { Link } from 'react-router-dom';
import FilterSearch from "./component/FilterSearch";
import './HomePage.css';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios'

function HomePage({ getCountryData, theme }) {
  const [data, setData] = useState(null);
  const [toFetch, setToFetch] = useState('all');

  useEffect(() => {
    async function fetchAllData() {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/${toFetch}`);
        setData(response.data);
      } catch (error) {
        setData([]);
        console.log('Error fetching data:', error);
      }
    }

    fetchAllData();
  }, [toFetch]);

  const getApiByRegion = useCallback((filter) => {
    setToFetch(filter);
  }, []);

  const getApiByName = useCallback((filter) => {
    setToFetch(`name/${filter}`);
  }, []);

  const countryDatas = (countryData) => {
    getCountryData(countryData)
  }

  // theme style
  const displayBg = { backgroundColor: theme? 'var(--dark-blue-dmode-bg)': 'var(light-gray-bg)' }
  const cardBg = {backgroundColor: theme? '#2b3a47': 'var(--white)' }
  const displayText = {
    color: theme? 'var(--white)': 'var(--dark-blue-lmode-text)',
    userSelect: 'none'
  }
  const textSub = {color: theme? 'var(--light-gray-bg)': 'var(--dark-blue-lmode-text)',}

  if (!data) {
    return (
      <div className="homepage" style={displayBg}>
        <FilterSearch getApiByRegion={getApiByRegion} getApiByName={getApiByName} theme={theme} />
        <div className="countries">
          <p style={displayText}>No Result</p>
        </div>
      </div>
    )
  } else {

    return (
      <div className="homepage" style={displayBg}>
        <FilterSearch getApiByRegion={getApiByRegion} getApiByName={getApiByName} theme={theme} />
        {data &&
          <div className="countries">
            {data.map((countryData, i) => (
              <Link to='/countryDetail' key={i} className='country-links' onClick={() => countryDatas(countryData)} >
                <img src={`${countryData?.flags?.png}`} alt={countryData?.name?.common} className='flag' />
                <div className="info" style={cardBg}>
                  <p className='title-lm country-name' style={displayText}>{countryData?.name?.common}</p>
                  <p className='country-info' style={displayText} >Population: <span style={textSub}>{countryData?.population}</span></p>
                  <p className='country-info' style={displayText} >Region: <span style={textSub}>{countryData?.region}</span></p>
                  <p className='country-info' style={displayText} >Capital: <span style={textSub}>{countryData?.capital}</span></p>
                </div>
              </Link>
            ))}
          </div>
        }
      </div>
    );

  }
}

export default HomePage;
