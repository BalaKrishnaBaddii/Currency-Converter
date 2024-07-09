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
  const [fromCur, setFromcur] = useState("");
  const [toCur, setTocur] = useState("");
  const [convertAmount, setConvertamount] = useState(0);
  const [error, setError] = useState("");

  const handleFromcur = (cur) => setFromcur(cur);
  const handleTocur = (cur) => setTocur(cur);
  const handleAmount = (amt) => setAmount(Number(amt));

  useEffect(
    function () {
      const setCur = () => fromCur === toCur && setConvertamount(amount);
      try {
        if (amount <= 0) {
          setError("Please enter a Value");
          setConvertamount("");
          setAmount("");
          return;
        }
        setError("");
        async function converter() {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
          );

          const data = await res.json();
          if (res.ok) {
            console.log(data);
            setConvertamount(`${data.rates[toCur]}`);
          }
        }
        converter();
      } catch (err) {
        console.error(err);
        setError(err.message);
        setAmount("");
      } finally {
        setCur();
      }

      return function () {
        if (!fromCur || toCur || amount) return;
      };
    },
    [amount, fromCur, toCur]
  );

  return (
    <div className="calculator">
      <div className="upper">
        <Amount onAmount={handleAmount} amount={amount} />
        <Currency onCur={handleFromcur} cur={fromCur} />
        <Currency onCur={handleTocur} cur={toCur} />
      </div>
      {<Output amount={`${convertAmount} ${toCur}`} error={error} />}
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

const Currency = ({ onCur, cur }) => {
  return (
    <select
      className="currency"
      defaultValue={"select"}
      onChange={(e) => onCur(e.target.value)}
    >
      <option value="select" disabled>
        --
      </option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="INR">INR</option>
      <option value="CAD">CAD</option>
    </select>
  );
};

const Output = ({ amount, error }) => {
  return (
    <label className={error ? "error" : "output"}>{error || amount}</label>
  );
};
