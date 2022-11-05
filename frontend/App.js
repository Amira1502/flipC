import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';


import {  SignInPrompt, SignOutButton } from './ui-components';


export default function App({ isSignedIn, helloNEAR, wallet }) {
  const [valueFromBlockchain, setValueFromBlockchain] = React.useState();

  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  // Get blockchian state once on component load
  React.useEffect(() => {
    helloNEAR.getGreeting()
      .then(setValueFromBlockchain)
      .catch(alert)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }, []);

  /// If user not signed-in with wallet - show prompt
  if (!isSignedIn) {
    // Sign-in flow will reload the page later
    return <SignInPrompt Side={valueFromBlockchain} onClick={() => wallet.signIn()}/>;
  }

  function changeGreeting(e) {
    e.preventDefault();
    setUiPleaseWait(true);
    helloNEAR.setGreeting()
      .then(async () => {return helloNEAR.getGreeting();})
      .then(setValueFromBlockchain)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }

  return (
    <>
      <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()}/>
      <main className={uiPleaseWait ? 'please-wait' : ''}>
        <h1> Flip a coin </h1>
        <h3>Your accountId is : {wallet.accountId}</h3>
        <form onSubmit={changeGreeting} className="change">
        <p>What do you think is coming next?</p>        
         <div>
         <button onClick={() => {
            setUiPleaseWait(true);
            helloNEAR.setGreeting('heads').then(_ =>
              {
                helloNEAR.getGreeting()
                  .then(val => setValueFromBlockchain(val));
                setUiPleaseWait(false)
              });
          }}>
            Choose<br/> <span>Heads</span>
            <div className="loader"></div>
          </button>

          <button onClick={() => {
            setUiPleaseWait(true);
            helloNEAR.setGreeting('tails').then(_ =>
              {
                helloNEAR.getGreeting()
                  .then(val => setValueFromBlockchain(val));
                setUiPleaseWait(false)
              });
          }}>
            Choose<br/> <span>Tails</span>
            <div className="loader"></div>
          </button>
           
          </div>
        </form>
      </main>
    </>
  );
}
