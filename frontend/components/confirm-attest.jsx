export default function RequestCredential({orcid, address}) {

  console.log(orcid);
  console.log(address);

  async function handleIssuance() {
    const req = await fetch('/api/issue', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({orcid, address})
    })

    const res = await req.json()
  }

  return (
    <div>
      <button onClick={handleIssuance}>Issue Credential</button>
    </div>
  )
}