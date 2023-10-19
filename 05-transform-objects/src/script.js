import './style.css'
import * as THREE from 'three'
// console.log('hello threejs')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// group
const group = new THREE.Group()
group.position.y = 1
// group.scale.y = 2
// group.rotation.y = 1
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), 
    new THREE.MeshBasicMaterial({ color: 0xff0000})
)
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), 
    new THREE.MeshBasicMaterial({ color: 0x00ff00})
)
cube2.position.x = -2
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), 
    new THREE.MeshBasicMaterial({ color: 0x0000ff})
)
cube3.position.x = 2
group.add(cube3)

// /**
//  * Objects
//  */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)
// // mesh.position.x = 0.7
// // mesh.position.y = -0.6
// // mesh.position.z = 1
// mesh.position.set(0.7, -0.6, 1)

// // console.log(mesh.position.length())
// // console.log(mesh.position.distanceTo(new THREE.Vector3(0, 1, 2)))
// // console.log(mesh.position.normalize())
// // console.log(mesh.position.length())
// // console.log(mesh.position.set(0.7, -0.6, 1))

// /**
//  * Scale objects
//  */
// // mesh.scale.x = 1
// // mesh.scale.y = 0.5
// // mesh.scale.z = 0.5
// mesh.scale.set(2, 0.5, 0.5)

// /**
//  * Rotation is Pi 3.14159
//  */
// mesh.rotation.reorder('YXZ')
// mesh.rotation.y = Math.PI * 0.25
// mesh.rotation.X = Math.PI * 0.25 



/**
 * Axes helper
 */
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)


/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.y = 1
// camera.position.x = 1
scene.add(camera)

// // console.log(mesh.position.distanceTo(camera.position))

// // camera.lookAt(new THREE.Vector3(3, 0, 0))
// camera.lookAt(mesh.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)