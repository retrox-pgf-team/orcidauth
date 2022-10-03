import { useEffect, useState } from 'react'
import OrcidLogin from '../components/implicit-oauth'
import Component from '../components/login-btn'
import jwt_decode from 'jwt-decode';
import RequestCredential from '../components/confirm-attest';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export default function Home({ orcid_url }) {

  const [orcid, setOrcid] = useState('');
  const { address } = useAccount();

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

  return (
    <div>
      <OrcidLogin url={orcid_url} />
      {orcid && <p>{orcid}</p> || <p>Not signed in</p>}
      <RequestCredential orcid={orcid} address={address} />
      <ConnectButton />
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
