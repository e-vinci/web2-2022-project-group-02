import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function fetch_buffer(url) {
  //console.log('fetch_buffer', url, __dirname, path.join(__dirname, url));
  // const resp = await fetch(url);
  // return await resp.arrayBuffer();
  return (await fs.readFile(path.join(__dirname, url))).buffer;
}

export async function fetch_buffer_view(url) {
  return new Uint8Array(await fetch_buffer(url));
}
