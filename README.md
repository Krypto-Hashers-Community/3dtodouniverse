# Tuba's 3D TODO Universe

An immersive 3D TODO application with stunning visual effects, user authentication, and true stereoscopic 3D parallax effects.

## Live Demo

**[Try the Live App](https://3dtodouniverse.vercel.app/)**

## Screenshots
![image](https://github.com/user-attachments/assets/a741d215-e07e-41f4-bdff-c6b4e18e4582)
![image](https://github.com/user-attachments/assets/3dd0bfe3-771c-4f19-b812-c0f743ff7676)

![image](https://github.com/user-attachments/assets/ee44a0a2-6362-41ef-b72b-5810df9a8dfd)





Demo Account:
- **Username**: `demo`
- **Password**: `demo`

## Key Features

**Authentication System**
- User registration and login
- Persistent user accounts with localStorage
- Individual TODO lists per user
- Session management

**3D Graphics & Visual Effects**
- Animated 3D TODO cubes - Floating, rotating, glowing
- Dynamic starfield - 1000+ animated stars (400 on mobile)
- Real-time lighting - Ambient, directional, and colored point lights
- Particle effects - Wireframe overlays and emissive materials
- Smooth animations - 60fps hardware-accelerated rendering

**True Stereoscopic 3D**
- ParallaxBarrierEffect - Official Three.js implementation
- Enhanced fallback - Red-cyan anaglyph 3D effect
- Side-by-side rendering - For 3D displays and VR headsets
- Adjustable depth - Eye separation and focal length controls

**Mobile Optimization**
- Responsive design - Adapts to all screen sizes
- Touch controls - Double-tap canvas to toggle 3D mode
- Performance optimized - Reduced complexity on mobile devices
- iOS compatible - Prevents zoom, optimized input sizes

## Technologies Used

**Core Stack:**
- HTML5 - Semantic structure
- CSS3 - Advanced styling and animations
- JavaScript (ES6+) - Modern syntax and features
- WebGL - Hardware-accelerated 3D graphics

**3D Graphics:**
- Three.js v0.160.0 - 3D engine and rendering
- ParallaxBarrierEffect - Stereoscopic 3D rendering
- WebGL Shaders - Custom visual effects

## Quick Start


**Option 1: Run Locally**
```bash
# Clone the repository
git clone https://github.com/tubakhxn/3dtodouniverse.git

# Navigate to directory
cd 3dtodouniverse

# Open in browser (works with file:// protocol)
open index.html
```

**Option 3: Deploy Your Own**
1. Fork this repository
2. Connect to Vercel
3. Deploy with one click!

## Browser Support

| Browser | Desktop | Mobile |
|---------|---------|--------|
| Chrome  | Full | Full |
| Firefox | Full | Full |
| Safari  | Full | Full |
| Edge    | Full | Full |


