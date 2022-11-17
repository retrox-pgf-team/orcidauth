import { useEffect, useState } from 'react'
import OrcidLogin from '../components/implicit-oauth'
import jwt_decode from 'jwt-decode';
import RequestCredential from '../components/confirm-attest';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage } from 'wagmi';
import { Stepper } from '../components/stepper';
import { Navbar } from '../components/layout';
import { FeedbackBox } from '../components/feedback';

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
    currentStep != 1 && setCompletedStep(1);
  }, [])

  useEffect(() => {
    if (currentStep == 1 && address) setCompletedStep(1);
  }, [address])


  const stepArray = [
    {
      title: "Sign in with ORCID",
      content: (
        <div className="flex flex-col justify-center">
          <div className="mx-auto my-2">
            {!orcid ? 
            <>
              <h4 className="text-black text-2xl text-center">
                This will prompt you to sign in to your ORCID account
              </h4>
              <div className="flex justify-center my-2">
                <OrcidLogin url={orcid_url} />
              </div>
            </>:
            <>
              <h4 className="text-black text-2xl text-center">
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
          <h4 className="text-black text-2xl text-center">
            Connect your wallet to allow us to access your public wallet address
          </h4>
          <div className="mx-auto my-2 mb-4">
            { address ?
            <h4 className="text-center text-4xl font-semibold">{address.slice(0, 6) + "..." + address.slice(-6)}</h4> :
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
          <h4 className="text-black text-2xl text-center">
            This will issue a credential holding your ORCID ID to your wallet.
          </h4>
          <div className="mx-auto my-2 mb-4">
            <RequestCredential 
              address={address} 
              orcidJWT={orcidJWT} 
              setCompletedStep={setCompletedStep}/>
          </div>
        </div>
      ),
      showNext: true,
      showPrevious: true,
      canGoBackTo: true,
    },
  ];

  return (
    <>
      <Navbar></Navbar>
      <section className="mt-20">
        <div>
          <h2 className='text-center text-4xl font-bold'>
            Register your ORCID
          </h2>
        </div>
        <div>
          <h4 className='text-center text-2xl mt-4'>
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
          <section className="mt-20">
            <FeedbackBox/>
          </section>
      </section>
    </>
  )
}

export async function getStaticProps() {

  let orcid_url;

  if ("NEXT_PUBLIC_VERCEL_URL" in process.env) {
    orcid_url = process.env.ORCID_URL_STUB + "https://" + process.env.NEXT_PUBLIC_VERCEL_URL
  } else {
    orcid_url = process.env.ORCID_URL
  }

  return {
    props: {
      orcid_url
    }
  }
}
