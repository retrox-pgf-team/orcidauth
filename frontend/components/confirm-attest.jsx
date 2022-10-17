import { useState } from "react";
import { useSignMessage } from "wagmi";

export default function RequestCredential({ orcid, address }) {

  console.log(orcid);
  console.log(address);

  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signMessageAsync } = useSignMessage({
    message: orcid,
  })

  async function handleIssuance() {

    if (!orcid || !address) {
      return;
    }

    const signature = await signMessageAsync();

    setDisabled(true);

    const req = await fetch('/api/issue', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ orcid, address, signature })
    })

    const res = await req.json();

    console.log(`status: ${req.status}`)
    if (req.status === 200) {
      setSuccess(true);
    }

  }

  return (
    <div>
      <button onClick={handleIssuance} disabled={disabled} class="bg-green-500 hover:bg-green-700 active:bg-green-500 text-white font-bold py-2 px-4 rounded">
        Issue Credential!
      </button>
      {success && <p>Success!</p>}
    </div>
  )
}