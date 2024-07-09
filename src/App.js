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
  const [isLoading, setIsloading] = useState(false);

  const handleFromcur = (cur) => setFromcur(cur);
  const handleTocur = (cur) => setTocur(cur);
  const handleAmount = (amt) => setAmount(Number(amt));

  function reset() {
    setConvertamount("");
    setAmount("");
  }

  useEffect(
    function () {
      try {
        if (amount <= 0) {
          setError("Please enter a Value");

          return reset();
        }

        if (!fromCur || !toCur) {
          setError("");
          return;
        }

        async function converter() {
          setError("");
          setIsloading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
          );
          const data = await res.json();
          setConvertamount(data.rates[toCur]);
          setIsloading(false);
        }
        if (fromCur === toCur) return setConvertamount(amount);
        converter();
      } catch (err) {
        console.error(err);
        setError(err.message);
        setAmount("");
      }
    },
    [amount, fromCur, toCur]
  );

  return (
    <div className="calculator">
      <div className="upper">
        <Amount onAmount={handleAmount} amount={amount} isLoading={isLoading} />
        <Currency onCur={handleFromcur} cur={fromCur} isLoading={isLoading} />
        <Currency onCur={handleTocur} cur={toCur} isLoading={isLoading} />
      </div>
      {isLoading && <Loader />}
      {!isLoading && (
        <Output amount={`${convertAmount} ${toCur}`} error={error} />
      )}
    </div>
  );
};

const Loader = () => <label className="loader">loading...</label>;

const Amount = ({ onAmount, amount, isLoading }) => {
  return (
    <div className="amount">
      <input
        type="number"
        value={amount}
        onChange={(e) => onAmount(e.target.value)}
        // disabled={isLoading}
      />
    </div>
  );
};

const Currency = ({ onCur, isLoading }) => {
  return (
    <select
      className="currency"
      defaultValue={"select"}
      onChange={(e) => onCur(e.target.value)}
      //   disabled={isLoading}
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
