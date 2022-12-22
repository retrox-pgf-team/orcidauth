import { ethers } from "ethers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Navbar } from "../../components/layout";
import { orcidAbi } from "../../utils/orcidAbi";
import { useRouter } from "next/router";
import { BiLink } from "react-icons/bi";
import {
  isValidEthereumAddress,
  isValidOrcid,
  generateColorFromOrcid,
} from "../../utils/formats";
import useSWR from "swr";
import { ORCID_CONTRACT_ADDRESS } from "../../utils/constants";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const demoPublications = [
  {
    title:
      "Polarized single photons from a cavity-enhanced atom-light interface with coherent re-preparation",
    authors:
      "Jan Ole Ernst, Juan-Rafael Álvarez, Thomas D. Barrett, and Axel Kuhn",
    summary:
      "We propose a scheme to generate single photons from 87Rb atoms. The combination of coherent STIRAP re-preparation and optical pumping allows for the efficient generation of streams of indistinguishable photons with promising use-cases",
    link: "https://arxiv.org/abs/2106.02459",
  },
  {
    title: "Mode Entanglement in Fermionic and Bosonic Harmonium",
    authors: "Jan Ole Ernst, Felix Tennie",
    summary:
      "Mode entanglement in many-body quantum systems is an active area of research. It provides crucial insight into the suitability of many-body systems for quantum information processing tasks. Local super-selection rules must be taken into account when assessing the amount of physically accessible entanglement. This requires amending well-established entanglement measures by incorporating local parity and local particle number constraints. In this paper, we report on mode entanglement present in the analytically solvable system of N-Harmonium. To the knowledge of the authors, this is the first analytic study of the physically accessible mode and mode-mode entanglement of an interacting many-body system in a continuous state space. We find that super-selection rules dramatically reduce the amount of physically accessible entanglement, which vanishes entirely in some cases. Our results strongly suggest the need to re-evaluate intra and inter-mode entanglement in other fermionic and bosonic systems.",
    link: "https://arxiv.org/abs/2106.02459",
  },
];

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;

  const [address, setAddress] = useState(null);
  const [orcid, setOrcid] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { data: arxiv, error: arxivError } = useSWR(
    orcid ? "/api/arxiv?id=" + orcid : null,
    fetcher
  );

  arxiv && console.log(arxiv);

  function retrieveOrcid(address) {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/Lvg6Sp2FS9yUK_PFYFvK2fSY87w3Iftg"
    );
    const contract = new ethers.Contract(
      ORCID_CONTRACT_ADDRESS,
      orcidAbi,
      provider
    );

    const getOrcid = async () => {
      if (!isValidEthereumAddress(address)) {
        return "";
      }
      try {
        const orcidValue = await contract.addressToOrcid(address);
        return orcidValue;
      } catch (error) {
        console.log(error);
      }
    };

    getOrcid().then((value) => {
      setOrcid(value);
    });
  }

  function retrieveAddress(orcid) {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://polygon-mumbai.g.alchemy.com/v2/Lvg6Sp2FS9yUK_PFYFvK2fSY87w3Iftg"
      );
      const contract = new ethers.Contract(
        ORCID_CONTRACT_ADDRESS,
        orcidAbi,
        provider
      );

      const getAddress = async () => {
        if (!isValidOrcid(orcid)) {
          return "";
        }
        try {
          const addressValue = await contract.orcidToAddress(orcid);
          return addressValue;
        } catch (error) {
          console.log(error);
        }
      };

      getAddress().then((value) => {
        setAddress(value);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (id) {
      if (isValidEthereumAddress(id)) {
        setAddress(id);
        retrieveOrcid(id);
      } else if (isValidOrcid(id)) {
        setOrcid(id);
        retrieveAddress(id);
      } else {
        setError(true);
      }
    }
  }, [id]);

  return (
    <>
      <Navbar />
      <section className="my-20 container max-w-[90vw] md:max-w-[75vw] lg:max-w-[70vw] xl:max-w-[60vw] 2xl:max-w-[50vw] mx-auto">
        <section className="flex flex-col md:flex-row items-center justify-between">
          {arxiv ? (
            <div className="flex flex-row items-center">
              <div
                className={"w-24 h-24 rounded-2xl"}
                style={{ backgroundColor: generateColorFromOrcid(orcid) }}
              />
              <div className="ml-5">
                <h2 className="text-center text-4xl font-bold mb-2">
                  {arxiv.title._text.replace(/'s articles on arXiv/g, "")}
                </h2>
                {address ? (
                  <h5 className="text-xl">{address}</h5>
                ) : (
                  <h5 className="text-red-500">Ethereum address not linked</h5>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center">
              <div className="w-24 h-24 rounded-2xl bg-gray-200 animate-pulse" />
              <div className="ml-5">
                <h2 className="text-center text-4xl font-bold mb-2 rounded-2xl bg-gray-200 animate-pulse text-transparent">
                  Jan Ole Ernst
                </h2>
                <h5 className="text-xl rounded-2xl bg-gray-200 animate-pulse text-transparent">
                  University of Oxford
                </h5>
              </div>
            </div>
          )}
          <div className="flex flex-col items-center mt-4 md:mt-0">
            <div className="flex flex-col justify-center">
              <h2 className="text-center text-xl font-bold mb-2">ORCID</h2>
              {orcid ? (
                <h5 className="text-xl">{orcid}</h5>
              ) : (
                <h5 className="text-xl rounded-2xl bg-gray-200 animate-pulse text-transparent">
                  0000-0002-5101-8732
                </h5>
              )}
            </div>
          </div>
        </section>
        <section className="py-6 px-8 border-4 border-black rounded-3xl mt-12 overflow-y-auto max-h-[60vh]">
          <h2 className="text-3xl font-semibold mt-4 mb-4 underline">
            Publications
          </h2>
          <div className="mt-8">
            {arxiv && arxiv.entry.length > 0
              ? arxiv.entry.map((pub, index) => (
                  <div
                    className={
                      "flex flex-col border-black pb-6" +
                      (index == arxiv.entry.length - 1 ? "" : " border-b mb-6")
                    }
                    key={index}
                  >
                    <div className="flex flex-row justify-between items-top">
                      <h2 className="text-2xl font-semibold mb-1 w-8/12">
                        {pub.title._text}
                      </h2>
                      <a
                        href={pub.id._text}
                        target="_blank"
                        rel="noreferrer"
                        className="flex justify-end items-center w-4/12"
                      >
                        Link to Paper
                        <BiLink className="inline ml-2" />
                      </a>
                    </div>
                    <h5 className="text-lg font-semibold mb-3">
                      {pub.author && Array.isArray(pub.author)
                        ? pub.author.map((item, index) => {
                            return index == pub.author.length - 1
                              ? item["name"]._text
                              : item["name"]._text + ", ";
                          })
                        : pub.author && pub.author.name._text
                        ? pub.author.name._text
                        : "Unknown author"}
                    </h5>
                    <p className="mb-2">{pub.summary._text}</p>
                  </div>
                ))
              : arxivError
              ? "Error"
              : demoPublications.map((pub, index) => (
                  <div
                    className={
                      "flex flex-col border-black pb-6" +
                      (index == demoPublications.length - 1
                        ? ""
                        : " border-b mb-6")
                    }
                    key={index}
                  >
                    <div className="flex flex-row justify-between items-top">
                      <h2 className="text-2xl font-semibold mb-1 w-8/12 rounded-2xl bg-gray-200 animate-pulse text-transparent">
                        {pub.title}
                      </h2>
                      <div className="flex justify-end items-center w-4/12">
                        <div className="rounded-2xl bg-gray-200 animate-pulse text-transparent">
                          Link to Paper
                          <BiLink className="inline ml-2" />
                        </div>
                      </div>
                    </div>
                    <h5 className="text-lg font-semibold mb-3 rounded-2xl bg-gray-200 animate-pulse text-transparent">
                      {pub.authors}
                    </h5>
                    <p className="mb-2 rounded-2xl bg-gray-200 animate-pulse text-transparent">
                      {pub.summary}
                    </p>
                  </div>
                ))}
          </div>
        </section>
      </section>
    </>
  );
}
