// components/ModalEditor

import { useAppStore } from "@store";

export function LinkedSonZones({ linkedSon }) {
  const t = useAppStore.use.t();

  console.log("linkedSon desde LinkedSonZONES", linkedSon.zones);

  return (
    <div>
      <div className="flex flex-col">
        {Object.entries(linkedSon.zones).map(([zoneName]) => (
          <div key={zoneName} className="mb-2 rounded border p-2 shadow">
            <div className="font-bold">{t(zoneName)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
