import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { Link } from 'react-router-dom';
import { useLanguage } from './language';
import en from "../components/translations/en.json";
import es from "../components/translations/es.json";
import { FaWhatsapp } from 'react-icons/fa';

function ShippingCalculator() {
  const { currentLanguage } = useLanguage();
  const translations = currentLanguage === 'en' ? en : es;

  const [rows, setRows] = useState([{ cajas: 1, pesoTotal: 1, valorDeclarado: 0 }]);
  const [showCotizacion, setShowCotizacion] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const [courier, setCourier] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [selectedCourier, setSelectedCourier] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    telefono: '',
    email: '',
    ciudad: '',
  });

  const precioPrimeralb = 12;
  const precioPorLibraAdicional = 1.8;

  useEffect(() => {
    const cost = calculateShippingCost(courier);
    setShippingCost(cost);
  }, [courier, rows]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const firstInputElement = document.querySelector('input');
    if (firstInputElement) {
      firstInputElement.focus();
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateShippingCost = (courier) => {
    switch (courier) {
      case 'Colombia':
        return calculateShippingCostColombia();
      case 'China':
        return calculateShippingCostChina();
      case 'Spain':
        return calculateShippingCostSpain();
      default:
        return 0;
    }
  };

  const calculateShippingCostColombia = () => {
    let precioPrimeralbColombia = 12;
    let precioPorLibraAdicionalColombia = 1.8;

    const totalCostoEnvioColombia = rows.reduce((total, row) => {
      const totalWeight = row.pesoTotal * row.cajas;
      let shippingCostColombia = 0;

      if (totalWeight <= 1) {
        shippingCostColombia = totalWeight * precioPrimeralbColombia;
      } else {
        shippingCostColombia = (precioPrimeralbColombia + (totalWeight - 1) * precioPorLibraAdicionalColombia);
      }

      return total + shippingCostColombia;
    }, 0);

    return totalCostoEnvioColombia;
  };

  const calculateShippingCostChina = () => {
    const precioPrimeralb = 15;
    const precioPorLibraAdicional = 7.5;

    const totalWeight = rows.reduce((total, row) => {
      return total + (row.pesoTotal * row.cajas);
    }, 0);

    let shippingCost = 0;
    if (totalWeight <= 1) {
      shippingCost = precioPrimeralb;
    } else {
      shippingCost = precioPrimeralb + ((totalWeight - 1) * precioPorLibraAdicional);
    }

    return shippingCost;
  };

  const calculateShippingCostSpain = () => {
    const precioPrimeralbRange1to4 = 30;
    const precioPorLibraAdicionalSpain = 5.5;

    const totalCostoEnvioSpain = rows.reduce((total, row) => {
      const totalWeight = row.pesoTotal * row.cajas;
      let shippingCostSpain = 0;

      if (
        !isNaN(row.length) && row.length > 0 &&
        !isNaN(row.width) && row.width > 0 &&
        !isNaN(row.height) && row.height > 0
      ) {
        const volumeInCm3 = row.length * row.width * row.height;
        const volumeInLb = volumeInCm3 / 6000 / 2;
        const weightForShipping = Math.max(totalWeight, volumeInLb);

        if (weightForShipping <= 4) {
          shippingCostSpain = precioPrimeralbRange1to4;
        } else {
          shippingCostSpain = precioPrimeralbRange1to4 + ((weightForShipping - 4) * precioPorLibraAdicionalSpain);
        }

        console.log("Total weight:", totalWeight);
        console.log("Shipping cost Spain:", shippingCostSpain);
      } else {
        console.log("Dimensiones incompletas para calcular el costo de envío a España.");
      }

      return total + shippingCostSpain;
    }, 0);

    console.log("Total cost of shipping to Spain:", totalCostoEnvioSpain);

    return totalCostoEnvioSpain;
  };

  const calculateInsuranceFee = () => {
    const totalInsuranceFee = rows.reduce((total, row) => {
      let declaredValueFee = row.valorDeclarado * 0.02 * row.cajas;

      if (declaredValueFee <= 2) {
        declaredValueFee = 2;
      }

      return total + declaredValueFee;
    }, 0);

    return totalInsuranceFee;
  };

  const calculateTax = () => {
    const totalTax = rows.reduce((total, row) => {
      let tax = 0;
      if (courier === 'Colombia') {
        if (row.valorDeclarado > 200) {
          tax = row.valorDeclarado * 0.39 * row.cajas;
        }
      } else {
        tax = row.valorDeclarado * 0.39 * row.cajas;
      }
      return total + tax;
    }, 0);

    return totalTax;
  };

  const calculateTotalCost = () => {
    const totalShippingCost = getShippingCost();
    const totalInsurance = calculateInsuranceFee();
    const totalTaxAmount = calculateTax();
    const totalCost = totalShippingCost + totalInsurance + totalTaxAmount;

    return totalCost;
  };

  const handlePesoTotalChange = (event, index) => {
    event.preventDefault();
    const newRows = [...rows];
    const newValue = parseFloat(event.target.value);

    if (isNaN(newValue) || newValue < 0 || newValue > 110) {
      newRows[index].pesoTotal = '';
    } else {
      newRows[index].pesoTotal = newValue;
    }

    setRows(newRows);
  };

  const handleCantidadCajas = (event, index) => {
    event.preventDefault();
    const newRows = [...rows];
    let newValue = parseInt(event.target.value);

    if (newValue < 1 || isNaN(newValue) || newValue === undefined) {
      newValue = 1;
    }

    newRows[index].cajas = newValue;
    setRows(newRows);
  };

  const handleDimensionChange = (event, dimension, index) => {
    event.preventDefault();
    const newRows = [...rows];
    const newValue = parseInt(event.target.value);

    newRows[index][dimension] = newValue < 0 ? 0 : newValue;

    setRows(newRows);
  };

  const handleValorDeclaradoChange = (event, index) => {
    event.preventDefault();
    const newRows = [...rows];
    let newValue = parseInt(event.target.value);

    let sanitizedValue = newValue < 0 ? 0 : newValue;

    if (isNaN(newValue) || event.target.value.trim() === '') {
      newValue = '';
    } else if (sanitizedValue > 2000) {
      sanitizedValue = 2000;
      alert(translations.declaredValueAlert);
    }

    newRows[index].valorDeclarado = sanitizedValue.toString();
    setRows(newRows);
  };

  const handleAddRow = () => {
    if (rows.length >= 10) {
      alert(translations.maxRowsAlert);
      return;
    }

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

  const handleCalcularTarifasClick = (event) => {
    event.preventDefault();

    const anyInvalid = rows.some(row =>
      isNaN(row.cajas) || row.cajas === '' || row.cajas === 0 ||
      isNaN(row.pesoTotal) || row.pesoTotal === '' || row.pesoTotal === 0 ||
      isNaN(row.valorDeclarado) || row.valorDeclarado === '' || row.valorDeclarado === 0 ||
      isNaN(row.length) || row.length === '' || row.length === 0 ||
      isNaN(row.width) || row.width === '' || row.width === 0 ||
      isNaN(row.height) || row.height === '' || row.height === 0
    );

    console.log("Any invalid:", anyInvalid);

    const isSpainCourier = selectedCourier === 'Spain';
    const dimensionsMissing = rows.some(row =>
      isNaN(row.length) || row.length <= 0 ||
      isNaN(row.width) || row.width <= 0 ||
      isNaN(row.height) || row.height <= 0
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
    handleSubmit();
  };

  const handleCourierSelection = (courier) => {
    setCourier(courier);
    setSelectedCourier(courier);
  };

  const getShippingCost = () => {
    switch (courier) {
      case 'Colombia':
        return calculateShippingCostColombia();
      case 'China':
        return calculateShippingCostChina();
      case 'Spain':
        return calculateShippingCostSpain();
      default:
        return 0;
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/send-email', {
        ...formData,
        rows,
      });
      if (response.status === 200) {
        alert(translations.emailSentSuccess);
      } else {
        alert(translations.emailSentError);
      }
    } catch (error) {
      console.error(error);
      alert(translations.emailSentError);
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
            <div className="title-rate">{translations.insurance}:</div>
            <div className="value-rate">${calculated ? calculateInsuranceFee().toFixed(2) : '0.00'}</div>
          </div>
          <div className="quote-item">
            <div className="title-rate">{translations.taxValue}:</div>
            <div className="value-rate">${calculated ? calculateTax().toFixed(2) : '0.00'}</div>
          </div>
          <hr />
          <div className="quote-total">
            <div className="title-rate total">{translations.totalIn} {courier === 'Spain' ? 'EUR' : 'USD'}:</div>
            <div className="total-value">{calculated ? calculateTotalCost().toFixed(2) : '0.00'}</div>
          </div>
        </div>
        <div className='botonesCotiza'>
        <button className="btn btn-primary mt-3" onClick={() => setShowCotizacion(false)}  style={{ marginLeft: "60px" }}>{translations.back} </button>
        <a href="https://globuscargo.us/#/sign-up?a=90408c7a-fb1e-4b68-b000-8b02fe47ddf9"> <button className="btn btn-primary mt-3" onClick={() => setShowCotizacion(false)}>{translations.register}</button></a>
        <a href="https://api.whatsapp.com/send/?phone=7868991636&text=asd"><button className="btn btn-primary mt-3" style={{ marginLeft: "60px" }}>
    <FaWhatsapp style={{ marginRight: "8px" }} />
    {translations.heroButton2}
  </button></a>
  </div>
      </div>
    </div>
  );

  const rowElements = rows.map((row, index) => (
    <tr key={index}>
      <td>
        <input 
          type="number" 
          name="cajas"
          value={row.cajas} 
          onChange={(event) => handleCantidadCajas(event, index)} 
          disabled={showCotizacion} 
          required 
        />
      </td>
      <td>
        <input 
          type="number" 
          name="pesoTotal"
          value={row.pesoTotal} 
          onChange={(event) => handlePesoTotalChange(event, index)} 
          disabled={showCotizacion} 
          required 
        />
      </td>
      <td>
        <div className="dimension-inputs">
          <input 
            type="number" 
            name="length"
            value={row.length} 
            onChange={(event) => handleDimensionChange(event, 'length', index)} 
            disabled={showCotizacion} 
            required
          />
          <input 
            type="number" 
            name="width"
            value={row.width} 
            onChange={(event) => handleDimensionChange(event, 'width', index)} 
            disabled={showCotizacion} 
            required
          />
          <input 
            type="number" 
            name="height"
            value={row.height} 
            onChange={(event) => handleDimensionChange(event, 'height', index)} 
            disabled={showCotizacion} 
            required
          />
        </div>
      </td>
      <td>
        <input 
          type="number" 
          name="valorDeclarado"
          value={row.valorDeclarado} 
          onChange={(event) => handleValorDeclaradoChange(event, index)} 
          disabled={showCotizacion} 
          min="0" 
          required
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
                  <div className='elBotondecalcuadora'><button className=''>{translations.importCourier}</button></div>
                  <div className="form-content">
                    <div className="form-items">
                      <h3>{translations.quote} <h4>{translations.calculateShippingRates}</h4></h3>
                      <form className="requires-validation" noValidate>
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-6">
                              <input className="form-control" type="text" name="name" placeholder={translations.fullName} required onChange={handleInputChange} />
                              <div className="valid-feedback">{translations.usernameFieldValid}</div>
                              <div className="invalid-feedback">{translations.usernameFieldInvalid}</div>
                            </div>
                            <div className="col-md-6">
                              <input className="form-control" type="text" name="telefono" placeholder={translations.phone} required onChange={handleInputChange} />
                            </div>
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <div className='row'>
                            <div className="col-md-6">
                              <input className="form-control" type="email" name="email" placeholder={translations.emailAddress} required onChange={handleInputChange} />
                            </div>
                            <div className="col-md-6">
                              <input className="form-control" type="text" name="ciudad" placeholder={translations.city} required onChange={handleInputChange} />
                            </div>
                          </div>
                        </div>
                        <br />
                        <div className="col-md-12 botonescourier">
                          <div className="btn-group" role="group" aria-label="Courier Selection">
                            <button type="button" className={`btn ${selectedCourier === 'Colombia' ? 'btn-success' : 'btn-secondary'}`} onClick={() => handleCourierSelection("Colombia")} style={{ backgroundColor: selectedCourier === 'Colombia' ? '#FC8002' : '' }}>{translations.courierColombia}</button>
                            <button type="button" className={`btn ${selectedCourier === 'China' ? 'btn-success' : 'btn-secondary'}`} onClick={() => handleCourierSelection("China")} style={{ backgroundColor: selectedCourier === 'China' ? '#FC8002' : '' }}>{translations.courierChina}</button>
                            <button type="button" className={`btn ${selectedCourier === 'Spain' ? 'btn-success' : 'btn-secondary'}`} onClick={() => handleCourierSelection("Spain")} style={{ backgroundColor: selectedCourier === 'Spain' ? '#FC8002' : '' }}>{translations.courierSpain}</button>
                          </div>
                        </div>
                        <br />
                        <div className="container tabla">
                          <table border="1">
                            <thead>
                              <tr>
                                <th>{translations.boxes}</th>
                                <th>{translations.weight}</th>
                                <th>{translations.dimensions}</th>
                                <th>{translations.declaredValue}</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {rowElements}
                            </tbody>
                          </table>
                        </div>
                        <br />
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

export default ShippingCalculator;
