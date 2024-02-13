// components/Sidebar

import close from "@assets/generalItems/deleteCross.png";
import { ItemZoneProvider } from "@context/ItemZoneContext.tsx";
import { useSelectedElements } from "@hooks/useSelectedElements.ts";
import * as Form from "@radix-ui/react-form";
import { useAppStore } from "@store";
import { Item } from "@types";
import clsx from "clsx";
import { SidebarAreaInputs } from "./Area/SidebarAreaInputs.tsx";
import { SidebarHoleInputs } from "./Hole/SidebarHoleInput.tsx";
import { SidebarItemInputs } from "./Item/SidebarItemInputs.tsx";
import { SidebarLightInputs } from "./Light/SidebarLightInputs.tsx";
import { SidebarWallInputs } from "./Wall/SidebarWallInputs.tsx";
import { SidebarLinkedInputs } from "./Linked/SidebarLinkedInputs.tsx";

type Props = { selectedType: string };

export function Sidebar({ selectedType }: Props) {
  const { lastSelectedElement } = useSelectedElements();
  const { description } = lastSelectedElement as Item;
  const t = useAppStore.use.t();
  const unselectAll = useAppStore.use.unselectAll();

  return (
    <div
      className={clsx(
        "absolute right-0 mt-0 w-64 tablet:top-20 laptop:top-20 desktop:top-40"
      )}
      key={lastSelectedElement?.id}
    >
      <aside
        className=" h-[47rem] overflow-x-hidden overflow-y-hidden rounded-bl-md rounded-tl-md border-b-2 border-l-2 border-r-2 border-solid border-b-C/Color3 border-l-C/Color3 border-r-C/Color3 bg-C/Color1"
        onKeyDown={(event) => event.stopPropagation()}
        onKeyUp={(event) => event.stopPropagation()}
      >
        <div className="flex h-min justify-between bg-C/Color3 py-1 text-white">
          <div>
            <span className="ml-3 text-sm text-C/Color1">
              {selectedType === "lights"
                ? t("MSG_155") + " > " + t(description)
                : selectedType === "areas"
                ? t("MSG_15") + " > " + t("MSG_252")
                : t("MSG_15") + " > " + t(description)}
            </span>
          </div>
          <div>
            <img
              className="mb-0 mr-[0.4em] mt-[0.4em] h-2 cursor-pointer"
              src={close}
              role="button"
              onClick={unselectAll}
            />
          </div>
        </div>
        <ItemZoneProvider>
          <Form.Root
            className="relative mx-1.5 my-0 h-full"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {{
              walls: <SidebarWallInputs />,
              items: <SidebarItemInputs />,
              lights: <SidebarLightInputs />,
              areas: <SidebarAreaInputs />,
              holes: <SidebarHoleInputs />,
              linkedItem: <SidebarLinkedInputs />,
            }[selectedType] ?? null}
          </Form.Root>
        </ItemZoneProvider>
      </aside>
    </div>
  );
}
