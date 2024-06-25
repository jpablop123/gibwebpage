.btn:hover,
.btn:focus,
.btn:active {
    outline: 0 !important;
}

.card2, .card1, .card3 {
    -webkit-perspective: 800px;
    -moz-perspective: 800px;
    -o-perspective: 800px;
    perspective: 800px;
    margin-bottom: 30px;
    background: #FFFFFF;
    border-radius: 4px;
    color: #444444;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    transform-style: preserve-3d;
    position: relative;
    width: calc(33.333% - 20px); /* Adjusted width */
    height: 420px;
    margin: 10px; /* Margin between cards */
    transition: transform 0.5s;
    overflow: hidden; /* Ensure content does not exceed card size */
}

.card2:hover, .card1:hover, .card3:hover {
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -o-transform: rotateY(180deg);
    transform: rotateY(180deg);
}

.front, .back {
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -o-backface-visibility: hidden;
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #FFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.14);
    width: 100%;
    height: 100%;
    border-radius: 4px;
    overflow: hidden; /* Ensure content does not exceed card size */
}

.front {
    z-index: 2;
}

.back {
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -o-transform: rotateY(180deg);
    transform: rotateY(180deg);
    z-index: 3;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: #e0e0e0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: #555;
    font-size: 18px;
    text-align: center;
    gap: 20px;
    overflow: hidden; /* Ensure content does not exceed card size */
}

.back h3 {
    font-size: 1.5em;
    margin-bottom: 20px;
}

.back .quote-button {
    padding: 10px 20px;
    background-color: #3F4543;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.back .quote-button:hover {
    background-color: #FC8002;
}

.front::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
}

.front h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 3em;
    z-index: 2;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    max-width: 80%;
    text-align: center;
}

.CotizadorContainer {
    width: 90%;
    max-width: 1200px;
    margin: 10px auto;
    padding: 20px; /* Added padding for better spacing */
    box-sizing: border-box;
    min-height: 800px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
}

.tituloMainCotizador {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 80px;
}

.card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin-top: 100px;
    gap: 10px;
}

.card-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-top: 30px;
}

/* Adjustments for smaller screens */
@media (max-width: 1024px) {
    .card-container {
        flex-direction: column;
        padding: 20px;
    }

    .card-wrapper {
        flex-direction: column;
        align-items: center;
    }

    .card2, .card1, .card3 {
        width: 80%; /* Reduce the width to prevent taking full screen */
        margin-bottom: 20px;
    }

    .CotizadorContainer {
        padding: 40px; /* Add padding to the container */
    }
}

@media (max-width: 768px) {
    .card-container {
        flex-direction: column;
        padding: 20px;
    }

    .card2, .card1, .card3 {
        width: 100%; /* Full width for smaller screens */
        height: auto; /* Adjust height for smaller screens */
        margin-bottom: 20px;
    }

    .CotizadorContainer {
        padding: 40px; /* Add padding to the container */
    }
}

@media (max-width: 480px) {
    .card2, .card1, .card3 {
        width: 100%; /* Full width for smaller screens */
        height: auto; /* Adjust height for smaller screens */
        margin-bottom: 20px;
    }

    .front h1 {
        font-size: 1.5em; /* Adjust font size for smaller screens */
    }

    .CotizadorContainer {
        padding: 40px; /* Add padding to the container */
    }
}

/* Front and Back styles */
.front.parte1 {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../img/imagencard2.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden; /* Ensure content does not exceed card size */
}

.front.parte2 {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../img/imagencard.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden; /* Ensure content does not exceed card size */
}

.front.parte0 {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../img/imagencard3.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden; /* Ensure content does not exceed card size */
}

.front::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
}

.front h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 3em;
    z-index: 2;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    max-width: 80%;
    text-align: center;
}

.back {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: #e0e0e0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    color: #555;
    font-size: 18px;
    text-align: center;
    gap: 20px;
    overflow: hidden; /* Ensure content does not exceed card size */
}

.back h3 {
    font-size: 1.5em;
    margin-bottom: 20px;
}

.back .quote-button {
    padding: 10px 20px;
    background-color: #3F4543;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.back .quote-button:hover {
    background-color: #FC8002;
}

/* Fix bug for IE */
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    .front, .back {
        -ms-backface-visibility: visible;
        backface-visibility: visible;
    }

    .back {
        visibility: hidden;
        -ms-transition: all 0.2s cubic-bezier(.92, .01, .83, .67);
    }

    .front {
        z-index: 4;
    }

    .card-container:not(.manual-flip):hover .back, .card-container.manual-flip.hover .back {
        z-index: 5;
        visibility: visible;
    }
}
