import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Checkout.css';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal } = useCart();
  
  // Form state
  const [email, setEmail] = useState('');
  const [emailOffers, setEmailOffers] = useState(false);
  const [country, setCountry] = useState('Sri Lanka');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);
  const [textOffers, setTextOffers] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [discountCode, setDiscountCode] = useState('');
  
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [useSameAddress, setUseSameAddress] = useState(true);

  const shippingCost = 399;
  const total = subtotal + shippingCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment processing here
    alert('Order placed successfully!');
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Left side - Forms */}
        <div className="checkout-left">
          {/* Header */}
          <div className="checkout-header">
            <button onClick={() => navigate(-1)} className="checkout-back">
              <ArrowLeft size={18} />
              Back to cart
            </button>
            <h1>Checkout</h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Express checkout */}
            <div className="checkout-section">
              <h2>Express checkout</h2>
              <button type="button" className="gpay-btn">
                <span className="gpay-logo">G</span> Pay
              </button>
              <div className="checkout-divider">OR</div>
            </div>

            {/* Contact */}
            <div className="checkout-section">
              <div className="section-header">
                <h2>Contact</h2>
                <button type="button" className="sign-in-link">Sign in</button>
              </div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={emailOffers}
                  onChange={(e) => setEmailOffers(e.target.checked)}
                />
                Email me with news and offers
              </label>
            </div>

            {/* Delivery */}
            <div className="checkout-section">
              <h2>Delivery</h2>
              
              <select value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="India">India</option>
                <option value="Maldives">Maldives</option>
              </select>

              <div className="name-row">
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
              />

              <div className="city-postal-row">
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Postal code (optional)"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>

              <div className="phone-input">
                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <Info size={16} className="phone-info" />
              </div>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                />
                Save this information for next time
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={textOffers}
                  onChange={(e) => setTextOffers(e.target.checked)}
                />
                Text me with news and offers
              </label>
            </div>

            {/* Shipping method */}
            <div className="checkout-section">
              <h2>Shipping method</h2>
              <div className="shipping-option">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    checked={shippingMethod === 'standard'}
                    onChange={(e) => setShippingMethod(e.target.value)}
                  />
                  <div className="shipping-details">
                    <div>
                      <span className="shipping-name">Standard</span>
                      <span className="shipping-time">3 - 12 Business Days</span>
                    </div>
                    <span className="shipping-price">Rs 399.00</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Payment */}
            <div className="checkout-section">
              <h2>Payment</h2>
              <p className="payment-security">All transactions are secure and encrypted.</p>

              {/* Credit Card */}
              <div className="payment-method">
                <label className="payment-method-header">
                  <input
                    type="radio"
                    name="payment"
                    value="credit-card"
                    checked={paymentMethod === 'credit-card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Credit card</span>
                  <div className="card-logos">
                    <span className="card-logo visa">VISA</span>
                    <span className="card-logo mastercard">MC</span>
                    <span className="card-logo amex">AMEX</span>
                    <span className="card-more">+4</span>
                  </div>
                </label>
                
                {paymentMethod === 'credit-card' && (
                  <div className="credit-card-form">
                    <div className="card-number-input">
                      <input
                        type="text"
                        placeholder="Card number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                      />
                      <Lock size={16} className="lock-icon" />
                    </div>
                    
                    <div className="card-details-row">
                      <input
                        type="text"
                        placeholder="Expiration date (MM / YY)"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                      />
                      <div className="security-code-input">
                        <input
                          type="text"
                          placeholder="Security code"
                          value={securityCode}
                          onChange={(e) => setSecurityCode(e.target.value)}
                          required
                        />
                        <Info size={16} className="security-info" />
                      </div>
                    </div>
                    
                    <input
                      type="text"
                      placeholder="Name on card"
                      value={nameOnCard}
                      onChange={(e) => setNameOnCard(e.target.value)}
                      required
                    />
                    
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={useSameAddress}
                        onChange={(e) => setUseSameAddress(e.target.checked)}
                      />
                      Use shipping address as billing address
                    </label>
                  </div>
                )}
              </div>

              {/* Other payment methods */}
              <div className="payment-method">
                <label className="payment-method-header">
                  <input
                    type="radio"
                    name="payment"
                    value="onepay"
                    checked={paymentMethod === 'onepay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Credit / Debit Card Payments (onepay)</span>
                  <span className="card-logo amex-blue">AMEX</span>
                </label>
              </div>

              <div className="payment-method">
                <label className="payment-method-header">
                  <input
                    type="radio"
                    name="payment"
                    value="koko"
                    checked={paymentMethod === 'koko'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Koko: Buy Now Pay Later</span>
                  <div className="card-logos">
                    <span className="card-logo visa">VISA</span>
                    <span className="card-logo mastercard">MC</span>
                  </div>
                </label>
              </div>

              <div className="payment-method">
                <label className="payment-method-header">
                  <input
                    type="radio"
                    name="payment"
                    value="mintpay"
                    checked={paymentMethod === 'mintpay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Mintpay | Shop now. Pay later.</span>
                  <div className="card-logos">
                    <span className="card-logo visa">VISA</span>
                    <span className="card-logo mastercard">MC</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Pay Now Button */}
            <button type="submit" className="pay-now-btn">
              Pay now
            </button>
          </form>

          {/* Footer links */}
          <div className="checkout-footer">
            <a href="/refund-policy">Refund policy</a>
            <a href="/shipping">Shipping</a>
            <a href="/terms">Terms of service</a>
            <a href="/contact">Contact</a>
          </div>
        </div>

        {/* Right side - Order Summary */}
        <div className="checkout-right">
          {/* Order items */}
          <div className="order-items">
            {items.map((item, idx) => (
              <div key={idx} className="order-item">
                <div className="item-image-wrap">
                  <img src={item.img} alt={item.name} />
                  <span className="item-qty">{item.qty}</span>
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  {item.selectedColor && <p>Color: {item.selectedColor.label}</p>}
                  {item.selectedSize && item.selectedSize !== 'One Size' && (
                    <p>Size: {item.selectedSize}</p>
                  )}
                </div>
                <span className="item-price">LKR {(item.price * item.qty).toLocaleString('en-US')}</span>
              </div>
            ))}
          </div>

          {/* Discount code */}
          <div className="discount-section">
            <div className="discount-input-wrap">
              <input
                type="text"
                placeholder="Discount code or gift card"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button type="button">Apply</button>
            </div>
          </div>

          {/* Order totals */}
          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>Rs {subtotal.toLocaleString('en-US')}.00</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>Rs {shippingCost.toLocaleString('en-US')}.00</span>
            </div>
            <div className="total-row total-final">
              <span>Total</span>
              <span>
                <small>LKR</small> Rs {total.toLocaleString('en-US')}.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}