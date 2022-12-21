import { useEffect, useState } from "react";
import { Navbar } from "../../components/layout";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const regex = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{3}[0-9X]$/;
    if (!regex.test(id)) {
      setError("error");
    } else {
      setError(null);
      fetch("/api/arxiv?id=" + id)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => setError(error));
    }
  }, [id]);

  if (error) {
    return (
      <>
        <Navbar></Navbar>
        <section className="mt-20 flex justify-center">
          <h2 className="text-4xl text-red-600">Invalid ORCID</h2>
        </section>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Navbar></Navbar>
        <section className="mt-20 flex justify-center">
          <h2 className="text-2xl w-96 h-12 bg-gray-200 rounded-2xl animate-pulse"></h2>
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar></Navbar>
      <section className="mt-20 flex justify-center">
        <h3 className="text-4xl">{data.title._text}</h3>
      </section>
    </>
  );
}
