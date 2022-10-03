import Link from "next/link";

export default function OrcidLogin({ url }) {
  return (
    <div>
      <Link href={url}>Sign In with ORCID</Link>
    </div>
  )
}