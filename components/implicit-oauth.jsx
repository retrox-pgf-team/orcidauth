import Link from "next/link";

const ORCID_URL = "https://orcid.org/oauth/authorize?client_id=APP-6T4JN2RLAHREKHJK&response_type=token&scope=openid&redirect_uri=https://orcidauth.vercel.app";

export default function OrcidLogin() {
  return (
    <div>
      <Link href={ORCID_URL}>Sign In with ORCID</Link>
    </div>
  )
}