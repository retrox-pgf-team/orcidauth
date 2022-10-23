import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useSignMessage } from "wagmi";

export default function RequestCredential({ address, orcidJWT }) {

  console.log(address);
  console.log(orcidJWT);

  let orcid;
  try {
    orcid = jwtDecode(orcidJWT).sub;
  } catch (error) { // if component is loaded without JWT
    orcid = '';
  }

  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(orcid);
  const { signMessageAsync } = useSignMessage({ message })

  async function handleIssuance() {

    if (!orcidJWT || !address) {
      return;
    }

    try {
      var signature = await signMessageAsync();
    } catch (error) { // handle signature cancellation gracefully
      return error;
    }

    setDisabled(true);

    const req = await fetch('/api/issue', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ orcidJWT, address, signature })
    })

    const res = await req.json();

    console.log(`status: ${req.status}`)
    if (req.status === 200) {
      setSuccess(true);
    }

  }

  return (
    <div>
      <button onClick={handleIssuance} disabled={disabled} class="bg-green-500 text-white font-bold py-2 px-4  rounded-2xl shadow-md hover:scale-105 duration-200">
        Issue Credential!
      </button>
      {success && <p>Success!</p>}
    </div>
  )
}