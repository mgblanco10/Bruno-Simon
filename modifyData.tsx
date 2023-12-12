import flechaIco from '@assets/sidebar/Flecha.png'
import directorio from '@assets/nuevos-iconos/directorio.png'
import React, { useEffect, useState } from 'react'
import close from '@assets/nuevos-iconos/x.png'
import * as Dialog from '@radix-ui/react-dialog'
import * as Form from '@radix-ui/react-form'
import * as Select from '@radix-ui/react-select'
import { motion } from 'framer-motion'

import { UserType, useUser } from '@context/user'
import capitalize from '@utils/conversion/capitalize'

import { useAppStore } from '@store'
import { getLanguageID } from '@utils/getLanguageID'

const SelectItem = React.forwardRef<HTMLSelectElement, any>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    )
  },
)

export default function ModifyData() {
  const { user, userActions } = useUser()
  const idiomaActual = getLanguageID('ID', user.idIdioma)
  const [currLanguage, setCurrLanguage] = useState(idiomaActual)
  const [errorMessage, setErrorMessage] = useState('')
  const t = useAppStore.use.t()
  const closeModal = useAppStore.use.closeModal()
  const openModal = useAppStore.use.openModal()
  const [open, setOpen] = useState(false)
  const [
    {
      nombre,
      apellidos,
      empresa,
      direccion,
      ciudad,
      pais,
      cif,
      PasswordActual,
      PasswordNuevo,
      PasswordConfirmar,
      correo,
      telefono,
      codigoPostal,
      nombreCultura,
      idIdioma,
    },
    setState,
  ] = useState<
    UserType & { PasswordActual: string; PasswordNueva: string; PasswordNuevaConfirmar: string }
  >({
    ...user,
    PasswordActual: '',
    PasswordNuevo: '',
    PasswordConfirmar: '',
  })

  let languages = JSON.parse(window.localStorage.getItem('languageOptions')!) as {
    nombreCultura: string
    idioma: string
  }[]

  async function modifyData() {
    const isError = await userActions.updateUser({
      nombre,
      apellidos,
      idIdioma,
      empresa,
      direccion,
      ciudad,
      pais,
      cif,
      PasswordActual,
      PasswordNuevo,
      PasswordConfirmar,
      correo,
      telefono,
      codigoPostal,
      nombreCultura,
      idiomaCultura: nombreCultura,
    })

    if (isError.error) {
      setErrorMessage(isError.error)
      return true
    } else {
      setErrorMessage('')
      setOpen(false)
    }
    closeModal()
    return false
  }

  let idiomas = useAppStore.use.languageOptions()

  useEffect(() => {
    openModal()
    return () => closeModal()
  }, [])

  return (
    <Dialog.Root
      open={open} onOpenChange={setOpen}
    >
      <Dialog.Trigger>
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          className='popupMenuSecondItem row-start-2 grid h-9 w-full grid-cols-[16px_5fr] items-center gap-4 border-t-2 pl-5 text-left'
          onClick={openModal}
        >
          <img src={directorio} />
          <div>{t('MSG_66')}</div>
        </motion.div>
      </Dialog.Trigger>
      <Dialog.Portal >
        <div className=' white-background h-100vh w-100vw scrollbar absolute bottom-0 left-0 right-0 top-0 m-auto flex flex-col items-center overflow-x-hidden overflow-y-scroll rounded-[15px]'>
        <Dialog.Content
          onInteractOutside={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          className='absolute h-[465px] w-[730px] top-1/2 right-1/2 z-30 flex translate-x-1/2 -translate-y-1/2 rounded-[15px] border-2 border-C/Color3 bg-C/Color1 shadow-xl'
          id='userModifyData'
          
          >
       
          <Dialog.Close asChild onClick={() => setOpen(false)}>
            <div className='absolute right-2.5 top-2.5 cursor-pointer'>
              <img
                className='cursor-pointer'
                role='button'
                src={close}
              />
            </div>
          </Dialog.Close>
          <Form.Root>
            <div className=' ml-3 mt-6 flex h-[230px] w-[700px] rounded-md border-none bg-gray-200 p-3 shadow-md'>
              <div className=' absolute left-[24px] '>
                <h5 className=' -mt-1 mb-2 w-[300px] border-b-2 border-C/Color2 text-xl text-main-gray '>
                  {t('MSG_101')}
                </h5>
              </div>
              <div className='mr-6 mt-10 flex-1 space-y-2 '>
                <Form.Field
                  name='nombre'
                  className='ModifyFormField mt-1 flex justify-between'
                >
                  <Form.Label className='text-lg text-main-gray'>{t('MSG_45')}</Form.Label>
                  <Form.Control asChild>
                    <input
                      placeholder={capitalize(nombre)}
                      className='Modifyinput h-[22px] w-[175px] rounded-sm border border-C/Color3 pl-1 text-lg text-main-gray'
                      maxLength={50}
                      defaultValue={nombre}
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          nombre: e.target.value,
                        }))
                      }
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field
                  name='empresa'
                  className='ModifyFormField mt-1 flex justify-between'
                >
                  <Form.Label className='text-lg text-main-gray'>{t('MSG_61')}</Form.Label>
                  <Form.Control asChild>
                    <input
                      placeholder={t('MSG_132')}
                      className='Modifyinput h-[22px] w-[175px] rounded-sm border border-C/Color3 pl-1 text-lg text-main-gray'
                      maxLength={50}
                      defaultValue={empresa}
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          empresa: e.target.value,
                        }))
                      }
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field
                  name='direccion'
                  className='ModifyFormField mt-1 flex justify-between'
                >
                  <Form.Label className='text-lg text-main-gray'>{t('MSG_47')}</Form.Label>
                  <Form.Control asChild>
                    <input
                      placeholder={t('MSG_134')}
                      className='Modifyinput h-[22px] w-[175px] rounded-sm border border-C/Color3 pl-1 text-lg text-main-gray'
                      maxLength={50}
                      defaultValue={direccion}
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          direccion: e.target.value,
                        }))
                      }
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field
                  name='codigoPostal'
                  className='ModifyFormField mt-1 flex justify-between'
                >
                  <Form.Label className='text-lg text-main-gray'>{t('MSG_48')}</Form.Label>
                  <Form.Control asChild>
                    <input
                      placeholder={t('MSG_136')}
                      className='Modifyinput h-[22px] w-[175px] rounded-sm border border-C/Color3 pl-1 text-lg text-main-gray'
                      defaultValue={codigoPostal}
                      maxLength={50}
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          codigoPostal: e.target.value,
                        }))
                      }
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field
                  name='correo'
                  className='ModifyFormField mt-1 flex justify-between'
                >
                  <Form.Label className='text-lg text-main-gray'>{t('MSG_40')}</Form.Label>
                  <Form.Control asChild>
                    <input
                      placeholder={correo}
                      className='Modifyinput h-[22px] w-[175px] rounded-sm border border-C/Color3 pl-1 text-lg text-main-gray'
                      maxLength={50}
                      defaultValue={correo}
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          correo: e.target.value,
                        }))
                      }
                    />
                  </Form.Control>
                </Form.Field>
              </div>
              <div className='ml-8 mt-10 flex-1 space-y-2'>
                <Form.Field
                  name='apellidos'
                  className='ModifyFormField mt-1 flex justify-between'
                >
                  <Form.Label className='text-lg text-main-gray'>{t('MSG_46')}</Form.Label>
                  <Form.Control asChild>
                    <input
                      placeholder={capitalize(apellidos)}
                      className='Modifyinput h-[22px] w-[175px] rounded-sm border border-C/Color3 pl-1 text-lg text-main-gray'
                      maxLength={50}
                      defaultValue={apellidos}
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          apellidos: e.target.value,
                        }))
                      }
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field
                  name='cif'
                  className='ModifyFormField mt-1 flex justify-between'
                >
                  <Form.Label className='text-lg text-main-gray'>{t('MSG_62')}</Form.Label>
                  <Form.Control asChild>
                    <input
                      placeholder={t('MSG_133')}
                      className='Modifyinput h-[22px] w-[175px] rounded-sm border border-C/Color3 pl-1 text-lg text-main-gray'
                      type={'text'}
                      maxLength={50}
                      defaultValue={cif}
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          cif: e.target.value,
                        }))
                      }
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field
                  name='ciudad'
                  className='ModifyFormField mt-1 flex justify-between'
                >
                  <Form.Label className='text-lg text-main-gray'>{t('MSG_64')}</Form.Label>
                  <Form.Control asChild>
                    <input
                      placeholder={t('MSG_135')}
                      className='Modifyinput h-[22px] w-[175px] rounded-sm border border-C/Color3 pl-1 text-lg text-main-gray'
                      maxLength={50}
                      defaultValue={ciudad}
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          ciudad: e.target.value,
                        }))
                      }
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field
                  name='pais'
                  className='ModifyFormField mt-1 flex justify-between'
                >
                  <Form.Label className='text-lg text-main-gray'>{t('MSG_63')}</Form.Label>
                  <Form.Control asChild>
                    <input
                      placeholder={t('MSG_137')}
                      className='Modifyinput h-[22px] w-[175px] rounded-sm border border-C/Color3 pl-1 text-lg text-main-gray'
                      maxLength={50}
                      defaultValue={pais}
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          pais: e.target.value,
                        }))
                      }
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field
                  name='telefono'
                  className='ModifyFormField mt-1 flex justify-between'
                >
                  <Form.Label className='text-lg text-main-gray'>{t('MSG_49')}</Form.Label>
                  <Form.Control asChild>
                    <input
                      placeholder={t('MSG_187')}
                      className='Modifyinput h-[22px] w-[175px] rounded-sm border border-C/Color3 pl-1 text-lg text-main-gray'
                      type={'tel'}
                      maxLength={50}
                      defaultValue={telefono}
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          telefono: e.target.value,
                        }))
                      }
                    />
                  </Form.Control>
                </Form.Field>
              </div>
            </div>
            <div className='ml-3 mt-2.5 flex h-[180px] w-[700px]'>
              <div className='mr-2.5 flex-1 rounded-md bg-gray-200 pl-2 pr-2 pt-3.5 shadow-md'>
                <Form.Field
                  name='contraseñaactual'
                  className='ModifyFormField mt-1 flex justify-between pb-1'
                >
                  <Form.Label className=' text-lg text-main-gray'>{t('MSG_41')}</Form.Label>
                  <Form.Control asChild>
                    <input
                      placeholder='*************'
                      className='Modifyinput mr-2 h-[22px] w-[145px] rounded-sm border border-C/Color3  pl-1 text-lg text-main-gray'
                      type={'password'}
                      maxLength={50}
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          PasswordActual: e.target.value,
                        }))
                      }
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field
                  name='nuevacontraseña'
                  className='ModifyFormField mt-1 flex justify-between pb-1'
                >
                  <Form.Label className='text-lg text-main-gray'>{t('MSG_247')}</Form.Label>
                  <Form.Control asChild>
                    <input
                      placeholder='*************'
                      className='Modifyinput mr-2 h-[22px] w-[145px] rounded-sm border border-C/Color3 pl-1 text-lg text-main-gray'
                      type={'password'}
                      maxLength={50}
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          PasswordNuevo: e.target.value,
                        }))
                      }
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field
                  name='confirmarcontraseña'
                  className='ModifyFormField mt-1 flex justify-between'
                >
                  <Form.Label className='text-lg text-main-gray'>{t('MSG_248')}</Form.Label>
                  <Form.Control asChild>
                    <input
                      placeholder='*************'
                      className='Modifyinput mr-2 h-[22px] w-[145px] rounded-sm border border-C/Color3 pl-1 text-lg text-main-gray'
                      type={'password'}
                      maxLength={50}
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          PasswordConfirmar: e.target.value,
                        }))
                      }
                    />
                  </Form.Control>
                </Form.Field>
                {errorMessage && (
                  <p className='mt-1.5 text-start text-[10px] text-C/Color6'> {errorMessage}</p>
                )}
              </div>
              <div className='flex-1 rounded-md bg-gray-200 p-4 shadow-md'>
                <Form.Field
                  name='idioma'
                  className='ModifyFormField mt-1 flex justify-between'
                >
                  <Form.Label className='text-lg  text-main-gray'>{t('MSG_65')}</Form.Label>

                  <Form.Control asChild>
                    <Select.Root
                      value={currLanguage as string}
                      onValueChange={async (e) => {
                        setCurrLanguage(e)
                        let idIdiomaNueva = await getLanguageID('code', e)
                        setState((prevState) => ({ ...prevState, idIdioma: idIdiomaNueva }))
                      }}
                    >
                      <Select.Trigger className='relative mr-2 w-[200px] rounded-sm border border-solid border-C/Color3 px-1 py-1 pr-4'>
                        <Select.Value
                          className='text-overflow-ellipsis block overflow-hidden whitespace-nowrap'
                          style={{ maxWidth: '120px' }}
                        />
                        <img
                          className='absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 transform'
                          src={flechaIco}
                          alt='icon arrow'
                        />
                      </Select.Trigger>

                      <Select.Portal>
                        <Select.Content
                          position='popper'
                          className='z-50 mr-2 rounded-sm border border-solid border-C/Color3 bg-C/Color1 px-3 py-1'
                        >
                          <Select.Viewport className='ml-[-6px] mt-1'>
                            <Select.Group className='flex flex-col items-center'>
                              {idiomas.map(({ nombreCultura, idioma }) => (
                                <SelectItem
                                  value={nombreCultura}
                                  key={nombreCultura}
                                >
                                  {idioma}
                                </SelectItem>
                              ))}
                            </Select.Group>
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </Form.Control>
                </Form.Field>
                <Form.Submit
                  asChild
                  onSubmit={async (e) => {
                    e.preventDefault()
                    modifyData()
                  }}
                >
                  <div className='ml-28 mr-[3px] mt-20 h-[33px] w-[200px] cursor-pointer rounded-md bg-C/Color2 text-center'>
                    <span
                      onClick={() => {
                        modifyData()
                      }}
                      className='inline-block text-xl text-C/Color1 mt-0.5'
                    >
                      {t('MSG_82')}
                    </span>
                  </div>
                </Form.Submit>
              </div>
            </div>
          </Form.Root>
        </Dialog.Content>
          </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
