import "./app.css";

export default function App() {
  return (
    <>
      <Calculator />
    </>
  );
}

const Calculator = () => (
  <div className="calculator">
    <div className="upper">
      <Amount />
      <Currency />
      <Currency />
    </div>
    <Output />
  </div>
);

const Amount = () => {
  return (
    <div className="amount">
      <input type="number" />
    </div>
  );
};

const Currency = () => {
  return (
    <select className="currency">
      <option>USD</option>
      <option>EUR</option>
      <option>INR</option>
      <option>CAD</option>
    </select>
  );
};

const Output = () => {
  return <label className="output">10.5</label>;
};
