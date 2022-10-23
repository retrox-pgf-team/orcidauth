import GetIssuances from "../utils/getIssuances";

function Index({ issues }) {
  return (
    <>
      <h1 className="flex justify-center text-5xl p-8">Issuances</h1>
      <div className="flex flex-col justify-center">
        {Object.values(issues).reverse().map((item) => (
          <div className="flex justify-center">
            <div className="flex flex-row justify-left">
              <div className="p-2 hover:underline">
                <a href={`https://mumbai.polygonscan.com/tx/${item.txn}`} target="_blank">View Transaction</a>
              </div>
              <div className="p-2 hover:underline">
                <a href={`https://orcid.org/${item.orcid}`} target="_blank">{item.orcid}</a>
              </div>
              <div className="p-2 hover:underline">
                <a href={`https://etherscan.io/address/${item.address}`} target="_blank">{item.address}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Index;


export async function getServerSideProps() {

  const { issues } = await GetIssuances();

  const issuesMap = new Map();

  issues.forEach((issue) => {
    issuesMap.set(issue[3], { address: issue[2], txn: issue[1], orcid: issue[3] })
  })

  const issuesObj = Object.fromEntries(issuesMap);
  console.log(issuesObj);

  return {
    props: {
      issues: issuesObj,
    }
  }
}
