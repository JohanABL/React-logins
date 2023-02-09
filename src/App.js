import React from "react";
import './App.css';
import { useWeb3React } from "@web3-react/core";
import { injected } from "./components/wallet/Connectors";
import Login from "./components/wallet/login";
import ManualLogin from "./components/wallet/manualLogin";

function App() {
  const { active, account, activate, deactivate, chainId } = useWeb3React();
  const connectMetamask = async () => {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  };
  const disconnect = async () => {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div className="App my-4">
      {active ? 'Probed' : "Discorded"}

      <br />
      <br />
      <p>Metamask Wallet Connection</p>
      <br />

      {active ?
        <button className="disconnectwallet" onClick={disconnect}>Disconnect Metamask</button>
        :
        <button className="connectwallet" onClick={connectMetamask}>Connect Metamask</button>
      }

      <br />
      <br />
      <br />

      {active &&
        <>
          <span className='account'>Account Address:  {account}</span>
          <br />
          <br />
          <span className='chainid'>Chain ID: {chainId}</span>
        </>
      }
      <h4>OR</h4>

      <Login />
      <br />
      <ManualLogin />
    </div>
  );
}

export default App;
