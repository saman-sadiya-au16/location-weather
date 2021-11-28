import React from 'react';

export default function CurrencyRow(props) {
    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount
    } = props;
    
    return (
        <div>
            <input 
                type="number" 
                className="input-number"
                value={amount}
                onChange={onChangeAmount}
                />
            <select 
                className="currency-code" 
                value={selectedCurrency} 
                onChange={onChangeCurrency}
                >
                    
                {currencyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>      
        </div>
    );
}

// this is a currency dispaly component

// we aregetting the data from parent componet by usimg the props and object destructring