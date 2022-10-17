import GetIssuances from "../utils/getIssuances";

function Index({ issues }) {
  return (
    <div className="flex flex-col justify-center p-8">
      {issues.map((item) => (
        <>
          <div>{item[3]}</div>
          <div>{item[2]}</div>
        </>
      ))}
    </div>
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