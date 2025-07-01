import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/card';

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        response = await response.json();
        setFoodItem(response[0]);
        setFoodCat(response[1]);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <Navbar />
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousel'>
                    <div className=" carousel-caption" style={{ zIndex: '10' }}>
                        <div className="d-flex justify-content-center align-items-center mb-3">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            {/*<button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>*/}
                        </div>
                    </div>

                    <div className="carousel-item active">
                        <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="Burger" />
                    </div>

                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="Momos" />
                    </div>

                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="Seafood" />
                    </div>

                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>

                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className="container my-4">
                {foodCat.length > 0 &&
                    foodCat.map((data) => (
                        <div key={data._id} className="mb-3">
                            <h2 className="fs-3 mb-3">{data.CategoryName}</h2>
                            <hr />

                            {/* One single "row g-4" */}
                            <div className="row g-4">
                                {foodItem.length > 0 ? (
                                    foodItem
                                        .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                                        .map((filteredItems) => (
                                            <div
                                                key={filteredItems._id}
                                                className="col-12 col-md-6 col-lg-3"
                                            >
                                                <Card
                                                    foodItem={filteredItems}
                                                    options={filteredItems.options[0]}
                                                
                                               ></Card> 
                                            </div>
                                        ))
                                ) : (
                                    <div className="col-12">No such data found</div>
                                )}
                            </div>
                        </div>
                    ))}


            </div>

            <Footer />
        </div>
    );
}