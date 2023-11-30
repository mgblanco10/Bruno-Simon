import { useAppStore } from '@store'
import { LinkedElementsWithVariant, LinkedItem, SetState } from '@types'

type Props = {
  linkedItems: LinkedElementsWithVariant
  setLinkedToScroll: SetState<string>
  selectedTexture: { id?: number; name?: string }
}

export function ClientItemOptions({ linkedItems, setLinkedToScroll, selectedTexture }: Props) {
  const t = useAppStore.use.t()

  function handleClick(item: LinkedElementsWithVariant[number]) {
    setLinkedToScroll(item.descripcion)
  }

  function renderOptionsAccordion(linkedItems: LinkedElementsWithVariant) {
    return linkedItems?.map((linked) => {
      const item = linked
      const linkedID = item?.idUnidades.toString()
      const nestedLinked = item?.childs
      const hasLinkedItems = nestedLinked && nestedLinked.length > 0
      const glb = useAppStore.getState().sceneGLB.get(linked?.variant)
      const linkedItem = useAppStore.getState().items.get(glb?.glb?.scene?.userData?.id)

      if (!linkedItem) return

      return (
        <>
          <div
            key={linkedID}
            onClick={() => handleClick(item)}
            className='mr-[1px] w-full cursor-pointer border-b border-black p-1 pl-4 hover:bg-slate-100'
          >
            {item.variant}
          </div>

          {renderSelectedGroupAccordion()}
          {renderSelectedTextureAccordion(linkedItem)}
          {hasLinkedItems && <div>{renderOptionsAccordion(nestedLinked)}</div>}
        </>
      )
    })
  }

  function renderSelectedGroupAccordion() {
    return (
      <div className='mr-[1px] w-full cursor-pointer border-b border-black p-1 pl-8 hover:bg-slate-100'>
        {selectedTexture?.name}
      </div>
    )
  }

  function renderSelectedTextureAccordion(linkedItem: LinkedItem) {
    return (
      <div className='mr-[1px] w-full cursor-pointer border-b border-black p-1 pl-12 hover:bg-slate-100'>
        {linkedItem.properties[0]?.description}
      </div>
    )
  }

  return (
    <article className='flex max-h-[165px] flex-col '>
      <div className='flex bg-C/Color3 py-1.5 pl-5 text-sm font-semibold text-white'>
        {t('MSG_25')}
      </div>
      <div className='scrollable-editor border-b-1 relative overflow-y-scroll border-b border-b-dark-blue'>
        <div className='z-0'>
          <div>{renderOptionsAccordion(linkedItems)}</div>
        </div>
      </div>
    </article>
  )
}
