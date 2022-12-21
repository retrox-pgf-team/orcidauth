import { ethers } from 'ethers';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Navbar } from '../components/layout';
import { orcidAbi } from '../utils/orcidAbi';

var arxiv_authorid='0000-0002-5101-8732';
var arxiv_format="arxiv";
var arxiv_max_entries=0;       //show all articles
var arxiv_includeSummary=1;    //show abstracts (default is 0)
var arxiv_includeComments=0;   //do not show comments (default is 1)

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
          <script type="text/javascript" src='../utils/getArxivFeed.js'>
          </script>
          <div id="arxivfeed"></div>
        </div>
       
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
