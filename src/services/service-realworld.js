class SeviceRealworld {
  baseURL = 'https://blog.kata.academy/api/'

  async sendRequest(url, data, method, token) {
    // prettier-ignore
    const options = data
      ? {
        method,
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(data),
      }
      :{
        method,
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
      }
    if (token) options.headers.Authorization = `Bearer ${token}`

    try {
      const response = await fetch(`${this.baseURL}/${url}`, options)
      if (!response.ok) throw new Error(response.status)
      const res = await response.json()
      return res
    } catch (error) {
      throw new Error(error)
    }
  }

  async getArticles(offset, token) {
    const res = this.sendRequest(`articles?limit=10&offset=${offset}`, '', 'GET', token)
    return res
  }

  async registerNewUser(data) {
    const user = this.sendRequest('users', data, 'POST')
    return user
  }

  async loginUser(data) {
    const user = this.sendRequest('users/login', data, 'POST')
    return user
  }

  async updateUser(data, token) {
    const newUser = this.sendRequest('user', data, 'PUT', token)
    return newUser
  }

  async getCurrentUser(token) {
    const currentUser = this.sendRequest('user', '', 'GET', token)
    return currentUser
  }

  async getArticle(slug, token) {
    const article = this.sendRequest(`articles/${slug}`, '', 'GET', token)
    return article
  }

  async createArticle(data, token) {
    const newArticle = this.sendRequest('articles', data, 'POST', token)
    return newArticle
  }

  async deleteArticle(slug, token) {
    const response = this.sendRequest(`articles/${slug}`, '', 'DELETE', token)
    return response
  }

  async updateArticle(slug, data, token) {
    const response = this.sendRequest(`articles/${slug}`, data, 'PUT', token)
    return response
  }

  async addFavorite(slug, token) {
    const response = this.sendRequest(`articles/${slug}/favorite`, '', 'POST', token)
    return response
  }

  async removeFavorite(slug, token) {
    const response = this.sendRequest(`articles/${slug}/favorite`, '', 'DELETE', token)
    return response
  }
}

export default SeviceRealworld
