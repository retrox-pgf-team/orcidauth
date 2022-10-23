import { useEffect, useState } from 'react'
import OrcidLogin from '../components/implicit-oauth'
import jwt_decode from 'jwt-decode';
import RequestCredential from '../components/confirm-attest';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage } from 'wagmi';
import { Stepper } from '../components/stepper';

export default function Home({ orcid_url }) {

  const [orcid, setOrcid] = useState('');
  const [orcidJWT, setOrcidJWT] = useState('');
  const { address } = useAccount();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedStep, setCompletedStep] = useState(0);

  useEffect(() => {
    const hash = window && window.location.hash || null;
    if (!hash) {
      return;
    }

    const parsedHash = new URLSearchParams(hash.substring(1))
    if (parsedHash.get('error')) {
      return;
    }

    const id_token = parsedHash.get('id_token');
    const decoded = jwt_decode(id_token);
    setOrcid(decoded.sub);
    setOrcidJWT(id_token);

  }, [])


  const stepArray = [
    {
      title: "Sign in with ORCID",
      content: (
        <div className="flex flex-col justify-center">
          <div className="mx-auto my-2">
            {!orcid ? 
            <>
              <h4 className="text-black text-xl text-center">
                This will let us find your ORCID ID
              </h4>
              <div className="flex justify-center my-2">
                <OrcidLogin url={orcid_url} />
              </div>
              <p className="text-center mt-1">Not signed in</p>
            </>:
            <>
              <h4 className="text-black text-xl text-center">
                You have connected with the ORCID ID:
              </h4>
              <h4 className="text-center my-2 text-lg">{orcid}</h4>
            </>}
          </div>
        </div>
      ),
      showNext: true,
      showPrevious: true,
      canGoBackTo: true,
    },
    {
      title: "Connect your wallet",
      content: (
        <div className="flex flex-col justify-center">
          <h4 className="text-black text-xl text-center">
            This will let us access your ethereum address.
          </h4>
          <div className="mx-auto my-2 mb-4">
            { address ?
            <h4 className="text-center text-lg">{address.slice(0, 5) + "..." + address.slice(-4)}</h4> :
            <ConnectButton />}
          </div>
        </div>
      ),
      showNext: true,
      showPrevious: true,
      canGoBackTo: true,
    },
    {
      title: "Issue your credential",
      content: (
        <div className="flex flex-col justify-center">
          <h4 className="text-black text-xl text-center">
            This will issue a credential holding your ORCID ID to your wallet.
          </h4>
<<<<<<< Updated upstream
          <div className="mx-auto my-2">
            <RequestCredential address={address} orcidJWT={orcidJWT} />
=======
          <div className="mx-auto my-2 mb-4">
            <RequestCredential orcid={orcid} address={address} />
>>>>>>> Stashed changes
          </div>
        </div>
      ),
      showNext: true,
      showPrevious: true,
      canGoBackTo: true,
    },
  ];

  return (
    <div>
      {/*<OrcidLogin url={orcid_url} />
      {orcid && <p>{orcid}</p> || <p>Not signed in</p>}
      <RequestCredential orcid={orcid} address={address} />
      <ConnectButton />*/}
      <div className='m-24'></div>
      <div>
        <h2 className='text-center text-7xl font-bold'>
          Retrox
        </h2>
      </div>
      <div className='m-6'></div>
      <div>
        <h4 className='text-center text-2xl font-bold'>
          Associate your academic credentials with a wallet address
        </h4>
      </div>
      <div className='m-12'></div>
      <Stepper
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        completedStep={completedStep}
        stepArray={stepArray}
        completedMessage={
          <div className="text-black p-6">
            <div className="text-center text-3xl font-bold">Done!</div>
            <h4 className="text-lg text-center mt-2">
              Thank you for linking your ORCID ID to your wallet. We would love to hear your feedback so that we can improve.
            </h4>
          </div>
        } />
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      orcid_url: process.env.ORCID_URL,
    }
  }
}
