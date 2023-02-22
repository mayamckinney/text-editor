import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  // open the database
  const jateDb = await openDB('jate', 1);
  // new transaction & privledges
  const tx = jateDb.transaction('jate', 'readwrite');
  // store jate object
  const store = tx.objectStore('jate');
  // passing in content
  const request = store.add({ id: 1, value: content });
  // finish the request
  const result = await request;
  console.log('The data has been saved!', result);
};

export const getDb = async () => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // grabs all the data in the database
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
