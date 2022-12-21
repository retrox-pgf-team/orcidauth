import { read } from '@extractus/feed-extractor';

async function atomfeed() {
    const result = await read('https://arxiv.org/a/0000-0001-5137-828X.atom2');
    return result;
}

export default atomfeed