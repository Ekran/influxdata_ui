import axios from 'axios';

let links

export default async function AJAX({
  url,
  resource,
  id,
  method = 'GET',
  data = {},
  params = {},
  headers = {},
}) {
  try {
    const basepath = window.basepath || ''

    url = `${basepath}${url}`

    if (resource) {
      if (!links) {
        const linksRes = await axios({
          url: '/chronograf/v1/',
          method: 'GET',
        })
        links = linksRes.data
      }
      url = id ? `${basepath}${links[resource]}/${id}` : `${basepath}${links[resource]}`
    }

    return axios({
      url,
      method,
      data,
      params,
      headers,
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }
}
