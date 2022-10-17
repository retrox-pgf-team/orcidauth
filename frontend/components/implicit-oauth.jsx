import Link from "next/link";

export default function OrcidLogin({ url }) {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 active:bg-blue-500 text-white font-bold py-2 px-4 rounded">
      <Link href={url}>Sign In with ORCID</Link>
    </button>
  )
}