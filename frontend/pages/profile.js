import { ethers } from 'ethers';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Navbar } from '../components/layout';
import { orcidAbi } from '../utils/orcidAbi';
import { useRouter } from "next/router";

export default function Home({ contractAddress }) {

  const { address } = useAccount();
  const [orcid, setOrcid] = useState('');


  useEffect(() => {

    const provider = new ethers.providers.JsonRpcProvider(
      'https://polygon-mumbai.g.alchemy.com/v2/Lvg6Sp2FS9yUK_PFYFvK2fSY87w3Iftg'
    );
    const contract = new ethers.Contract(contractAddress, orcidAbi, provider);
    const getOrcid = async () => {

      if (!address) {
        return '';
      }

      const txn = await contract.addressToOrcid(address);
      return txn

    }

    getOrcid().then((value) => {
      setOrcid(value)
    })

  }, [])

  const router = useRouter();
  //the git_id is set manually here but needs to be automated in future
  const git_id = "jan-o-e";
  console.log("https://github.com/" + git_id + ".atom")
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof git_id !== 'string') {
      setError("error");
    } else {
      setError(null);
      fetch("/api/github?git_id=" + git_id)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => setError(error));
    }
  }, [git_id]);

  console.log(data)

  return (
    <>
      <Navbar></Navbar>
      <section className="mt-20">
        <div>
          <h2 className='text-center text-4xl font-bold'>
            Profile
          </h2>
        </div>
        <div>
          <h4 className='text-center text-2xl mt-4'>
            Associate your academic credentials with a wallet address
          </h4>
          <h2 className='text-center text-2xl mt-4'>
            {(orcid) ? (
              <div className='hover:underline'>
                <Link href={`https://orcid.org/${orcid}`} target="_blank">{orcid}</Link>
              </div>
            ) : (
              <div className='hover:underline'>
                <Link href={"/register"}>Register your ORCID</Link>
              </div>
            )
            }
          </h2>
       </div>
      </section>
      <section className="mt-20 flex justify-right">
        <h3 className="text-4xl">{data.title._text}</h3>
      </section>

    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      contractAddress: process.env.ORCID_CONTRACT,
    }
  }
}
