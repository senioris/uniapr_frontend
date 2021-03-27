import { IHistory } from '../commons/history.types'

export class ListApi {
  static async list(name: string, signal: AbortSignal): Promise<IHistory[]> {
    try {
      const response = await fetch('/api/list?' + 'name=' + name, {
        signal: signal,
      })

      if (!response.ok) {
        console.log(response.status)
        throw new Error('fetch error')
      }

      return await response.json()
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  static async history(id: string, signal: AbortSignal): Promise<IHistory[]> {
    try {
      const response = await fetch('/api/history?' + 'id=' + id, {
        signal: signal,
      })

      if (!response.ok) {
        console.log(response.status)
        throw new Error('fetch error')
      }

      return await response.json()
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
