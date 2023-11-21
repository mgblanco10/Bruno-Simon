import { Text } from '@react-three/drei'
import { useAppStore } from '@store'
import { LineType } from '@types'
import { calcRotation } from '@utils/generalMaths/calcRotation'
import { getInnerAngle } from '@utils/sceneObjects/lines/getInnerAngle'

type Props = { id: string; offset: number }

export default function LineDimentions({ id, offset }: Props) {
  const VERTICAL_LINE_ARGS = [8, 100] satisfies [
    width?: number | undefined,
    height?: number | undefined,
    depth?: number | undefined,
    widthSegments?: number | undefined,
    heightSegments?: number | undefined,
    depthSegments?: number | undefined,
  ]
  const item = useAppStore((store) => store.items.get(id)!) as LineType
  const width = item.width
  const start = item.start
  const end = item.end
  const rotation = item.rotation
  const unit = useAppStore((store) => store.prefs?.UNIDADMEDIDA)
  const PREFS_COLOR_COTA = useAppStore((store) => store.prefs?.['C/LINEASCOTA'])
  const HORIZONTAL_LINE_ARGS = [width, 7] satisfies [
    width?: number | undefined,
    height?: number | undefined,
    depth?: number | undefined,
    widthSegments?: number | undefined,
    heightSegments?: number | undefined,
    depthSegments?: number | undefined,
  ]
  const prevLine = item.prevLine
  const prevLineObject = useAppStore.use.items().get(prevLine) as LineType
  const { cp } = getInnerAngle(start, end, prevLineObject?.start, prevLineObject?.end)
  const thickness = item.thickness
  const PREFS_COLOR_TEXTO = useAppStore((store) => store.prefs?.['C/COTA'])
  const FONT_SIZE = useAppStore.use.prefs()?.['T/LETRACOTA'] ?? 100
  const neededRotation = calcRotation(cp, rotation)
  const pref = useAppStore.use.prefs()?.['LoqueSea']
  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-width / 2, 2, -thickness - offset]}
      >
        <boxGeometry args={VERTICAL_LINE_ARGS} />
        <meshBasicMaterial color={PREFS_COLOR_COTA} />
      </mesh>
      <mesh
        position={[0, 2, -thickness - offset]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <boxGeometry args={HORIZONTAL_LINE_ARGS} />
        <meshBasicMaterial color={PREFS_COLOR_COTA} />
        <Text
          position={[0, 75, 0]}
          fontSize={FONT_SIZE}
          characters='abcdefghijklmnopqrstuvwxyz0123456789!ºª'
          color={PREFS_COLOR_TEXTO}
          rotation={[0, ...neededRotation]}
        >
          {`${Math.trunc(width)}${pref? (' ' + unit): ' '}`}
        </Text>
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[width / 2, 2, -thickness - offset]}
      >
        <boxGeometry args={VERTICAL_LINE_ARGS} />
        <meshBasicMaterial color={PREFS_COLOR_COTA} />
      </mesh>
    </group>
  )
}

// ver en getOffsetDimentions.tsx
