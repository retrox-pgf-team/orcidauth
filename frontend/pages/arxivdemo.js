import { ethers } from 'ethers';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Navbar } from '../components/layout';
import { orcidAbi } from '../utils/orcidAbi';
import arxiv from 'arxiv-api';
import { read } from '@extractus/feed-extractor';
import atomfeed from '../utils/fetch_arxiv_atomfeed.js';
import rssEnhancer, { InjectionRSSProps } from 'react-rss';

const DefaultRSSComponent = props => (
    <div>
        <h2>{props.label}</h2>
        <a href={props.rss.header.link}>
            {props.rss.header.title}
        </a>
        <ul>
            {props.rss.items.map(item => (
                <li>
                    {item.description}
                </li>
            ))}
        </ul>
    </div>
);

export default (rssEnhancer(
    DefaultRSSComponent,
    'https://arxiv.org/a/0000-0001-5137-828X.atom',
)
)

//export default function Home() {


    //console.log(atomfeed())
   

    // const papers = arxiv
    //     .search({
    //         searchQueryParams: [
    //             {
    //                 include: [{name: 'Jan Ole Ernst'}],
    //             },
    //         ],
    //         start: 0,
    //         maxResults: 1,
    //     })
    //     .then((papers) => console.log(papers))
    //     .catch((error) => console.log(error));

//    return (
        // <>
        //     <Navbar></Navbar>
        //     <section className="mt-20">
        //     <title>Arxiv Feed Demo</title>
        //     <body>
        //     <h1>Feed</h1>
        //     <script type="text/javascript" src="../utils/getArxivFeed.js"></script>
        //     <div id="arxivfeed">[Loading myarticles...]</div>
        //     </body>
        //     </section>
        // </>     
//    )
//}
    

    