import { useId } from "react";
export default function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions=[],
    selectCurrency="usd",
    amountDisable=false,
    currencyDisable=false,
    className = "",
}) {
   const amountInputId=useId(); //should not be used for the key value pair in the looping

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable} // if false then input box will be shown else u won't be able to give an input
                    value={amount}
                    onChange={(e)=>onAmountChange && onAmountChange(Number(e.target.value))} // first check if the function exist and if it does then call the change fn while parsing the value e.trgt.value
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={currency}
                    disabled={currencyDisable}
                    onChange={(e)=>onCurrencyChange && onCurrencyChange(e.target.value)}
                >
                    
                        {
                            currencyOptions.map((currency)=>{
                                return(
                                    <option key={currency} value={currency}> 
                                        {currency}
                                    </option> // remember the key in loops in react
                                )
                            })
                        }
                
                </select>
            </div>
        </div>
    );
}


