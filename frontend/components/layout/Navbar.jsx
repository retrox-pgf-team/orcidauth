import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Navbar() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-transparent px-10 md:px-10 lg:px-20 pt-6 items-center">
            <Link className="navbar-brand" href="/">
                <a className="text-3xl font-bold">Retrox</a>
            </Link>
            <div className="" id="navbarNav">
                <ul className="flex flex-row gap-x-12 items-center pt-3">
                    <li className="">
                        <Link aria-current="page" href="/issuances">
                            <a className="text-xl font-semibold">Issuances</a>
                        </Link>
                    </li>
                    <li className="">
                        <Link href="/register">
                            <a className="text-xl font-semibold">Register</a>
                        </Link>
                    </li>
                    <li className="">
                        <Link href="/profile">
                            <a className="text-xl font-semibold">Profile</a>
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <ConnectButton 
                    accountStatus="address"
                    chainStatus="none"
                    showBalance={false}/>
            </div>
        </nav>
    )
}