import { useEffect, useState } from 'react'
import OrcidLogin from '../components/implicit-oauth'
import Component from '../components/login-btn'
import jwt_decode from 'jwt-decode';
import RequestCredential from '../components/confirm-attest';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Stepper } from '../components/stepper';

export default function Home({ orcid_url }) {

  const [orcid, setOrcid] = useState('');
  const { address } = useAccount();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hash = window && window.location.hash || null;
    if (!hash) {
      return;
    }

    const parsedHash = new URLSearchParams(hash.substring(1))
    if (parsedHash.get('error')) {
      return;
    }

    const id_token = parsedHash.get('id_token')
    const decoded = jwt_decode(id_token)
    setOrcid(decoded.sub)

  }, [])

  const stepArray = [
    {
      title: "Sign in with ORCID",
      content: (
        <div className="flex flex-col justify-center">
          <h4 className="text-black dark:text-white text-lg text-center">
            This will let us find your ORCID ID
          </h4>
          <div className="mx-auto my-2">
            <OrcidLogin url={orcid_url} />
            {orcid && <p>{orcid}</p> || <p>Not signed in</p>}
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
          <h4 className="text-black dark:text-white text-lg text-center">
            This will let us access your ethereum address.
          </h4>
          <div className="mx-auto my-2">
            <ConnectButton />
          </div>
        </div>
      ),
      showNext: true,
      showPrevious: true,
      canGoBackTo: true,
    },
    {
      title: "Isuue your credential",
      content: (
        <div className="flex flex-col justify-center">
          <h4 className="text-black dark:text-white text-lg text-center">
            This will issue a credential holding your ORCID ID to your wallet.
          </h4>
          <div className="mx-auto my-2">
            <RequestCredential orcid={orcid} address={address} />
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
      <Stepper
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        stepArray={stepArray}
        completedMessage={
          <div className="text-black dark:text-white p-6">
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
