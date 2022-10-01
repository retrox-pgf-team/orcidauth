import { useEffect, useState } from 'react'
import OrcidLogin from '../components/implicit-oauth'
import Component from '../components/login-btn'
import jwt_decode from 'jwt-decode';

export default function Home() {

  const [orcid, setOrcid] = useState('');

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
      <OrcidLogin />
      {
        orcid && <p>{orcid}</p> || <p>Not signed in</p>
      }
    </div>
  )
}
