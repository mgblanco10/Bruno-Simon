// store.items.forEach((item, itemId) => {
//   if (item.type === 'holes' && item.line === rightWall.id) {
//     const holePosition =  item.distI + (item.width / 2)
//     console.log(' holePosition', holePosition)
//     if (holePosition < rigthWallHalfWidth) {
//       console.log('entrando aquí')
//       item.line = rightWall.id
//       item.distD = rigthWallHalfWidth - (item.distI + item.width )
//       console.log(` LADO Izquierdo que pasa distI: ${item.distI}, distD: ${item.distD}, width HOLES item.width: ${item.width}, rigthWallHalfWidth: ${rigthWallHalfWidth}, PARED item.line: ${ item.line}, leftWall.id ${leftWall.id} y pared rightWall.id: ${rightWall.id} `)

//     } else if (holePosition > rigthWallHalfWidth) {
//       console.log('entrando aquí OOOOOOO')
//       item.line = leftWall.id
//       rightWall.width = rigthWallHalfWidth
//       item.distI = item.distI - rigthWallHalfWidth
//       item.distD = rightWall.width - (item.distI + item.width)
//       console.log(`LADO Derecho  que pasa distI: ${item.distI}, distD: ${item.distD}, width  HOLES item.width: ${item.width}, rigthWallHalfWidth: ${rigthWallHalfWidth},  PARED item.line: ${ item.line}, rightWall.width: ${rightWall.width}  leftWall.id = ${leftWall.id}`)
//     }

//     if (holePosition === rigthWallHalfWidth) {
//       console.log(`Hole en la mitad de la pared: ${itemId}`)
//       hasHolesInMiddle = true
//     }
//   }
// })

// if (hasHolesInMiddle) {
//   console.log(
//     'Antes de dividir la pared mueva la ventana, hueco ó puerta que está en el medio.',
//   )
//   return
// }
