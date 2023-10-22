import { useAppStore } from '@store'
import {
  Area,
  CurrentZone,
  Item,
  ClientItemProperty,
  LineType,
  ObjectProperty,
  SetState,
} from '@types'
import clsx from 'clsx'

type Props = {
  object: LineType | Area | Item
  currentZoneID: string
  setCurrentZone: SetState<CurrentZone>
}

export function EditorObjectZones({ object, currentZoneID, setCurrentZone }: Props) {
  const t = useAppStore.use.t()

  function isSameZone(property: ObjectProperty) {
    if (object.type === 'items') {
      return (property as ClientItemProperty).zone === currentZoneID
    } else {
      return property.id === currentZoneID
    }
  }

  function setZone(property: ObjectProperty) {
    setCurrentZone(property)
  }

  return (
    <article className='flex max-h-[165px] flex-col '>
      <div className='flex bg-C/Color3 py-1.5 pl-5 text-sm font-semibold text-white'>
        {t('MSG_222')}    
      </div>

      <div className='scrollable-editor overflow-y-auto'>
        {object.properties?.map((property) => {
          return (
            <div
              key={property.name}
              onClick={() => setZone(property)}
              className={clsx(
                'cursor-pointer border-b border-black p-1 pl-4 hover:bg-slate-100',
                isSameZone(property) && 'bg-slate-100',
              )}
            >
              {t(property.name as `MSG_${number}`)}
            </div>
          )
        })}
      </div>
    </article>
  )
}











