import { Client } from 'disconnect';
import { DISCOGS_KEY, DISCOGS_NAME, DISCOGS_SECRET } from '../utils/secrets';

const db = new Client(DISCOGS_NAME, {
  consumerKey: DISCOGS_KEY,
  consumerSecret: DISCOGS_SECRET,
}).database();

export default db;
