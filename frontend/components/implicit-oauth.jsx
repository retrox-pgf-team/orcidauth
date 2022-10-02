import Link from "next/link";

const ORCID_URL = "https://orcid.org/oauth/authorize?client_id=APP-6T4JN2RLAHREKHJK&response_type=token&scope=openid&redirect_uri=https://orcidauth.vercel.app";
const TEST_ORCID_URL = "https://orcid.org/oauth/authorize?client_id=APP-6T4JN2RLAHREKHJK&response_type=token&scope=openid&redirect_uri=https://b190-82-21-152-220.eu.ngrok.io";

const TEST = true;

export default function OrcidLogin() {
  return (
    <div>
      {TEST ? (
        <Link href={TEST_ORCID_URL}>Sign In with ORCID</Link>
      ) : (
        <Link href={ORCID_URL}>Sign In with ORCID</Link>
      )}
    </div>
  )
}