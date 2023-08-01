import './CountryDetail.css'
import { Link } from 'react-router-dom'
import back from './assets/arrow-left-solid-lm.svg'
import dback from './assets/arrow-left-solid -dm.svg'
import { useEffect, useState } from 'react'

function CountryDetail({ clickedCoutry, theme }) {
  const [currencyKeys, setCurrencyKeys] = useState([])
  const [nativeName, setNativeName] = useState([])
  const [languages, setLanguages] = useState([])
  const [borders, setBorders] = useState([])

  useEffect(()=>{
    if(clickedCoutry) {
      setCurrencyKeys(Object.keys(clickedCoutry.currencies))
      setNativeName(Object.keys(clickedCoutry.name.nativeName))
      setLanguages(Object.keys(clickedCoutry.languages))
      if(clickedCoutry.borders) setBorders(clickedCoutry.borders)
      else setBorders(null)
    }
  }, [clickedCoutry])

  // styke theme
  const cardBg = {
    backgroundColor: theme? '#2b3a47': 'var(--white)',
    color: theme? 'var(--white)': 'var(--dark-blue-lmode-text)'
  }
  const displayText = { color: theme? 'var(--white)': 'var(--dark-blue-lmode-text)' }
  const displayBg = { backgroundColor: theme? 'var(--dark-blue-dmode-bg)': 'var(--white)' }



  return (
    <div className='coutry-detail' style={displayBg}>
      <Link className='back-button' to='/' style={cardBg}>  <img src={ (theme? dback: back) } alt="<--" className='back-icon'/>Back</Link>

      <div className="country">
        <div className="country-flag">
          <img src={ clickedCoutry?.flags?.png } alt="flag" />
        </div>

        <div className="country-infos">
          <p className='title-ld' style={displayText}>{ clickedCoutry?.name?.common }</p>

          <div className='country-more-infos'>
              <p className='country-info' style={displayText}>Native Name: <span style={displayText}> { clickedCoutry?.name?.nativeName[nativeName[0]]?.common } </span>  </p>
              <p className='country-info' style={displayText}>Population: <span style={displayText}>{clickedCoutry?.population}</span></p>
              <p className='country-info' style={displayText}>Region: <span style={displayText}> { clickedCoutry?.region }</span> </p>
              <p className='country-info' style={displayText}>Sub region: <span style={displayText}> { clickedCoutry?.subregion }</span></p>
              <p className='country-info' style={displayText}>Capital: <span style={displayText}> { clickedCoutry?.capital } </span></p>
              <p className='country-info' style={displayText}>Top level Domain: <span style={displayText}> { clickedCoutry?.tld }</span></p>
              <p className='country-info' style={displayText}>Currencies: <span style={displayText}>{clickedCoutry?.currencies[currencyKeys[0]]?.name}</span></p>
              <p className='country-info' style={displayText}>Languages: 
               { languages.map((lang, i)=>(
                <span key={i} style={displayText}>  { clickedCoutry?.languages[lang] } {i < languages.length-1 && ','} </span>
              )) }
              </p>
          </div>

          { borders && 
          <div className="border-countries" style={displayText}>
            <p className='border'>Border Countries: </p>
            { borders.map((border, i)=>(
              <span key={i} style={cardBg}>{ border }</span>
            )) }
          </div>
          }

        </div>
      </div>
    </div>
  )
}

export default CountryDetail