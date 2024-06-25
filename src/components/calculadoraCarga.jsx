import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useLanguage } from './language'; // Import the useLanguage hook
import en from "../components/translations/en.json"; // Import English translations
import es from "../components/translations/es.json"; // Import Spanish translations

function CargoCalculator() {
    const { currentLanguage } = useLanguage();
    const translations = currentLanguage === 'en' ? en : es;

    const [rows, setRows] = useState([{ cajas: 1, pesoTotal: 1, valorDeclarado: 0 }]);
    const [showCotizacion, setShowCotizacion] = useState(false);
    const [calculated, setCalculated] = useState(false);
    const [courier, setCourier] = useState('');
    const [shippingCost, setShippingCost] = useState(0);
    const [selectedCourier, setSelectedCourier] = useState('');
    const [costoAerolinea, setCostoAerolinea] = useState('');
    const [displayMode, setDisplayMode] = useState('dimensions'); // default display mode
    const [buttonsClicked, setButtonsClicked] = useState(false); // to track if buttons are clicked
    const [clickedOption, setClickedOption] = useState(null);

    const corteDeGuia = 35;
    const documentacion = 35;
    const alistamiento = 30;

    const toggleDisplayMode = (mode) => {
        setDisplayMode(mode);
        setClickedOption(mode);
    };

    const precioPrimeralb = 12;
    const precioPorLibraAdicional = 1.8;

    useEffect(() => {
        const cost = calculateShippingCost(courier);
        setShippingCost(cost);
    }, [courier, rows]);

    const calculateShippingCost = (courier) => {
        switch (courier) {
            case 'Barranquilla':
                return calculateShippingCostCargaBarranquilla();
            
            case 'Spain':
                return calculateShippingCostCargaBogota();
            default:
                return 0;
        }
    };

    const calculateShippingCostCargaBogota = () => {
        const precioPrimeralbRange1to4 = 210;
        const precioPorLibraAdicionalSpain = 1.1;

        const totalCostoEnvioSpain = rows.reduce((total, row) => {
            let shippingCostSpain = 0;

            // Calculate weight for shipping
            let weightForShipping = row.pesoTotal;

            // Calculate volume from dimensions
            let volumeInCm3 = 0;
            let volumeInLb = 0;

            if (
                !isNaN(row.length) && row.length > 0 &&
                !isNaN(row.width) && row.width > 0 &&
                !isNaN(row.height) && row.height > 0
            ) {
                volumeInCm3 = row.length * row.width * row.height;
                volumeInLb = volumeInCm3 / 6000 / 2;
            }

            // Use the largest volume for shipping calculation
            if (volumeInLb > weightForShipping && volumeInLb > row.pesoVolumen) {
                weightForShipping = volumeInLb;
            } else if (row.pesoVolumen > weightForShipping) {
                weightForShipping = row.pesoVolumen;
            }

            // Check if pesoDimensiones is available and greater than weightForShipping
            if (!isNaN(row.pesoDimensiones) && row.pesoDimensiones > weightForShipping) {
                weightForShipping = row.pesoDimensiones;
            }

            const priceRange = weightForShipping * precioPorLibraAdicionalSpain;

            if (priceRange <= precioPrimeralbRange1to4) {
                // If the weight for shipping is between 1 and 4 lbs, the cost is fixed at $30
                shippingCostSpain = precioPrimeralbRange1to4;
            } else {
                // If the weight for shipping is more than 4 lbs, charge $5.5 for each additional lb
                shippingCostSpain = weightForShipping * precioPorLibraAdicionalSpain;
            }

            console.log("Weight for shipping:", weightForShipping);
            console.log("Shipping cost Spain:", shippingCostSpain);

            return total + shippingCostSpain;
        }, 0);

        console.log("Total cost of shipping from Bogota:", totalCostoEnvioSpain);

        return totalCostoEnvioSpain;
    };

    const calculateShippingCostCargaBarranquilla = () => {
        const precioPrimeralbRange1to4 = 210;
        const precioPorLibraAdicionalSpain = 1.6;

        const totalCostoEnvioSpain = rows.reduce((total, row) => {
            let shippingCostSpain = 0;

            // Calculate weight for shipping
            let weightForShipping = row.pesoTotal;

            // Calculate volume from dimensions
            let volumeInCm3 = 0;
            let volumeInLb = 0;

            if (
                !isNaN(row.length) && row.length > 0 &&
                !isNaN(row.width) && row.width > 0 &&
                !isNaN(row.height) && row.height > 0
            ) {
                volumeInCm3 = row.length * row.width * row.height;
                volumeInLb = volumeInCm3 / 6000 / 2;
            }

            // Use the largest volume for shipping calculation
            if (volumeInLb > weightForShipping && volumeInLb > row.pesoVolumen) {
                weightForShipping = volumeInLb;
            } else if (row.pesoVolumen > weightForShipping) {
                weightForShipping = row.pesoVolumen;
            }

            // Check if pesoDimensiones is available and greater than weightForShipping
            if (!isNaN(row.pesoDimensiones) && row.pesoDimensiones > weightForShipping) {
                weightForShipping = row.pesoDimensiones;
            }

            const priceRange = weightForShipping * precioPorLibraAdicionalSpain;

            if (priceRange <= precioPrimeralbRange1to4) {
                // If the weight for shipping is between 1 and 4 lbs, the cost is fixed at $30
                shippingCostSpain = precioPrimeralbRange1to4;
            } else {
                // If the weight for shipping is more than 4 lbs, charge $5.5 for each additional lb
                shippingCostSpain = weightForShipping * precioPorLibraAdicionalSpain;
            }

            console.log("Weight for shipping:", weightForShipping);
            console.log("Shipping cost Spain:", shippingCostSpain);

            return total + shippingCostSpain;
        }, 0);

        console.log("Total cost of shipping From Barranquilla:", totalCostoEnvioSpain);

        return totalCostoEnvioSpain;
    };

    const calculateSedCost = () => {
        const totalSed = rows.reduce((total, row) => {
            let sed = 0;
            if (row.valorDeclarado >= 1) {
                sed = 40 * row.valorDeclarado;
            } else {
                sed = 40; // Esto asigna el costo fijo de 40 solo si row.valorDeclarado es menor que 1
            }
            return total + sed;
        }, 0);
        return totalSed;
    };

    const calculateTotalCost = () => {
        // Calculate the total cost by summing up shipping cost, insurance fee, and tax
        const totalShippingCost = getShippingCost();
        const totalPallet = handlePalletCost()

        const totalSed = calculateSedCost();
        const totalCost = totalShippingCost + totalSed  + totalPallet + corteDeGuia + documentacion + alistamiento;  
        
        return totalCost;
    };

    const handlePesoTotalChange = (event, index) => {
        event.preventDefault();
        const newRows = [...rows];
        const newValue = parseFloat(event.target.value); // Convertir el valor a un número de punto flotante
        
        // Verificar si el nuevo valor es un número válido y no está vacío
        if (isNaN(newValue) || newValue < 0 ) {
            // If the new value is NaN, negative, or exceeds the limit, set it to an empty string
            newRows[index].pesoTotal = '';
        } else {
            // Otherwise, set the value
            newRows[index].pesoTotal = newValue;
        }
       
        setRows(newRows);
    };

    const handleCantidadCajas = (event, index) => {
        event.preventDefault();
        const newRows = [...rows];
        let newValue = parseInt(event.target.value);
    
        // Check if the new value is less than 1, NaN, or undefined
        if (newValue < 1 || isNaN(newValue) || newValue === undefined) {
            // If the value is less than 1 or NaN or undefined, set it to 1
            newValue = 1;
        }
    
        newRows[index].cajas = newValue;
        setRows(newRows);
    };

    const handlePalletCost = () => {
        const primeros3Pallets = 60;
        const adicionalesPallets = 15;
    
        const totalInPallets = rows.reduce((total, row) => {
            let palletCost = 0;
            
            if (row.cajas <= 3) {
                palletCost = primeros3Pallets ;
            } else {
                palletCost = primeros3Pallets * 3 + adicionalesPallets * (row.cajas - 3);
            }
    
            return total + palletCost;
        }, 0);
    
        return totalInPallets;
    };

    const calculateWeight = (index) => {
        const row = rows[index];
        // Assuming dimensions are provided in centimeters
        const lengthInCm = parseInt(row.length);
        const widthInCm = parseInt(row.width);
        const heightInCm = parseInt(row.height);
        // Convert dimensions to cubic inches (length * width * height / 2.54^3) and then to pounds (1 cubic inch = 0.000578704 lb)
        const cubicInches = (lengthInCm * widthInCm * heightInCm) / Math.pow(2.54, 3);
        const weightInPounds = cubicInches * 0.000578704;
        return weightInPounds;
    };

    const handleDimensionChange = (event, dimension, index) => {
        event.preventDefault();
        const newRows = [...rows];
        const newValue = parseInt(event.target.value);
        
        // Check if the new value is negative, if so, set it to zero
        newRows[index][dimension] = newValue < 0 ? 0 : newValue;
        
        setRows(newRows);
    };

    const handleAddRow = () => {
        // Verificar si ya se alcanzó el número máximo de filas (10)
        if (rows.length >= 10) {
            alert(translations.maxRowsAlert);
            return; // Detener la ejecución si se alcanza el límite
        }
        
        // Agregar una nueva fila con valores predeterminados
        setRows([...rows, { cajas: 1, pesoTotal: 1, valorDeclarado: 1 }]);
    };

    const handleDeleteRow = (index) => {
        if (rows.length === 1) {
            return;
        }
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };

    const handlePesoVolumenChange = (event, index) => {
        const newRows = [...rows];
        newRows[index].pesoVolumen = parseFloat(event.target.value); 
        setRows(newRows);
    };
    
    const handleCalcularTarifasClick = (event) => {
        event.preventDefault();
    
        const anyInvalid = rows.some(row =>
            isNaN(row.cajas) || row.cajas === '' || row.cajas === 0 ||
            isNaN(row.pesoTotal) || row.pesoTotal === '' || row.pesoTotal === 0 ||
            isNaN(row.valorDeclarado) || row.valorDeclarado === '' || row.valorDeclarado === 0 ||
            (row.dimensions && (
                isNaN(row.length) || row.length <= 0 ||
                isNaN(row.width) || row.width <= 0 ||
                isNaN(row.height) || row.height <= 0
            )) ||
            (row.pesoVolumen && (isNaN(row.pesoVolumen) || row.pesoVolumen === '' || row.pesoVolumen === 0))
        );
    
        console.log("Any invalid:", anyInvalid);
    
        const isSpainCourier = selectedCourier === 'Spain';
        const dimensionsMissing = rows.some(row => 
            row.dimensions && (
                isNaN(row.length) || row.length <= 0 ||
                isNaN(row.width) || row.width <= 0 ||
                isNaN(row.height) || row.height <= 0
            )
        );
    
        if (anyInvalid) {
            alert(translations.completeFieldsAlert);
            return;
        } else if (selectedCourier === '') {
            alert(translations.selectCourierAlert);
            return;
        } else if (isSpainCourier && dimensionsMissing) {
            alert(translations.dimensionsRequiredAlert);
            return;
        }
    
        setShowCotizacion(true);
        setCalculated(true);
        calculateTotalCost();
    };

    const handleCourierSelection = (courier) => {
        setCourier(courier);
        setSelectedCourier(courier);
    };

    const getShippingCost = () => {
        switch (courier) {
            case 'Barranquilla':
                return calculateShippingCostCargaBarranquilla();
         
            case 'Spain':
                return calculateShippingCostCargaBogota();
            default:
                return 0;
        }
    };

    const cotizacionSection = showCotizacion && (
        <div className='page-wrapper'>
            <div className="container cotizacion">
                <div className="quote-header">{translations.yourShipment}</div>
                <div className="quote-details">
                    <div className="quote-item">
                        <div className="title-rate">{translations.freight}:</div>
                        <div className="value-rate">${calculated ? getShippingCost().toFixed(2) : '0.00'}</div>
                    </div>
                    <div className="quote-item">
                        <div className="title-rate">{translations.sedValue}:</div>
                        <div className="value-rate">${calculated ? calculateSedCost().toFixed(2) : '0.00'}</div>
                    </div>
                    <div className="quote-item">
                        <div className="title-rate">{translations.palletCost}:</div>
                        <div className="value-rate">${calculated ? handlePalletCost().toFixed(2) : '0.00'}</div>
                    </div>
                    <div className="quote-item">
                        <div className="title-rate">{translations.documentation}:</div>
                        <div className="value-rate">${documentacion}</div>
                    </div>
                    <div className="quote-item">
                        <div className="title-rate">{translations.guideCut}:</div>
                        <div className="value-rate">${corteDeGuia}</div>
                    </div>
                    <div className="quote-item">
                        <div className="title-rate">{translations.packaging}:</div>
                        <div className="value-rate">${alistamiento}</div>
                    </div>
                    <hr />
                    <div className="quote-total">
                        <div className="title-rate total">{translations.totalIn} {courier === 'Spain' ? 'EUR' : 'USD'}:</div>
                        <div className="total-value">{calculated ? calculateTotalCost().toFixed(2) : '0.00'}</div>
                    </div>
                </div>
                <button className="btn btn-primary mt-3" onClick={() => setShowCotizacion(false)}>{translations.back}</button>
            </div>
        </div>
    );

    const rowElements = rows.map((row, index) => (
        <tr key={index}>
            <td>
                <input 
                    type="number" 
                    value={row.cajas} 
                    onChange={(event) => handleCantidadCajas(event, index)} 
                    disabled={showCotizacion} 
                    required 
                />
            </td>
            <td>
                <input 
                    type="number" 
                    value={row.pesoTotal} 
                    onChange={(event) => handlePesoTotalChange(event, index)} 
                    disabled={showCotizacion} 
                    required 
                    defaultValue={0}
                />
            </td>
            <td>
                {!clickedOption ? (
                    <div className="button-container10">
                        <button 
                            className="custom-button"
                            onClick={() => toggleDisplayMode('dimensions')}
                        >
                            {translations.dimensions}
                        </button>
                        <button 
                            className="custom-button"
                            onClick={() => toggleDisplayMode('weightVolume')}
                        >
                            {translations.weightVolume}
                        </button>
                    </div>
                ) : clickedOption === 'dimensions' ? (
                    <div className="dimension-inputs">
                        <input 
                            type="number" 
                            value={row.length} 
                            onChange={(event) => handleDimensionChange(event, 'length', index)} 
                            disabled={showCotizacion} 
                            defaultValue={0} 
                        />
                        <input 
                            type="number" 
                            value={row.width} 
                            onChange={(event) => handleDimensionChange(event, 'width', index)} 
                            disabled={showCotizacion} 
                            defaultValue={0} 
                        />
                        <input 
                            type="number" 
                            value={row.height} 
                            onChange={(event) => handleDimensionChange(event, 'height', index)} 
                            disabled={showCotizacion} 
                            defaultValue={0} 
                        />
                    </div>
                ) : (
                    <input 
                        type="number" 
                        value={row.pesoVolumen} 
                        onChange={(event) => handlePesoVolumenChange(event, index)} 
                        disabled={showCotizacion} 
                        defaultValue={0} 
                    />
                )}
            </td>
            <td>
                <input 
                    type="number" 
                    value={row.valorDeclarado} 
                    onChange={(event) => {
                        const newValue = parseFloat(event.target.value); 
                        // Actualizar el valor de valorDeclarado en el estado de rows
                        const newRows = [...rows];
                        newRows[index].valorDeclarado = isNaN(newValue) ? 0 : newValue;
                        setRows(newRows);
                        
                        // Recalcular el costo de SED
                        calculateSedCost();
                    }} 
                    disabled={showCotizacion} 
                    min="0" 
                    required  
                    defaultValue={0}
                />
            </td>
            <td>
                <div className="btn-container">
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={handleAddRow} 
                        disabled={showCotizacion}
                    >
                        +
                    </button>
                    <button 
                        className="btn btn-danger" 
                        type="button" 
                        style={{ marginLeft: '5px' }} 
                        onClick={() => handleDeleteRow(index)} 
                        disabled={showCotizacion}
                    >
                        X
                    </button>
                </div>
            </td>
        </tr>
    ));

    return (
        <>
            {!showCotizacion && (
                <div className='calculadora-container'>
                    <div className='container'>
                        <div className="form-body">
                            <div className="row">
                                <div className="form-holder">
                                    <div className='elBotondecalcuadora'>
                                        <button className=''>{translations.importCargo}</button>
                                    </div>
                                    <div className="form-content">
                                        <div className="form-items">
                                            <h3>{translations.quote} <h4>{translations.calculateFreightRates}</h4></h3>
                                            <form className="requires-validation" noValidate>
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <input className="form-control" type="text" name="name" placeholder={translations.fullName} required />
                                                            <div className="valid-feedback">{translations.usernameFieldValid}</div>
                                                            <div className="invalid-feedback">{translations.usernameFieldInvalid}</div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <input className="form-control" type="text" name="telefono" placeholder={translations.phone} required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-md-12'>
                                                    <div className='row'>
                                                        <div className="col-md-6">
                                                            <input className="form-control" type="email" name="email" placeholder={translations.emailAddress} required />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <input className="form-control" type="text" name="ciudad" placeholder={translations.city} required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <br></br>
                                                <div className="col-md-12 botonescourier">
                                                    <div className="btn-group" role="group" aria-label="Courier Selection">
                                                        <button type="button" className={`btn ${selectedCourier === 'Barranquilla' ? 'btn-success' : 'btn-secondary'}`} onClick={() => handleCourierSelection("Barranquilla")} style={{ backgroundColor: selectedCourier === 'Barranquilla' ? '#FC8002' : '' }}> {translations.barranquilla}</button>

                                                        <button type="button" className={`btn ${selectedCourier === 'Spain' ? 'btn-success' : 'btn-secondary'}`} onClick={() => handleCourierSelection("Spain")} style={{ backgroundColor: selectedCourier === 'Spain' ? '#FC8002' : '' }}> {translations.bogota}</button>
                                                    </div>
                                                </div>
                                                <br></br>
                                                <div className="container tabla">
                                                    <p className="note">{translations.completePalletInfo}</p>
                                                    <table border="1">
                                                        <thead>
                                                            <tr>
                                                                <th>{translations.pallets}</th>
                                                                <th>{translations.totalWeight}</th>
                                                                <th>
                                                                    {clickedOption ? 
                                                                        (clickedOption === 'dimensions' ? translations.dimensionsHint : translations.weightVolume)
                                                                        : 
                                                                        (
                                                                            <>
                                                                                <p>{translations.chooseOption}</p>
                                                                            </>
                                                                        )
                                                                    }
                                                                </th>
                                                                <th>{translations.sed}</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {rowElements}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <br></br>
                                                <div className="btn-container">
                                                    <div className="form-button mt-3">
                                                        <Link to="/cotiza" className="btn btn-primary" style={{ marginRight: '10px' }}>{translations.back}</Link>
                                                        <button id="submit" type="submit" className="btn btn-primary" onClick={(event) => handleCalcularTarifasClick(event)}>{translations.calculateRates}</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showCotizacion && cotizacionSection}
            <hr />
        </>
    );
}

export default CargoCalculator;

