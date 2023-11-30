import duplicarIco from '@assets/sidebar/Duplicar.png'
import infoIco from '@assets/sidebar/Info.png'
import likeIco from '@assets/sidebar/Like.png'
import { useClientTextureGroup } from '@hooks/useClientTextureGroup'
import { useItemCurrentZone } from '@hooks/useItemCurrentZone'
import { useClientItemTextures } from '@hooks/useModelTextures'
import { useAppStore } from '@store'
import { ClientItem } from '@types'
import { useState } from 'react'
import { ClientItemTextureGroups } from './ClientItemAcabados'
import { EditorObjectZones } from './EditorObjectZones'
import { EditorWrapper } from './EditorWrapper'
import { ClientItemOptions } from './ItemOptions'
import { OptionsLayout } from './OptionsLayout'
import { BoxButtonsEditorWrapper } from './BoxButtonsEditorWrapper'

type Props = {
  image: string
}

export function ClientItemEditor({ image }: Props) {
  const currentLayer = useAppStore.use.currentLayer()
  const t = useAppStore.use.t()
  const selected = useAppStore.use.layers()[currentLayer].selected.values().next().value
  const item = useAppStore.use.items().get(selected) as ClientItem
  const itemSelectedLinkedItems = item.selectedVariantArray

  const { currentZone, setCurrentZone } = useItemCurrentZone(item)
  const { textureGroupsData, linkedItemsData, setTextureGroupsData, setLinkedItemsData } =
    useClientItemTextures(item.idUnidades, item.options)

  const { currentGroup } = useClientTextureGroup(textureGroupsData?.selected.id)
  const [linkedToScroll, setLinkedToScroll] = useState('')

  return (
    <EditorWrapper
      objectName={item?.description}
      currentZoneName={currentZone.name}
      currentGroupName={textureGroupsData?.selected?.name}
    >
      <div className='flex h-[688px] w-[615px] overflow-hidden'>
        <section className='flex flex-1 flex-col overflow-hidden'>
          <EditorObjectZones
            object={item}
            currentZoneID={currentZone.zone}
            setCurrentZone={setCurrentZone}
          />
         
          {textureGroupsData?.textureGroups?.length > 0 && (
            <ClientItemTextureGroups
              textureGroups={textureGroupsData?.textureGroups}
              selectedTextureGroup={textureGroupsData?.selected}
              setTextureGroups={setTextureGroupsData}
            />
          )}
          {linkedItemsData?.linkedItems.length && textureGroupsData?.selected && (
            <ClientItemOptions
              linkedItems={linkedItemsData?.linkedItems}
              setLinkedToScroll={setLinkedToScroll}
              selectedTexture={textureGroupsData?.selected}
            />
          )}

          <BoxButtonsEditorWrapper />
        </section>
        <section className='flex flex-1 flex-col overflow-hidden'>
      
        </section>
      </div>

      {linkedItemsData?.linkedItems.length && textureGroupsData?.selected && (
        <OptionsLayout
          object={item}
          linkedItems={linkedItemsData?.linkedItems}
          selectedLinked={linkedItemsData?.selected}
          currentGroup={currentGroup}
          itemSelectedLinkedItems={itemSelectedLinkedItems}
          setLinkedItemsData={setLinkedItemsData}
          linkedToScroll={linkedToScroll}
          selectedTexture={textureGroupsData?.selected}
        />
      )}
    </EditorWrapper>
  )
}
