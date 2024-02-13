// components/ModalEditor

import { useItemCurrentZone } from "@hooks/useItemCurrentZone";
import { useAppStore } from "@store";
import { useEffect, useState } from "react";
import { EditorObjectZones } from "./EditorObjectZones";
import { EditorWrapper } from "./EditorWrapper";
import { BoxButtonsEditorWrapper } from "./BoxButtonsEditorWrapper";
import { ModalToolbar } from "./EditorToolbar";
import { LinkedSonZones } from "./LinkedSonZones";

type Props = {
  image: string;
};

export function LinkedItemEditor({ image }: Props) {
  const currentLayer = useAppStore.use.currentLayer();
  const t = useAppStore.use.t();
  const selected = useAppStore.use
    .layers()
    [currentLayer].selected.values()
    .next().value;
  const item = useAppStore.use.items().get(selected) as ClientItem;
  const itemSelectedLinkedItems = item.selectedVariantArray;

  const { currentZone, setCurrentZone } = useItemCurrentZone(item);

  const [linkedToScroll, setLinkedToScroll] = useState("");

  const items = useAppStore.use.items();

  useEffect(() => {
    items.forEach((value, key) => {
      if (value.type === "linkedSon" && value.firstParentID === selected) {
        console.log(`linkedSon ID: ${key}`, value);
      }
    });
  }, [items, selected]);
  const [linkedSons, setLinkedSons] = useState([]);

  useEffect(() => {
    const tempLinkedSons = new Set();
    items.forEach((value, key) => {
      if (value.type === "linkedSon" && value.firstParentID === item.id) {
        tempLinkedSons.add(value);
      }
    });
    setLinkedSons(Array.from(tempLinkedSons));
  }, [items, item]);

  console.log("linkedSon desde LinkedItemEditor", linkedSons);

  const openModal = useAppStore.use.openModal();
  const closeModal = useAppStore.use.closeModal();
  useEffect(() => {
    openModal();
    return () => closeModal();
  });
  console.log("123456", item, currentZone);

  return (
    <EditorWrapper
      objectName={item?.description}
      currentZoneName={currentZone.name}
    >
      <div className="flex h-[688px] w-[615px] overflow-hidden">
        <section className="flex flex-1 flex-col overflow-hidden">
          <EditorObjectZones
            object={item}
            currentZoneID={currentZone.zone}
            setCurrentZone={setCurrentZone}
          />
          <div className="mt-1 h-9 bg-C/Color3"></div>
          {linkedSons.map((linkedSon) => (
            <LinkedSonZones key={linkedSon.id} linkedSon={linkedSon} />
          ))}

          <BoxButtonsEditorWrapper />
        </section>
        <section className="flex flex-1 flex-col overflow-hidden">
          <article className="flex h-full flex-col overflow-hidden border-l-2 border-r-2 border-C/Color3"></article>
          <ModalToolbar />
        </section>
      </div>
    </EditorWrapper>
  );
}
