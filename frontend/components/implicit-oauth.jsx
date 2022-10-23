import Link from "next/link";

export default function OrcidLogin({ url }) {
  return (
    <button className="bg-purple-700 text-white font-bold py-2 px-4 rounded-2xl shadow-md hover:scale-105 duration-200">
      <Link href={url}>Sign In with ORCID</Link>
    </button>
  )
}