import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from './language';
import cardContent from "../components/translations/cardContent.json"; // Correct path to the JSON file
import '../Assets/css/rotating-card.css';

const CardComponent = () => {
    const { currentLanguage } = useLanguage();
    const [flippedCard, setFlippedCard] = useState(null);

    const handleCardClick = (cardNumber) => {
        if (flippedCard === cardNumber) {
            setFlippedCard(null);
        } else {
            setFlippedCard(cardNumber);
        }
    }

    useEffect(() => {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
    
        // Optionally, you can also focus on the first input field or element
        const firstInputElement = document.querySelector('input');
        if (firstInputElement) {
            firstInputElement.focus();
        }
    }, []);
    
    const content = currentLanguage === 'en' ? cardContent.en : cardContent.es;

    return (
        <>
            <div className="CotizadorContainer">
                <div className="tituloMainCotizador">
                    <h1>{content.title}</h1>
                </div>
                <div className="card-container">
                
                    <div className="card-wrapper">
                        {content.cards.map((card, index) => (
                            <div 
                                key={index} 
                                className={`card${index + 1} ${flippedCard === index + 1 ? 'manual-flip' : ''}`} 
                                onClick={() => handleCardClick(index + 1)}
                            >
                                <div className={`front parte${index}`}>
                                    <h1>{card.title}</h1>
                                </div>
                                <div className="back">
                                    <h3>{card.backText}</h3>
                                    <Link to={card.link} className="quote-button">{card.buttonText}</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <hr />
        </>
    );
}

export default CardComponent;
