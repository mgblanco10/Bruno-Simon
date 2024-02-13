import { useSelectedElements } from "@hooks/useSelectedElements.ts";
import { useAppStore } from "@store";
import { OptionsButton } from "../OptionsButton.tsx";
import { SidebarInfo } from "../SidebarInfo.tsx";
import { LinkedItemEditor } from "@components/ModalEditor/LinkedItemEditor.tsx";

export function SidebarLinkedInputs() {
  const t = useAppStore.use.t();
  const { lastSelectedElement, type } = useSelectedElements();

  const { image, description, price, id, y, thickness, height } =
    lastSelectedElement;

  return (
    <div className="mt-5 flex h-full flex-col">
      <div>
        <SidebarInfo image={image}>
          <div className="text-center text-xs">{t("MSG_182")}</div>
        </SidebarInfo>
      </div>
      <div className="mt-4">
        <OptionsButton>
          <LinkedItemEditor image={image} />
        </OptionsButton>
      </div>
    </div>
  );
}
