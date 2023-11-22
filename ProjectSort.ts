import flechaIco from '@assets/sidebar/Flecha.jpg'
import * as Select from '@radix-ui/react-select'
import { useAppStore } from '@store'
import React from 'react'

// const SelectItem = React.forwardRef<HTMLSelectElement, any>(
//   ({ children, className, ...props }, forwardedRef) => (
//     <Select.Item {...props} ref={forwardedRef}>
//       <Select.ItemText>{children}</Select.ItemText>
//     </Select.Item>
//   )
// )

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

type Props = {
  isBusinessAccount: boolean;
  setOrden: any;
  orden: number;
  texto: string;
};

export function ProjectSort({ isBusinessAccount, setOrden, orden, texto }: Props) {
  const t = useAppStore.use.t()

  // const handleValueChange = (val) => {
  //   setOrden(val)
  // }

  // const selectOptions = [
  //   { value: 0, text: ' ' + t('MSG_45') },
  //   { value: 1, text: ' ' + t('MSG_46') },
  //   { value: 2, text: ' ' + t('MSG_70') },
  //   { value: 3, text: ' ' + t('MSG_49') },
  //   { value: 4, text: ' ' + t('MSG_71') },
  //   { value: 5, text: ' ' + t('MSG_72') },
  //   { value: 6, text: ' ' + t('MSG_73') }
  // ]

  return (
    // <Select.Root onValueChange={handleValueChange}>
    <Select.Root onValueChange={(val) => setOrden(val)}>
      <Select.Trigger className='sortTrigger ml-8 mr-1 mt-2 mb-2 flex h-9 w-[510px] flex-row-reverse border-none bg-gray-200 text-main-gray shadow-md rounded-md justify-between'>
        <Select.Icon>
          <img className='proyectSortSortArrow mt-3 mr-2 h-3 w-3' src={flechaIco} alt='icon arrow' />
        </Select.Icon>
        <div className='mt-1 ml-3 text-lg'> {t('MSG_69')}
          <Select.Value placeholder={'...'}/>
        </div>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position='popper'
          className='sortContent fixed z-50 mt-0.5 ml-[285px] w-max rounded-lg border-2 border-solid border-C/Color3 bg-C/Color1 text-C/Color4'
        >

          <Select.Viewport className=' m-1 mr-2'>
            <Select.Group className='popperSelect'>

{isBusinessAccount && (
                <div>
                  <SelectItem
                    className='proyectItem'
                    value={0}
                  >
                   {' ' + t('MSG_45')}
                  </SelectItem>
                  <SelectItem
                    className='proyectItem'
                    value={1}
                  >
                    {' ' + t('MSG_46')}
                  </SelectItem>
                  <SelectItem
                    className='proyectItem'
                    value={2}
                  >
                    {' ' + t('MSG_70')}
                  </SelectItem>
                  <SelectItem
                    className='proyectItem'
                    value={3}
                  >
                    {' ' + t('MSG_49')}
                  </SelectItem>
                </div>
              )}
              <SelectItem
                className='proyectItem'
                value={4}
              >
                {t('MSG_71')}
              </SelectItem>
              <SelectItem
                className='proyectItem'
                value={5}
              >
                {' ' + t('MSG_72')}
              </SelectItem>
              <SelectItem
                className='proyectItem ml-8'
                value={6}
              >
                {' ' + t('MSG_73')}
              </SelectItem>
              
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}