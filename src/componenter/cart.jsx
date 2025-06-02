import vectorIcon2 from "../asse/shopping.jpg";
import useStore from "../store/useStore";
import "./cart.css";

export default function Cart() {
  const { cartItems, removeFromCart } = useStore();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.pris || 0) * item.quantity, 0);

  return (
    <div className="cart-container">
      <div className="cart-top">
        <img src={vectorIcon2} alt="Kundkorg" className="cart-icon" />
        {cartCount > 0 && (
          <>
            <div className="cart-count">{cartCount}</div>
            <div className="cart-total">
              <p>{totalPrice} kr</p>
            </div>
          </>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="cart-items-list">
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              {item.img && <img src={item.img} alt={item.namn} className="cart-item-img" />}
              <div className="cart-item-info">
                <span className="cart-item-name">{item.namn}</span>
                <span className="cart-item-quantity">Antal: {item.quantity}</span>
                <span className="cart-item-price">{item.pris} kr</span>
              </div>
            <button
              className="cart-remove-button"
              onClick={() => removeFromCart(item.id)}
              title="Ta bort"
            >
              &times;
            </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
