const API_URL = process.env.API_URL || ''

async function getRequest(endpoint: string) {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json
}

export async function getFolder(params: string[] = []) {
  try {
    const paths = params.join('/')
    const data = await getRequest(`fetch/${paths}`)
    return data
  } catch (err: any) {
    console.error('[error]', err)
    return null
  }
}
