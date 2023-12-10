
class SeviceRealworld{
  baseURL = "https://blog.kata.academy/api/"

  async sendRequest(url) {
    try{
      const response = await fetch(`${this.baseURL}/${url}`)
      if(!response.ok)
        throw new Error(response.status)
      const res = await response.json()
      return res
    }
    catch(error){
      throw new Error(error)
    }
  }

  async getArticles(offset){
    const res = this.sendRequest(`articles?limit=10&offset=${offset}`)
    return res
  }

  async getTags(){
    const res = this.sendRequest('tags')
    return res
  }
}

export default SeviceRealworld