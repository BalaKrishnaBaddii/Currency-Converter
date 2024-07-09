import { useEffect, useState } from "react";
import "./app.css";

export default function App() {
  return (
    <>
      <Calculator />
    </>
  );
}

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
const Calculator = () => {
  const [amount, setAmount] = useState("");
  const [fromCur, setFromcur] = useState("USD");
  const [toCur, setTocur] = useState("INR");
  const [convertAmount, setConvertamount] = useState(0);

  const handleAmount = (amt) => setAmount(Number(amt));
  const handleFromcur = (cur) => setFromcur(cur);
  const handleTocur = (cur) => setTocur(cur);

  useEffect(
    function () {
      try {
        async function converter() {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
          );

          if (res.ok) {
            const data = await res.json();
            console.log(data);
            setConvertamount(data.rates.INR);
          }
        }
        converter();
      } catch (err) {
        console.log(err);
      }
    },
    [amount, fromCur, toCur]
  );

  return (
    <div className="calculator">
      <div className="upper">
        <Amount onAmount={handleAmount} amount={amount} />
        <Currency onCur={handleFromcur} defaulValue={fromCur} />
        <Currency onCur={handleTocur} defaulValue={toCur} />
      </div>
      <Output amount={convertAmount} />
    </div>
  );
};

const Amount = ({ onAmount, amount }) => {
  return (
    <div className="amount">
      <input
        type="number"
        value={amount}
        onChange={(e) => onAmount(e.target.value)}
      />
    </div>
  );
};

const Currency = ({ onCur, defaulValue }) => {
  return (
    <select
      className="currency"
      defaultValue={defaulValue}
      onChange={(e) => onCur(e.target.value)}
    >
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="INR">INR</option>
      <option value="CAD">CAD</option>
    </select>
  );
};

const Output = ({ amount }) => {
  return <label className="output">{amount}</label>;
};
