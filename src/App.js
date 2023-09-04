import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react'

function App() {
  const [cart, setCart] = useState({});
  const [quantities, setQuantities] = useState({
    BTC: 0,
    Doge: 0,
    Ripple: 0,
  });

  const [showInput, setShowInput] = useState({
    BTC: false,
    Doge: false,
    Ripple: false,
  });

  const prices = {
    BTC: 25000,
    Doge: 0.75,
    Ripple: 1.5,
  };

  const handleQuantityChange = (coin, value) => {
    setQuantities({ ...quantities, [coin]: value });
  };

  const toggleInput = (coin) => {
    setShowInput({ ...showInput, [coin]: !showInput[coin] });
  };

  const addToCart = (coin) => {
    const quantity = quantities[coin];
    if (quantity > 0) {
      setCart({
        ...cart,
        [coin]: quantity,
      });
      setQuantities({
        ...quantities,
        [coin]: 0,
      });
      setShowInput({ ...showInput, [coin]: false });
    }
  };

  const calculateTotal = () => {
    let total = 0;
    for (const coin in cart) {
      total += cart[coin] * prices[coin];
    }
    return total.toFixed(2);
  };

  return (
    <div style={{display:'grid'}}>
      <h1>Crypto Cart</h1>
      <div className='main-box'>
      {Object.keys(prices).map((coin) => (
        <div style={{backgroundColor:'yellow',color:'white'}} key={coin}>
          <h2>{coin}</h2>
          <p>Price: ${prices[coin]}</p>
          <button style={{backgroundColor:'black',color:'white'}}  onClick={() => toggleInput(coin)}>Quantity</button>
          {showInput[coin] && (
            <div>
              <input
                type="number"
                step="0.01"
                value={quantities[coin]}
                onChange={(e) => handleQuantityChange(coin, parseFloat(e.target.value))}
                placeholder={`Enter Quantity`}
              />
            </div>
          )}
          <button style={{backgroundColor:'blue',color:'white'}} onClick={() => addToCart(coin)}>Add</button>
        </div>
      ))}
      <div>
        </div>
        <h2>Cart</h2>
        <ul>
          {Object.keys(cart).map((coin) => (
            <li key={coin}>
              {coin}: {cart[coin]}   = ${(cart[coin] * prices[coin]).toFixed(2)}
            </li>
          ))}
        </ul>
        <p>Total Amount: ${calculateTotal()}</p>
      </div>
    </div>
  );
}

export default App;
