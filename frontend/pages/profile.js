import { Navbar } from '../components/layout';

export default function Home() {

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
        </div>
      </section>
    </>
  )
}
