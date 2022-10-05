import { useState } from "react";

export default function RequestCredential({orcid, address}) {

  console.log(orcid);
  console.log(address);

  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleIssuance() {

    if (!orcid || !address) {
      return;
    }

    setDisabled(true);

    const req = await fetch('/api/issue', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({orcid, address})
    })

    const res = await req.json();

    console.log(`status: ${req.status}`)
    if (req.status === 200) {
      setSuccess(true);
    }


  }

  return (
    <div>
      <button onClick={handleIssuance} disabled={disabled}>Issue Credential</button>
      { success && <p>Success!</p> }
    </div>
  )
}