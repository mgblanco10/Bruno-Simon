import useUserLanguage from '@hooks/useUserLanguage'
import { I18NProxy } from '@proxies/I18N'
import { AutenticateProxy, cleanAuthToken } from '@proxies/auth'
import { getProxyUrl } from '@proxies/index'
import { setResource, useAppStore } from '@store'
import { Store } from '@types'
import { getLanguageID } from '@utils/getLanguageID'
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'

type LoginData = {
  password: string
  correo: string
  remember: boolean
}

type UpdateUserData = UserType & {
  PasswordActual?: string
  PasswordNueva?: string
  PasswordNuevaConfirmar?: string
}

export type UserType = {
  nombreCultura: string
  idIdioma: number
  nombre: string
  apellidos: string
  direccion: string
  pais: string
  ciudad: string
  codigoPostal: string
  telefono: string
  correo: string
  empresa: string
  cif: string
  idiomaCultura: string
}

type SetUserType = React.Dispatch<React.SetStateAction<UserType>>
type State = [UserType, SetUserType]

const userDefaultValue = {
  name: 'Public',
  nombreCultura: 'ES',
  idIdioma: 1,
  nombre: 'Public',
  apellidos: '',
  direccion: '',
  pais: '',
  ciudad: '',
  codigoPostal: '',
  telefono: '',
  correo: '',
  empresa: '',
  cif: '',
  idiomaCultura: 'ES',
}

const userContext = createContext<State>(null!)

async function getIdiomas() {
  let idiomas = await new I18NProxy().getIdiomas()
  const setLanguageOptions = useAppStore.getState().setLanguageOptions
  window.localStorage.setItem('languageOptions', JSON.stringify(idiomas))
  setLanguageOptions(idiomas)
}

export function UserContextProvider({ children }: { children: ReactNode }) {
  const setTextos = useAppStore.use.setTextos()
  const setPrefs = useAppStore.use.setPrefs()
  const setTextures = useAppStore.use.setTextures()
  const setImpuestos = useAppStore.use.setImpuestos()
 

  const userState = useState(() => {
    let item = window.localStorage.getItem('userData')
    if (!item) {
      window.localStorage.setItem('userData', JSON.stringify(userDefaultValue))
      return userDefaultValue
    }
    return JSON.parse(item) as UserType
  })

  useEffect(() => {
    const authProxy = new AutenticateProxy()
    setResource('textos')
    setResource('Walls', !window.location.href.includes('planner'))
    setResource('prefs')
    authProxy.newSession().then(({ idioma, textos, prefs, prefsInfo, impuestos, ...rest }: any) => {
      setTextos({ idioma, textos })
      setResource('textos', true)
      getIdiomas()
      setPrefs(prefs, prefsInfo)
      setImpuestos(impuestos)

      const body = document.querySelector('body')
      body.style.setProperty('--color1', prefs?.['C/Color1'])
      body.style.setProperty('--color2', prefs?.['C/Color2'])
      body.style.setProperty('--color3', prefs?.['C/Color3'])
      body.style.setProperty('--color4', prefs?.['C/Color4'])
      body.style.setProperty('--color5', prefs?.['C/Color5'])
      body.style.setProperty('--color6', prefs?.['C/Color6'])
      body.style.setProperty('--color7', prefs?.['C/Color7'])
      body.style.setProperty('--color8', prefs?.['C/Color8'])
      body.style.setProperty('--color9', prefs?.['C/Color9'])
      body.style.setProperty('--color10', prefs?.['C/GIZMOX'])
      body.style.setProperty('--color11', prefs?.['C/GIZMOY'])
      body.style.setProperty('--color12', prefs?.['C/GIZMOZ'])
      body.style.setProperty('--urlBgIni', `url(${prefs?.FONDOCLIINICIAL})`)
      if (
        prefs?.CATALOGOUNIVERSAL &&
        prefs?.UNIDADSUELO &&
        prefs?.UNIDADPARED0 &&
        prefs?.UNIDADPARED1 &&
        prefs?.UNIDADTECHO
      )
        return

      setTextures(
        prefs?.CATALOGOUNIVERSAL,
        prefs?.UNIDADSUELO,
        prefs?.UNIDADPARED0,
        prefs?.UNIDADPARED1,
        prefs?.UNIDADTECHO,
      )
    })

    addLogoutOnClose(...userState)
  }, [])
  useUserLanguage(userState)
  return <userContext.Provider value={userState}>{children}</userContext.Provider>
}

function addLogoutOnClose(user: UserType, setUser: SetUserType) {
  window.addEventListener('beforeunload', () => {
    let remember = localStorage.getItem('remember_session')
    let isUserLogged = localStorage.getItem('isUserLogged')
    if (!remember && isUserLogged) {
      logOut(user, setUser)
    }
  })
}

