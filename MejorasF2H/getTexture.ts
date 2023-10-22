// import { getProxyUrl } from '.'

// export async function getTexture(catalog: string, idTextura: number, toggle) {
//   const url = getProxyUrl('api/Texturas/gettextura/')
//   console.log('esto es un idTextura', idTextura)
//   // const navigate = useNavigate()
//   const params = {
//     //catalog: catalogo,
//     //IdentificadorTextura: idTextura,
//     method: 'GET',
//     mode: 'cors',
//     headers: {
//       'Accept-Language': 'ES',
//       'Content-Type': 'application/json',
//       Authorization: 'Ninpo ' + sessionStorage.getItem('access_token'),
//     },
//   } satisfies RequestInit

//   try {
//     const data = await fetch(url + catalog + '/' + idTextura, params)
//     if (data.ok) {
//       const json = await data.json()

//       return json as string
//     }
//   } catch (e: any) {
//     // navigate(
//     // window.location.pathname +
//     //   `/error/${error.detail || error.statusText || error.status || error}`
//     // )
//     // alert(e.detail || e.statusText || e.status || e)
//     console.error(e as Error)
//   }
// }



import { getProxyUrl } from '.'

export async function getTexture(catalog: string, idTextura: number, toggle) {
  // Verifica que idTextura sea un número válido
  if (idTextura === undefined || isNaN(idTextura)) {
    console.error('idTextura no es un número válido')
    return // Sale de la función si idTextura no es válido
  }

  const url = getProxyUrl('api/Texturas/gettextura/')
  console.log('esto es un idTextura', idTextura)

  const params = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept-Language': 'ES',
      'Content-Type': 'application/json',
      Authorization: 'Ninpo ' + sessionStorage.getItem('access_token'),
    },
  } satisfies RequestInit

  try {
    const data = await fetch(url + catalog + '/' + idTextura, params)
    if (data.ok) {
      const json = await data.json()

      return json as string
    }
  } catch (e: any) {
    console.error(e as Error)
  }
}

