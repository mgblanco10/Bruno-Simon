import * as Accordion from '@radix-ui/react-accordion'
import { useAppStore } from '@store'
import { ClientTextureGroup, SetState } from '@types'
import { FEAcabadoZonaModeloInfoDTO } from '@utils/queryBuilder/myApi'
import clsx from 'clsx'

type Props = {
  textureGroups: ClientTextureGroup['textureGroups']
  setTextureGroups: SetState<ClientTextureGroup>
  selectedTextureGroup: ClientTextureGroup['selected']
}

export function ClientItemTextureGroups({
  textureGroups,
  setTextureGroups,
  selectedTextureGroup,
}: Props) {
  const t = useAppStore.use.t()

  function handleClick(textureGroup: FEAcabadoZonaModeloInfoDTO) {
    setTextureGroups((prev: ClientTextureGroup) => ({
      ...prev,
      selected: {
        id: textureGroup.idAcabadoUnidadModeloAcabado,
        name: textureGroup.modelo,
      },
    }))
  }

  function renderAcabado(textureGroups: FEAcabadoZonaModeloInfoDTO['acabados']) {
    return textureGroups?.map((el) => (
      <Accordion.Item
        key={el.idAcabadoUnidadModeloAcabado.toString()}
        value={el.idAcabadoUnidadModeloAcabado.toString()}
      >
        <div className='cursor-pointer border-b border-black p-1 pl-10 hover:bg-slate-100'>
          {el.acabado}
        </div>
      </Accordion.Item>
    ))
  }

  function isSelectedGroup(group: FEAcabadoZonaModeloInfoDTO) {
    return group.idAcabadoUnidadModeloAcabado == selectedTextureGroup.id
  }

  function renderAccordion(textureGroups: ClientTextureGroup['textureGroups']) {
    return textureGroups?.map((group: FEAcabadoZonaModeloInfoDTO) => {
      const hasAcabado = group?.acabados?.length

      return (
        <Accordion.Item
          // Usar esto cuando me venga todo bien
          //   value={acabado.isAcabadoUnidadModeloAcabado?.toString()}
          //   key={acabado.isAcabadoUnidadModeloAcabado?.toString()}
          value={group.modelo?.toString()}
          key={group.modelo?.toString()}
          onClick={() => handleClick(group)}
        >
          {hasAcabado ? (
            <Accordion.Header>
              <Accordion.Trigger className='m-0 w-[19.1em] cursor-pointer border-b border-black p-1 pl-4 text-left hover:bg-slate-100'>
                {group.modelo + ' >'}
              </Accordion.Trigger>
            </Accordion.Header>
          ) : (
            <div
              className={clsx(
                'cursor-pointer border-b border-black p-1 pl-4 hover:bg-slate-100',
                isSelectedGroup(group) && 'bg-slate-100',
              )}
            >
              {group.modelo}
            </div>
          )}

          <Accordion.Content className='AccordionContent'>
            {hasAcabado && (
              <Accordion.Root
                collapsible
                type='single'
              >
                {renderAcabado(group.acabados)} 
              </Accordion.Root>
            )}
          </Accordion.Content>
        </Accordion.Item>
      )
    })
  }

  return (
    <article className='flex max-h-[165px] flex-col '>
      <div className='flex bg-C/Color3 py-1.5 pl-5 text-sm font-semibold text-white'>
        {t('MSG_223')}
      </div>

      <div className='scrollable-editor border-b-1 relative overflow-y-scroll border-b border-b-dark-blue'>
        <div className='z-0'>
          <Accordion.Root
            collapsible
            type='single'
            // value={shouldExpandOnLoad ? parentGroupIds[0] : controlledValues[0]}
            // onValueChange={(value) => handleRootChange(value)}
          >
            {textureGroups && renderAccordion(textureGroups)}
          </Accordion.Root>
        </div>
      </div>
    </article>
  )
}
