// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'
import CryptocurrencyItem from '../CryptocurrencyItem'

class CryptocurrenciesList extends Component {
  state = {isLoading: true, cryptoCurrenciesData: []}

  componentDidMount() {
    this.getCryptoCurrenciesData()
  }

  getCryptoCurrenciesData = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/crypto-currency-converter',
    )
    const data = await response.json()

    const formattedData = data.map(items => ({
      currencyName: items.currency_name,
      usdValue: items.usd_value,
      euroValue: items.euro_value,
      id: items.id,
      currencyLogo: items.currency_logo,
    }))
    this.setState({cryptoCurrenciesData: formattedData, isLoading: false})
  }

  render() {
    const {cryptoCurrenciesData, isLoading} = this.state
    return (
      <div>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Rings" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          <ul className="crypto-list-container">
            <li className="crypto-list-items">
              <div className="head-image-container">
                <h1 className="main-heading">Cryptocurrency Tracker</h1>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
                  alt="cryptocurrency"
                  className="main-logo"
                />
              </div>
            </li>
            <li className="crypto-nav-container">
              <navbar className="nave-container">
                <div className="coin-container">
                  <p className="coin">Coin Type</p>
                </div>
                <div className="currency-container">
                  <p className="currency-type">USD</p>
                  <p className="currency-type">EURO</p>
                </div>
              </navbar>
              <div className="currency-items-container">
                {cryptoCurrenciesData.map(eachItem => (
                  <CryptocurrencyItem
                    key={eachItem.id}
                    cryptoDetails={eachItem}
                  />
                ))}
              </div>
            </li>
          </ul>
        )}
      </div>
    )
  }
}

export default CryptocurrenciesList
