import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'


export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem('userEmail');
    console.log("Fetching orders for email:", userEmail);  // <--- Add this line

    await fetch("http://localhost:5000/api/myOrderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userEmail })
    })
      .then(async (res) => {
        const response = await res.json();
        setOrderData(response.orderData || []);
      });
  };


  useEffect(() => {
    fetchMyOrder()
  }, [])

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <div className='row'>


          {
            orderData.length > 0 ? orderData.slice().reverse().map((order, index) => {
              const subtotal = order.order_items.reduce((sum, item) => sum + item.price, 0);
              const taxRate = 0.05; // 5%
              const tax = Math.round(subtotal * taxRate);
              const discount = subtotal > 500 ? 50 : 0; // flat ₹50 off if order > ₹500
              const finalTotal = subtotal + tax - discount;

              return (
                <div key={index} className="col-12">
                  <div className='m-auto mt-5 text-center fw-bold fs-4'>
                    {order.order_date}
                    <hr />
                  </div>

                  {/* Order Items */}
                  <div className='row'>
                    {
                      order.order_items.map((item, idx) => (
                        <div key={idx} className='col-12 col-md-6 col-lg-3'>
                          <div className="card mt-3" style={{ width: "16rem", maxHeight: "200px" }}>
                            <div className="card-body">
                              <h5 className="card-title">{item.name}</h5>
                              <div className='container w-100 p-0' style={{ height: "38px" }}>
                                <span className='m-1'>{item.qty}</span>
                                <span className='m-1'>{item.size}</span>
                                <span className='m-1'>{order.order_date}</span>
                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                  ₹{item.price}/-
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>

                  {/* Summary Box */}
                  <div className="text-end pe-4 mt-2">
                    <div className="fw-normal">Subtotal: ₹{subtotal}/-</div>
                    <div className="fw-normal">Tax (5%): ₹{tax}/-</div>
                    {discount > 0 && (
                      <div className="fw-normal text-success">Discount: ₹{discount}/-</div>
                    )}
                    <div className="fw-bold fs-5 mt-1">Total: ₹{finalTotal}/-</div>
                  </div>
                </div>
              );
            }) : <div className='text-center mt-5'>No orders found</div>
          }


        </div>

      </div>

      <div>
        <Footer />
      </div>
    </>
  )
}
