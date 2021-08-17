import React from 'react';
import './Home.css';
import Products from './Products';

function Home() {
    return (
        <div className = 'home'>
            <div className = 'home__container'>
                <img  className = 'home__image' src = 'https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'/>
                <div className = 'home__row'>
                    <Products id = '123454' title = 'The lean startup' price = '19.99' rating = {5} image = 'https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg'/>
                    <Products/>
                </div>
                <div className = 'home__row'>
                    <Products/>
                    <Products/>
                    <Products/>
                </div>
                <div className = 'home__row'>
                    <Products/>
                </div>
            </div>
            
        </div>
    )
}

export default Home
