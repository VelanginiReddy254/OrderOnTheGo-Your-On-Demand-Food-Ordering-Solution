import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className='m-5 w-100 text-center fs-3 fw-bold text-white bg-dark py-3 rounded'>
        The Cart is Empty!
      </div>
    );
  }

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
    const response = await fetch("http://localhost:5000/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("Order Response:", response);

    if (response.status === 200) {
      dispatch({ type: "DROP" });
      alert("Order placed successfully!");
    } else {
      alert("Failed to place order.");
    }
  };

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
      <table className='table table-hover bg-dark text-white'>
        <thead className='text-success fs-4 '>
          <tr>
            <th className="text-white">#</th>
            <th className="text-white">Name</th>
            <th className="text-white">Quantity</th>
            <th className="text-white">Option</th>
            <th className="text-white">Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody className='text-white'>
          {data.map((food, index) => (
            <tr key={index}>
              <th scope='row' className="text-white">{index + 1}</th>
              <td className="text-white">{food.name}</td>
              <td className="text-white">{food.qty}</td>
              <td className="text-white">{food.size}</td>
              <td className="text-white">{food.price}</td>
              <td>
                <button type="button" className="btn p-0">
                  <DeleteIcon style={{ color: 'white' }} onClick={() => dispatch({ type: "REMOVE", index })} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className='fs-2 text-white'>Total Price: ₹{totalPrice}/-</h1>

      <div>
        <button className='btn bg-success mt-5 text-white fw-bold' onClick={handleCheckOut}>
          Check Out
        </button>
      </div>
    </div>
  );
}