import { read } from '@extractus/feed-extractor';

async function atomfeed() {
    const result = await read('https://github.com/jan-o-e.atom');
    return result;
}

export default atomfeed;