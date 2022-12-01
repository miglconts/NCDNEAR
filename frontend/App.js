import "regenerator-runtime/runtime";
import React from "react";

import "./assets/global.css";

import { SignInPrompt, SignOutButton } from "./ui-components";

export default function App({ isSignedIn, contractId, wallet }) {
  const [valueFromBlockchain, setValueFromBlockchain] = React.useState();

  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  // Get blockchian state once on component load
  React.useEffect(() => {
    getGreeting()
      .then(setValueFromBlockchain)
      .catch(alert)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }, []);

  /// If user not signed-in with wallet - show prompt
  if (!isSignedIn) {
    // Sign-in flow will reload the page later
    return (
      <SignInPrompt
        greeting={valueFromBlockchain}
        onClick={() => wallet.signIn()}
      />
    );
  }

  /* function sumarCantidad(e) {
    e.preventDefault();
    setUiPleaseWait(true);
    const { increaseInput } = e.target.elements;
    const { decreaseInput } = e.target.elements;

    // use the wallet to send the greeting to the contract
    wallet
      .callMethod(
        {
          method: "increaseCuenta",
          args: { cuenta: parseInt(increaseInput.value) },
          contractId,
        },
        {
          method: "decreaseCuenta",
          args: { cuenta: parseInt(decreaseInput.value) },
          contractId,
        }
      )
      .then(async () => {
        return getGreeting();
      })
      .then(setValueFromBlockchain)
      .finally(() => {
        setUiPleaseWait(false);
      });
  } */

  function mutateCantidad(e) {
    e.preventDefault();
    setUiPleaseWait(true);
    const { increaseInput } = e.target.elements;
    const { decreaseInput } = e.target.elements;

    // use the wallet to send the greeting to the contract
    wallet
      .callMethod({
        method: "mutateSaldo",
        args: {
          suma: parseInt(increaseInput.value),
          resta: parseInt(decreaseInput.value),
        },
        contractId,
      })
      .then(async () => {
        return getGreeting();
      })
      .then(setValueFromBlockchain)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  function getGreeting() {
    // use the wallet to query the contract's greeting
    return wallet.viewMethod({ method: "getSaldo", contractId });
  }

  return (
    <>
      <SignOutButton
        accountId={wallet.accountId}
        onClick={() => wallet.signOut()}
      />
      <main className={uiPleaseWait ? "please-wait" : ""}>
        <h1>
          Actualmente tienes: $
          <span className="greeting">{valueFromBlockchain}</span> Disponible
        </h1>
        <form onSubmit={mutateCantidad} className="change">
          <div>
            <label>Sumar Cantidad:</label>
            <input autoComplete="off" id="increaseInput" />
            <label>Restar Cantidad:</label>
            <input autoComplete="off" id="decreaseInput" />
            <br></br>
            <button>
              <span>Enviar</span>
              <div className="loader"></div>
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
