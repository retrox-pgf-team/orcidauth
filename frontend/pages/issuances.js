import GetIssuances from "../utils/getIssuances";

function Index({ issues }) {
  return (
    <>
      <h1 className="flex justify-center text-5xl p-8">Issuances</h1>
      <div className="flex flex-col justify-center">
        {issues.map((item) => (
          <>
            <div className="flex flex-row justify-center">
              <div className="p-2 hover:underline">
                <a href={`https://orcid.org/${item[3]}`} target="_blank">{item[3]}</a>
              </div>
              <div className="p-2 hover:underline">
                <a href={`https://etherscan.io/address/${item[2]}`} target="_blank">{item[2]}</a>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  )
}

export default Index;

export async function getServerSideProps() {

  const { issues } = await GetIssuances();

  return {
    props: {
      issues,
    }
  }
}
