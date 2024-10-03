// Initialize scene, camera, and renderer
const scene = new THREE.Scene(); // Create a new scene

const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
); 
// Set up a perspective camera with field of view (75), aspect ratio (window width/height), near clipping plane (0.1), and far clipping plane (1000)

const renderer = new THREE.WebGLRenderer(); // Create a WebGL renderer
renderer.setSize(window.innerWidth, window.innerHeight); // Set the renderer's size to fill the window
document.body.appendChild(renderer.domElement); // Add the renderer's canvas element to the DOM

// Cube geometry and materials with textures
const geometry = new THREE.BoxGeometry(50, 50, 50); // Define the cube's geometry (width, height, depth)

// List of texture URLs to apply to the cube faces
const textures = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyAPPVmqblXn551AlONQa0DhpR1hBAoGkQqNiZOf8PKrwyESPYmL7C8irPClpDxRZqRbA&usqp=CAU",
  "https://www.woodenearth.com/cdn/shop/articles/toys-from-oak_1024x1024.png?v=1688291862",
  "https://hummingbirdtoys.in/cdn/shop/files/11602945e.jpg?v=1703831129&width=1500",
  "https://i.ebayimg.com/images/g/prMAAOSwmCFjK6XW/s-l400.png",
];

// Create a material for each texture using MeshBasicMaterial (no lighting effect needed)
const materials = textures.map(texture => new THREE.MeshBasicMaterial({ 
  map: new THREE.TextureLoader().load(texture) // Load each texture using the TextureLoader
}));

const cube = new THREE.Mesh(geometry, materials); // Create a mesh with the cube geometry and its materials (textures)
scene.add(cube); // Add the cube to the scene

// Set camera position
camera.position.z = 100; // Move the camera back so the cube is in view

// Auto-rotation function
const animate = () => {
  requestAnimationFrame(animate); // Request the next frame for animation
  cube.rotation.y += 0.01; // Continuously rotate the cube clockwise around the y-axis
  renderer.render(scene, camera); // Render the scene from the perspective of the camera
};

animate(); // Start the animation loop

// Initialize Orbit controls for manual rotation
const controls = new THREE.OrbitControls(camera, renderer.domElement); 
// Add controls to allow user interaction, enabling orbiting and zooming around the object

// Resize event listener for responsiveness
const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight; // Update camera's aspect ratio
  camera.updateProjectionMatrix(); // Apply the new aspect ratio to the camera's projection matrix
  renderer.setSize(window.innerWidth, window.innerHeight); // Adjust the renderer's size
};

window.addEventListener('resize', onWindowResize); // Listen for window resize events to keep the scene responsive
