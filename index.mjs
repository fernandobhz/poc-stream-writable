import { Writable } from 'stream';

class SQLConnection {
  
  static async writeStream() {
    const conn = {
      open: () => console.log(`connection opened`),
      close: () => console.log(`connection closed`),
      query: console.log,
    }

    return new Writable({
      write: (chunk, encoding, callback) => {
        conn.query(chunk.toString());
        callback();
      },
      final(callback) {
        conn.close();
        callback();
      }
    })
  }

}
const destination = await SQLConnection.writeStream();

destination.write('select * from orders where clientId = 1');
destination.write('select * from orders where clientId = 2');
destination.end();
