import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import { calculateTotal, getCartItems } from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const {cartItems, isLoading} = useSelector((store) => store.cart);
  const {isOpen} = useSelector((store) => store.modal);

  useEffect(() => {
    dispatch(calculateTotal())
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems('random'))
  }, []);

  if (isLoading) {
    return <div><h1>Loading...</h1></div>
  }
  
  return (
    <div>
      {isOpen && <Modal/>}
      <Navbar/>
      <CartContainer/>
    </div>
  )
}
export default App;
