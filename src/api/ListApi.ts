import { IHistory } from '../commons/history.types';

export class ListApi {
  static async list(name: string, signal: AbortSignal): Promise<IHistory[]> {
    try {
      const response = await fetch('/api/history?' + 'name=' + name, {
        signal: signal,
      });

      if (!response.ok) {
        console.log(response.status);
        throw new Error('fetch error');
      }

      console.log(response);
      return await response.json();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