async function refreshUserData(
  user: UserType,
  setUser: SetUserType,
  data: Store['textos']['idioma'] & { idIdioma: number; idioma: { id: number } },
  navigate?,
  href?,
) {
  const baseURL = getProxyUrl('api/Auth/getUserAct')
  const proxy = await fetch(baseURL, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept-Language': 'ES',
      'Content-Type': 'application/json',
      Authorization: 'Ninpo ' + sessionStorage.getItem('access_token'),
    },
  })
  const proxyData = await proxy.json()

  delete proxyData.passwordActual
  delete proxyData.passwordConfirmar
  delete proxyData.passwordNuevo
  window.localStorage.removeItem('userData')
  window.localStorage.setItem('userData', JSON.stringify(proxyData))

  window.localStorage.setItem('isUserLogged', 'true')
  setUser((prev) => ({
    ...prev,
    ...proxyData,
    idIdioma: proxyData.idIdioma,
    nombreCultura: getLanguageID('ID', proxyData.idIdioma),
    idiomaCultura: getLanguageID('ID', proxyData.idIdioma),
  }))
  if (navigate) {
    if (href) {
      navigate(href)
    } else {
      navigate(-1)
    }
  }
  
}

async function updateUser(
  user: UserType,
  setUser: SetUserType,
  //TODO check
  data: UpdateUserData & { id: number; codigo: string; idioma: { id: number } },
  idiomaCultura: string,
) {
  const setTextos = useAppStore.getState().setTextos
  if (window.localStorage.getItem('isUserLogged')) {

  const proxy = await fetch(getProxyUrl('api/Auth/modifyUserAct'), {
      body: JSON.stringify(data),
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept-Language': idiomaCultura,
        'Content-Type': 'application/json',
        Authorization: 'Ninpo ' + sessionStorage.getItem('access_token'),
      },
    })
    
    const proxyData = await proxy.json()
    if(!proxyData.ok){
      return {error:proxyData.detail }
    }
    
    const isError = refreshUserData(user, setUser, proxy)
    if (isError ) return isError

    const setIdiomaCultura = useAppStore.getState().setIdiomaCultura
    setIdiomaCultura(data.nombreCultura)
  } else {
    new I18NProxy().loadIdioma(data.idiomaCultura).then((data: any) => {
      window.localStorage.setItem(
        'userData',
        JSON.stringify({
          ...user,
          nombreCultura: data.idIdioma?.nombreCultura,
          idIdioma: data.idioma.id,
        }),
      )

      setTextos({ idioma: data.idioma, textos: data.textos })
      const setIdiomaCultura = useAppStore.getState().setIdiomaCultura
      setIdiomaCultura(data.idioma.nombreCultura)
      setUser((user) => ({
        ...user,
        nombreCultura: data.idioma.nombreCultura,
        idIdioma: data.idioma.id,
      }))
    })
  }
}

function logOut(user: UserType, setUser: SetUserType) {
  cleanAuthToken()
  window.localStorage.removeItem('isUserLogged')
  window.localStorage.removeItem('remember_session')
  window.localStorage.removeItem('userData')
  setUser(userDefaultValue)
  new AutenticateProxy().newSession().then(() => location.reload())
}

async function login(
  user: UserType,
  setUser: SetUserType,
  { correo, password, remember }: LoginData,
  setPrefs,
  navigate,
  href,
) {
  const proxy = await new AutenticateProxy().autenticate({
    correo,
    password,
    remember,
  })
  
  if (!proxy.token) return console.log('pwokshy not found', { proxy, correo, password, remember })

  setPrefs(proxy.prefs, proxy.prefsInfo)
  refreshUserData(user, setUser, proxy, navigate, href)
}

/**
 * @type user: { name: "Public"} | {name: string
 * postcode: string,
 * mail: string,
 * address: string,
 * languageID: null | number,
 * phone: number
 * postcode: string,
 * mail: string,
 * address: string,
 * languageID: (null | number),
 * phone: number}
 *
 * @type actions: { logOut, login }
 * Devuelve un objeto que contiene user y actions.
 */
export function useUser() {
  const contextValue = useContext(userContext)

  if (contextValue === null) {
    return console.log('Cannot use useUser outside user provider')
  }
  const [user, setUser]: [UserType, SetUserType] = contextValue

  const userActions = {
    /**
     * ```js
     * const { actions } = useUser()
     *
     * actions.logOut()
     * ```
     */
    logOut: () => logOut(user, setUser),
    /**
     * ```js
     * const { actions } = useUser()
     *
     * actions.login({ correo: 'blabla@bla.com', password: 'contraseña1', remember: true })
     * ```
     */
    login: (data: LoginData, setPrefs, navigate, href) =>
      login(user, setUser, data, setPrefs, navigate, href),
    updateUser: (data: UpdateUserData) => updateUser(user, setUser, data, user.idiomaCultura),
  }

  return { user, userActions }
}
