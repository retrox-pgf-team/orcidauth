import { useEffect, useState } from 'react'
import OrcidLogin from '../components/implicit-oauth'
import Component from '../components/login-btn'
import jwt_decode from 'jwt-decode';
import RequestCredential from '../components/confirm-attest';

const TEST_ADDRESS = "0xb7CF83796d911eD42592a625B95753A3Cfdd7feE"
const TEST_PAYLOAD = "eyJraWQiOiJwcm9kdWN0aW9uLW9yY2lkLW9yZy03aGRtZHN3YXJvc2czZ2p1am84YWd3dGF6Z2twMW9qcyIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiNnBlRlJKZHU2di12UjI3RWNaZjk2USIsImF1ZCI6IkFQUC02VDRKTjJSTEFIUkVLSEpLIiwic3ViIjoiMDAwMC0wMDAxLTc5NzEtMjI4NiIsImF1dGhfdGltZSI6MTY2NDYyMTk4NiwiaXNzIjoiaHR0cHM6XC9cL29yY2lkLm9yZyIsImV4cCI6MTY2NDczMDIyMywiZ2l2ZW5fbmFtZSI6Ikt5bGUiLCJpYXQiOjE2NjQ2NDM4MjMsImZhbWlseV9uYW1lIjoiRHVmZnkiLCJqdGkiOiI5MzNjYTI3My00MWJmLTQwOGEtYTM4MC1mN2FiNTFjN2I4OWEifQ.RmNhDuuUynELkYW7St3Dquo_suOE_WGxq0obKD7idBgOecG6D5kWsVm0XBmTJJV9Vt0nNDe16QATGXveBgw38KuUu1O1T_wSIjQAyvic7KpBHQlo2Gg_BS56rP8Uq1OsEnuhTd-VHoekwFFwWvD7g84CzKM0MIrJ6JMadj56LHhBTYpIfd6i3asm10eqSNFAPCyzNis_UDqqWsoij3uVdtNb4S0JofB703mhHFuLEu6xGJN92XVGwQkCU94kwoc5VzLoxPi16chTPJD7OM4NmcUqgoKobjPJ-grJBcG3oGCOZf9vm4N3FpPg5C1qBUvXPSLnXp8H48RqGBayoLVnnQ"

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
      { orcid && <p>{orcid}</p> || <p>Not signed in</p> }
      <RequestCredential orcid={orcid} address={TEST_ADDRESS} />
    </div>
  )
}
