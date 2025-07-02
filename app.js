// Use global THREE object instead of ES6 imports
// THREE and OrbitControls are loaded via script tags

// Global variables
let scene, camera, renderer, parallaxEffect;
let particleSystem, starField;
let todoSpheres = [];
let planets = [];
let spaceStation;
let controls;
let audioContext, backgroundMusic;
let isAudioEnabled = true;
let currentUser = null;
let users = {};
let editingTodo = null;
let currentFilter = 'all';
let is3DSceneReady = false; // Add this to track 3D readiness

// 3D Effects state tracking
let is3DEffectsEnabled = false;
let parallaxBarrierEnabled = false;
let normalRenderer, parallaxRenderer;

// Performance monitoring
let performanceStats = {
    loadStart: performance.now(),
    loadEnd: null,
    fps: 0,
    frameCount: 0,
    lastFrameTime: performance.now()
};

// Initialize the application - Remove async/await completely
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    const startTime = performance.now();
    
    // Show loading screen instantly
    showLoadingScreen();
    
    try {
        // Do everything super fast in sequence
        loadUserData();
        updateLoadingProgress(25, 'Data loaded!');
        
        initializeUI();
        updateLoadingProgress(50, 'Interface ready!');
        
        // Ultra-minimal 3D scene (no await, just create)
        initializeMinimal3DScene();
        updateLoadingProgress(75, 'Environment ready!');
        
        // Start animation immediately
        animate();
        updateLoadingProgress(100, 'Complete!');
        
        // Log performance
        console.log(`Ultra-fast load: ${performance.now() - startTime}ms`);
        
        // Hide loading screen and show app immediately
        hideLoadingScreen();
        
        // Load everything immediately (no delays)
        progressiveLoad3DElements();
        setTimeout(() => initializeAudio(), 100);
        
    } catch (error) {
        console.error('Initialization error:', error);
        // Force show the app even if there's an error
        hideLoadingScreen();
    }
}

function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'flex';
    
    // Show immediate progress
    updateLoadingProgress(10, '⚡ Initializing...');
}

function updateLoadingProgress(percentage, message) {
    const progressBar = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');
    
    if (progressBar) {
        progressBar.style.width = percentage + '%';
        progressBar.style.transition = 'width 0.3s ease';
    }
    
    if (loadingText && message) {
        loadingText.textContent = message;
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const authOverlay = document.getElementById('auth-overlay');
    
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        // Hide it completely after a very short delay
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 100);
    }
    
    // Immediately show auth overlay
    if (authOverlay) {
        authOverlay.style.display = 'flex';
        authOverlay.classList.add('active');
        // Force visibility
        setTimeout(() => {
            authOverlay.style.opacity = '1';
            authOverlay.style.visibility = 'visible';
        }, 50);
    }
}

function initializeMinimal3DScene() {
    // Create scene (instant)
    scene = new THREE.Scene();
    
    // Create camera (instant)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 30);
    
    // Create normal renderer
    normalRenderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('threejs-canvas'),
        antialias: false,
        alpha: false, // Disabled for speed
        powerPreference: "high-performance"
    });
    normalRenderer.setSize(window.innerWidth, window.innerHeight);
    normalRenderer.setPixelRatio(1); // Fixed to 1 for maximum performance
    
    // Create ParallaxBarrierEffect renderer
    if (typeof THREE.ParallaxBarrierEffect !== 'undefined') {
        parallaxEffect = new THREE.ParallaxBarrierEffect(normalRenderer);
        parallaxEffect.setSize(window.innerWidth, window.innerHeight);
        console.log('✅ ParallaxBarrierEffect initialized successfully');
    } else {
        console.error('❌ ParallaxBarrierEffect not found! Check if script is loaded.');
        // Fallback: use normal renderer
        parallaxEffect = normalRenderer;
    }
    
    // Set the active renderer to normal by default
    renderer = normalRenderer;
    
    // Single basic light (instant)
    const light = new THREE.AmbientLight(0x404040, 1);
    scene.add(light);
    
    // Ultra-basic controls (minimal features)
    controls = new THREE.OrbitControls(camera, normalRenderer.domElement);
    controls.enableDamping = false;
    controls.autoRotate = false;
    controls.maxDistance = 100;
    controls.minDistance = 10;
    
    // Just 50 stars for ultra-fast loading
    createUltraFastStarField();
    
    // Create 3D TODO list structure
    create3DTodoListStructure();
    
    // Mark 3D scene as ready immediately!
    is3DSceneReady = true;
    
    // Handle resize
    window.addEventListener('resize', onWindowResize);
}

function createUltraFastStarField() {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
    
    const positions = [];
    // Only 50 stars for ultra-fast loading
    for (let i = 0; i < 50; i++) {
        positions.push(
            (Math.random() - 0.5) * 500,
            (Math.random() - 0.5) * 500,
            (Math.random() - 0.5) * 500
        );
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    starField = new THREE.Points(geometry, material);
    scene.add(starField);
}

// Progressive loading function for additional 3D elements
function progressiveLoad3DElements() {
    console.log('🚀 Loading advanced 3D elements instantly...');
    
    // Instantly apply all enhancements without delay
    scene.fog = new THREE.Fog(0x000511, 50, 1000);
    camera.position.set(0, 50, 100);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.maxDistance = 500;
    
    // Add floating animation to camera
    createCameraFloatingAnimation();
    
    createEnhancedStarField();
    createEnhancedLighting();
    createNebula();
    createPlanets();
    createSpaceStation();
    createAsteroidField();
    createParticleSystem();
    createInteractiveElements();
    
    // Add 3D environment animations
    createEnvironmentAnimations();
    
    console.log('✅ All 3D enhancements loaded instantly!');
}

function createCameraFloatingAnimation() {
    // Smooth camera floating animation
    const originalPosition = { x: 0, y: 50, z: 100 };
    
    setInterval(() => {
        const time = Date.now() * 0.001;
        if (!controls.autoRotate) return; // Only animate when auto-rotate is on
        
        camera.position.y = originalPosition.y + Math.sin(time * 0.5) * 10;
        camera.position.x = originalPosition.x + Math.cos(time * 0.3) * 5;
    }, 16); // 60fps animation
}

function createEnvironmentAnimations() {
    // Animate nebula clouds
    const nebulaClouds = scene.children.filter(child => 
        child.type === 'Group' && child.children.some(c => c.geometry?.type === 'PlaneGeometry')
    );
    
    setInterval(() => {
        const time = Date.now() * 0.001;
        nebulaClouds.forEach((cloud, index) => {
            if (cloud.children) {
                cloud.rotation.y += 0.002 * (index + 1);
                cloud.rotation.x += 0.001 * (index + 1);
                cloud.position.y += Math.sin(time + index) * 0.5;
            }
        });
    }, 16);
    
    // Add twinkling effect to stars
    if (starField && starField.material) {
        setInterval(() => {
            const time = Date.now() * 0.001;
            starField.material.opacity = 0.6 + Math.sin(time * 2) * 0.2;
        }, 50);
    }
}

function createEnhancedStarField() {
    // Remove basic starfield
    if (starField) {
        scene.remove(starField);
    }
    
    // Create enhanced starfield with colors
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2,
        transparent: true,
        opacity: 0.8,
        vertexColors: true
    });
    
    const starsVertices = [];
    const starsColors = [];
    
    // Enhanced starfield with 5000 stars (still less than original 10000)
    for (let i = 0; i < 5000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        
        starsVertices.push(x, y, z);
        
        // Random star colors
        const color = new THREE.Color();
        color.setHSL(Math.random(), 0.5, 0.5 + Math.random() * 0.5);
        starsColors.push(color.r, color.g, color.b);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    starsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starsColors, 3));
    
    starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
}

function createEnhancedLighting() {
    // Remove basic lights and add enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    // Main directional light (like sun)
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(100, 100, 50);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024; // Reduced from 2048 for performance
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 500;
    mainLight.shadow.camera.left = -100;
    mainLight.shadow.camera.right = 100;
    mainLight.shadow.camera.top = 100;
    mainLight.shadow.camera.bottom = -100;
    scene.add(mainLight);
    
    // Colored point lights for atmosphere (reduced count)
    const lights = [
        { color: 0x00ffff, position: [-50, 30, 50], intensity: 0.8 },
        { color: 0xff00ff, position: [50, -30, -50], intensity: 0.8 }
    ];
    
    lights.forEach(lightData => {
        const light = new THREE.PointLight(lightData.color, lightData.intensity, 200);
        light.position.set(...lightData.position);
        scene.add(light);
        
        // Add light helper sphere
        const lightSphere = new THREE.Mesh(
            new THREE.SphereGeometry(2, 8, 8),
            new THREE.MeshBasicMaterial({ color: lightData.color, transparent: true, opacity: 0.5 })
        );
        lightSphere.position.copy(light.position);
        scene.add(lightSphere);
    });
}

function createNebula() {
    // Create nebula clouds using multiple sprites (reduced count)
    const nebulaGroup = new THREE.Group();
    
    for (let i = 0; i < 8; i++) { // Reduced from 20 to 8
        const nebulaGeometry = new THREE.PlaneGeometry(100, 100);
        const nebulaMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(Math.random(), 0.7, 0.3),
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide
        });
        
        const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
        nebula.position.set(
            (Math.random() - 0.5) * 1000,
            (Math.random() - 0.5) * 500,
            (Math.random() - 0.5) * 1000
        );
        nebula.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        nebulaGroup.add(nebula);
    }
    
    scene.add(nebulaGroup);
}

function createPlanets() {
    const planetData = [
        { radius: 15, distance: 200, color: 0xff6b6b, speed: 0.001 },
        { radius: 12, distance: 300, color: 0x4ecdc4, speed: 0.0008 },
        { radius: 18, distance: 450, color: 0x45b7d1, speed: 0.0006 },
        { radius: 10, distance: 150, color: 0xf9ca24, speed: 0.0012 }
    ];
    
    planetData.forEach((data, index) => {
        const planetGeometry = new THREE.SphereGeometry(data.radius, 16, 16); // Reduced from 32,32 to 16,16
        const planetMaterial = new THREE.MeshPhongMaterial({
            color: data.color,
            shininess: 30,
            transparent: true,
            opacity: 0.9
        });
        
        const planet = new THREE.Mesh(planetGeometry, planetMaterial);
        planet.position.set(data.distance, 0, 0);
        planet.castShadow = true;
        planet.receiveShadow = true;
        
        // Add ring system to some planets (simplified)
        if (index % 2 === 0) {
            const ringGeometry = new THREE.RingGeometry(data.radius * 1.5, data.radius * 2, 16); // Reduced from 32 to 16
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: data.color,
                transparent: true,
                opacity: 0.3,
                side: THREE.DoubleSide
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2;
            planet.add(ring);
        }
        
        // Create orbital path (simplified)
        const orbitPath = new THREE.RingGeometry(data.distance - 1, data.distance + 1, 32); // Reduced from 64 to 32
        const orbitMaterial = new THREE.MeshBasicMaterial({
            color: 0x333333,
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide
        });
        const orbit = new THREE.Mesh(orbitPath, orbitMaterial);
        orbit.rotation.x = Math.PI / 2;
        scene.add(orbit);
        
        planets.push({
            mesh: planet,
            distance: data.distance,
            speed: data.speed,
            angle: Math.random() * Math.PI * 2
        });
        
        scene.add(planet);
    });
}

function createSpaceStation() {
    const stationGroup = new THREE.Group();
    
    // Main hub
    const hubGeometry = new THREE.SphereGeometry(8, 16, 16);
    const hubMaterial = new THREE.MeshPhongMaterial({
        color: 0x888888,
        shininess: 100
    });
    const hub = new THREE.Mesh(hubGeometry, hubMaterial);
    stationGroup.add(hub);
    
    // Rotating rings
    for (let i = 0; i < 3; i++) {
        const ringGeometry = new THREE.TorusGeometry(15 + i * 5, 2, 8, 16);
        const ringMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ffff,
            emissive: 0x003333
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        stationGroup.add(ring);
    }
    
    // Docking bays
    for (let i = 0; i < 6; i++) {
        const bayGeometry = new THREE.BoxGeometry(2, 2, 4);
        const bayMaterial = new THREE.MeshPhongMaterial({
            color: 0xff6600,
            emissive: 0x331100
        });
        const bay = new THREE.Mesh(bayGeometry, bayMaterial);
        
        const angle = (i / 6) * Math.PI * 2;
        bay.position.set(Math.cos(angle) * 12, Math.sin(angle) * 12, 0);
        bay.lookAt(0, 0, 0);
        stationGroup.add(bay);
    }
    
    stationGroup.position.set(0, 0, 0);
    spaceStation = stationGroup;
    scene.add(stationGroup);
}

function createAsteroidField() {
    const asteroidGroup = new THREE.Group();
    
    // Reduced from 100 to 30 asteroids for better performance
    for (let i = 0; i < 30; i++) {
        const size = Math.random() * 3 + 0.5;
        const asteroidGeometry = new THREE.IcosahedronGeometry(size, 0); // Reduced detail level
        const asteroidMaterial = new THREE.MeshPhongMaterial({
            color: 0x666666,
            flatShading: true
        });
        
        const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
        asteroid.position.set(
            (Math.random() - 0.5) * 1000,
            (Math.random() - 0.5) * 200,
            (Math.random() - 0.5) * 1000
        );
        asteroid.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        
        asteroidGroup.add(asteroid);
    }
    
    scene.add(asteroidGroup);
}

function createInteractiveElements() {
    // This will be used to create 3D representations of todos
    // Each todo will be a floating holographic panel in space
}

function createParticleSystem() {
    const particleCount = 50; // Reduced from 200 to 50
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        document.getElementById('particles-container').appendChild(particle);
        particles.push(particle);
    }
    
    // Animate particles
    setInterval(() => {
        particles.forEach(particle => {
            if (Math.random() < 0.01) { // 1% chance to reset position
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
            }
        });
    }, 100);
}

function initializeAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create simple background ambience
        createBackgroundAmbience();
        
        // Audio control button
        document.getElementById('audio-toggle').addEventListener('click', toggleAudio);
    } catch (error) {
        console.log('Audio not supported');
        isAudioEnabled = false;
    }
}

function createBackgroundAmbience() {
    if (!audioContext) return;
    
    // Create a simple ambient sound using oscillators
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator1.type = 'sine';
    oscillator1.frequency.setValueAtTime(60, audioContext.currentTime);
    oscillator2.type = 'sine';
    oscillator2.frequency.setValueAtTime(80, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (isAudioEnabled) {
        oscillator1.start();
        oscillator2.start();
    }
}

function toggleAudio() {
    isAudioEnabled = !isAudioEnabled;
    const audioIcon = document.getElementById('audio-icon');
    audioIcon.textContent = isAudioEnabled ? 'AUDIO ON' : 'AUDIO OFF';
    
    if (audioContext) {
        if (isAudioEnabled) {
            audioContext.resume();
        } else {
            audioContext.suspend();
        }
    }
}

function initializeUI() {
    console.log('Initializing UI...');
    
    // Add a small delay to ensure DOM is fully ready
    setTimeout(() => {
        // Auth form handlers
        setupAuthForms();
        
        // Todo functionality
        setupTodoFunctions();
        
        // Filter controls
        setupFilterControls();
        
        // 3D view toggle
        const toggle3DBtn = document.getElementById('toggle-3d');
        if (toggle3DBtn) {
            toggle3DBtn.addEventListener('click', toggle3DView);
        }
        
        console.log('UI initialization complete');
    }, 100);
}

function setupAuthForms() {
    console.log('Setting up auth forms...');
    
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    console.log('Found tab buttons:', tabBtns.length);
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            switchAuthTab(tab);
        });
    });
    
    // Demo login button
    const demoBtn = document.getElementById('demo-login');
    if (demoBtn) {
        demoBtn.addEventListener('click', () => {
            console.log('Demo login clicked');
            const usernameInput = document.getElementById('login-username');
            const passwordInput = document.getElementById('login-password');
            
            if (usernameInput && passwordInput) {
                usernameInput.value = 'demo';
                passwordInput.value = 'demo';
                
                // Trigger login immediately
                login('demo');
            }
        });
    }
    
    // Login form
    const loginForm = document.getElementById('login-form');
    console.log('Login form found:', !!loginForm);
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Login form submitted');
            
            const usernameInput = document.getElementById('login-username');
            const passwordInput = document.getElementById('login-password');
            
            if (!usernameInput || !passwordInput) {
                console.error('Login inputs not found');
                showNotification('Form inputs not found. Please refresh the page.', 'error');
                return;
            }
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value;
            
            console.log('Login attempt:', username);
            
            // For demo purposes, allow any username/password combination
            // If user doesn't exist, create it automatically
            if (!users[username]) {
                users[username] = {
                    password: password,
                    email: `${username}@demo.com`,
                    todos: [],
                    createdAt: new Date().toISOString()
                };
                saveUserData();
                showNotification(`Welcome ${username}! Account created automatically.`, 'success');
            } else if (users[username].password !== password) {
                showNotification('Incorrect password.', 'error');
                return;
            }
            
            login(username);
        });
    }
    
    // Register form
    const registerForm = document.getElementById('register-form');
    console.log('Register form found:', !!registerForm);
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Register form submitted');
            
            const usernameInput = document.getElementById('register-username');
            const emailInput = document.getElementById('register-email');
            const passwordInput = document.getElementById('register-password');
            const confirmInput = document.getElementById('register-confirm');
            
            if (!usernameInput || !emailInput || !passwordInput || !confirmInput) {
                console.error('Register inputs not found');
                showNotification('Form inputs not found. Please refresh the page.', 'error');
                return;
            }
            
            const username = usernameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmInput.value;
            
            console.log('Registration attempt:', username);
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match.', 'error');
                return;
            }
            
            if (users[username]) {
                showNotification('Username already exists.', 'error');
                return;
            }
            
            users[username] = {
                password: password,
                email: email,
                todos: [],
                createdAt: new Date().toISOString()
            };
            
            saveUserData();
            showNotification('Registration successful!', 'success');
            switchAuthTab('login');
            
            // Clear form
            registerForm.reset();
        });
    } else {
        console.error('Register form not found');
    }
}

function setupTodoFunctions() {
    // Add todo
    const addBtn = document.getElementById('add-todo-btn');
    const newInput = document.getElementById('new-todo-input');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (addBtn) {
        addBtn.addEventListener('click', addTodo);
    }
    
    if (newInput) {
        newInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}

function setupFilterControls() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                setFilter(filter);
            });
        }
    });
}

function switchAuthTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    // Update forms
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.toggle('active', form.id === `${tab}-form`);
    });
}

function login(username) {
    currentUser = username;
    document.getElementById('current-user').textContent = username;
    
    // Hide auth overlay
    document.getElementById('auth-overlay').classList.remove('active');
    
    // Show todo interface
    setTimeout(() => {
        document.getElementById('todo-interface').classList.add('active');
        renderTodos();
        updateStats();
        
        // Create 3D spheres for all existing todos
        if (users[currentUser] && users[currentUser].todos) {
            users[currentUser].todos.forEach(todo => {
                create3DTodo(todo);
            });
        }
    }, 500);
    
    showNotification(`Welcome back, ${username}!`, 'success');
}

function logout() {
    currentUser = null;
    
    // Remove all 3D todo spheres
    todoSpheres.forEach(sphere => {
        scene.remove(sphere);
    });
    todoSpheres.length = 0; // Clear the array
    
    // Hide todo interface
    document.getElementById('todo-interface').classList.remove('active');
    
    // Show auth overlay
    setTimeout(() => {
        document.getElementById('auth-overlay').classList.add('active');
        // Clear forms
        document.getElementById('login-form').reset();
        document.getElementById('register-form').reset();
        switchAuthTab('login');
    }, 500);
    
    showNotification('Logged out successfully.', 'info');
}

function addTodo() {
    const input = document.getElementById('new-todo-input');
    const text = input.value.trim();
    
    if (!text) {
        showNotification('Please enter a mission description.', 'warning');
        return;
    }
    
    const todo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    users[currentUser].todos.push(todo);
    saveUserData();
    
    input.value = '';
    renderTodos();
    updateStats();
    
    // Create 3D representation
    create3DTodo(todo);
    
    showNotification('Mission added successfully!', 'success');
}

function toggleTodo(id) {
    const todo = users[currentUser].todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveUserData();
        renderTodos();
        updateStats();
        
        // Update 3D representation
        update3DTodo(todo);
        
        const status = todo.completed ? 'completed' : 'reactivated';
        showNotification(`Mission ${status}!`, 'success');
    }
}

function editTodo(id) {
    editingTodo = id;
    renderTodos();
}

function saveTodo(id, newText) {
    const todo = users[currentUser].todos.find(t => t.id === id);
    if (todo && newText.trim()) {
        todo.text = newText.trim();
        saveUserData();
        showNotification('Mission updated!', 'success');
    }
    editingTodo = null;
    renderTodos();
}

function deleteTodo(id) {
    if (confirm('Are you sure you want to delete this mission?')) {
        users[currentUser].todos = users[currentUser].todos.filter(t => t.id !== id);
        saveUserData();
        renderTodos();
        updateStats();
        
        // Remove 3D representation
        remove3DTodo(id);
        
        showNotification('Mission deleted.', 'info');
    }
}

function setFilter(filter) {
    currentFilter = filter;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    const emptyState = document.getElementById('empty-state');
    const todos = users[currentUser].todos;
    
    // Filter todos
    let filteredTodos = todos;
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(t => t.completed);
    }
    
    if (filteredTodos.length === 0) {
        todoList.innerHTML = '';
        emptyState.classList.add('active');
        return;
    }
    
    emptyState.classList.remove('active');
    
    todoList.innerHTML = filteredTodos.map(todo => {
        const isEditing = editingTodo === todo.id;
        
        return `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} 
                       onchange="toggleTodo(${todo.id})">
                ${isEditing ? `
                    <input type="text" class="todo-text editing" value="${todo.text}" 
                           id="edit-input-${todo.id}" onkeypress="if(event.key==='Enter') saveTodoFromInput(${todo.id})">
                ` : `
                    <span class="todo-text">${todo.text}</span>
                `}
                <div class="todo-actions">
                    ${isEditing ? `
                        <button class="action-btn save-btn" onclick="saveTodoFromInput(${todo.id})">SAVE</button>
                        <button class="action-btn cancel-btn" onclick="cancelEdit()">CANCEL</button>
                    ` : `
                        <button class="action-btn edit-btn" onclick="editTodo(${todo.id})">EDIT</button>
                        <button class="action-btn delete-btn" onclick="deleteTodo(${todo.id})">DELETE</button>
                    `}
                </div>
            </li>
        `;
    }).join('');
    
    // Focus on edit input if editing
    if (editingTodo) {
        setTimeout(() => {
            const editInput = document.getElementById(`edit-input-${editingTodo}`);
            if (editInput) {
                editInput.focus();
                editInput.select();
            }
        }, 50);
    }
}

function saveTodoFromInput(id) {
    const input = document.getElementById(`edit-input-${id}`);
    if (input) {
        saveTodo(id, input.value);
    }
}

function cancelEdit() {
    editingTodo = null;
    renderTodos();
}

function updateStats() {
    const todos = users[currentUser].todos;
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const remaining = total - completed;
    
    document.getElementById('total-todos').textContent = total;
    document.getElementById('completed-todos').textContent = completed;
    document.getElementById('remaining-todos').textContent = remaining;
}

function create3DTodo(todo) {
    // Create a holographic panel for the todo in 3D space
    const panel = createHolographicPanel(todo);
    todoSpheres.push(panel);
    scene.add(panel);
    
    // If parallax barrier is enabled, add depth immediately
    if (parallaxBarrierEnabled) {
        addDepthToTodoElements();
    }
}

function update3DTodo(todo) {
    // Update the 3D representation when todo status changes
    const sphere = todoSpheres.find(p => p.userData.id === todo.id);
    if (sphere && sphere.children.length > 0) {
        // Update main sphere (first child)
        if (sphere.children[0] && sphere.children[0].material) {
            sphere.children[0].material.color.setHex(todo.completed ? 0x00ff00 : 0x00ffff);
            sphere.children[0].material.opacity = todo.completed ? 0.7 : 0.9;
            sphere.children[0].material.emissive.setHex(todo.completed ? 0x002200 : 0x002222);
        }
        
        // Update ring (second child)
        if (sphere.children[1] && sphere.children[1].material) {
            sphere.children[1].material.color.setHex(todo.completed ? 0x00ff00 : 0x00ffff);
        }
        
        // Update particles (fourth child)
        if (sphere.children[3] && sphere.children[3].material) {
            const colors = sphere.children[3].geometry.attributes.color.array;
            const newColor = new THREE.Color(todo.completed ? 0x00ff00 : 0x00ffff);
            for (let i = 0; i < colors.length; i += 3) {
                colors[i] = newColor.r;
                colors[i + 1] = newColor.g;
                colors[i + 2] = newColor.b;
            }
            sphere.children[3].geometry.attributes.color.needsUpdate = true;
        }
        
        // Add completion animation
        if (todo.completed) {
            // Scale pulse animation for completed todos
            const originalScale = sphere.scale.x;
            sphere.scale.setScalar(originalScale * 1.3);
            setTimeout(() => {
                sphere.scale.setScalar(originalScale);
            }, 300);
        }
    }
}

function remove3DTodo(id) {
    // Remove 3D representation
    const panelIndex = todoSpheres.findIndex(p => p.userData.id === id);
    if (panelIndex !== -1) {
        scene.remove(todoSpheres[panelIndex]);
        todoSpheres.splice(panelIndex, 1);
    }
}

function createHolographicPanel(todo) {
    const group = new THREE.Group();
    group.userData = { id: todo.id, createdTime: Date.now() };
    
    // Create floating sphere instead of flat panel
    const sphereGeometry = new THREE.SphereGeometry(6, 16, 16);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: todo.completed ? 0x00ff00 : 0x00ffff,
        transparent: true,
        opacity: todo.completed ? 0.7 : 0.9,
        shininess: 100,
        emissive: todo.completed ? 0x002200 : 0x002222
    });
    
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    group.add(sphere);
    
    // Add outer glow ring
    const ringGeometry = new THREE.RingGeometry(8, 10, 16);
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: todo.completed ? 0x00ff00 : 0x00ffff,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);
    
    // Add animated border frame around sphere
    const wireframeGeometry = new THREE.SphereGeometry(6.5, 8, 8);
    const wireframeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.4,
        wireframe: true
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    group.add(wireframe);
    
    // Add glowing particles around the sphere
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = [];
    const particleColors = [];
    
    for (let i = 0; i < 30; i++) {
        // Create particles in a sphere around the main sphere
        const radius = 12 + Math.random() * 8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        particlePositions.push(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
        );
        
        const color = new THREE.Color(todo.completed ? 0x00ff00 : 0x00ffff);
        particleColors.push(color.r, color.g, color.b);
    }
    
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 1.5,
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);
    
    // Position with entrance animation
    const angle = Math.random() * Math.PI * 2;
    const radius = 50 + Math.random() * 100;
    const height = (Math.random() - 0.5) * 100;
    
    // Start far away and animate to position
    group.position.set(
        Math.cos(angle) * radius * 3,
        height,
        Math.sin(angle) * radius * 3
    );
    
    // Animate to final position
    const targetPosition = {
        x: Math.cos(angle) * radius,
        y: height,
        z: Math.sin(angle) * radius
    };
    
    // Smooth entrance animation
    const animatePanelEntrance = () => {
        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        const startPos = { ...group.position };
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
            
            group.position.x = startPos.x + (targetPosition.x - startPos.x) * easeProgress;
            group.position.y = startPos.y + (targetPosition.y - startPos.y) * easeProgress;
            group.position.z = startPos.z + (targetPosition.z - startPos.z) * easeProgress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    };
    
    setTimeout(animatePanelEntrance, 100);
    
    return group;
}

function toggle3DView() {
    console.log('🎯 Toggle 3D view clicked');
    console.log('Current parallaxBarrierEnabled:', parallaxBarrierEnabled);
    console.log('parallaxEffect available:', !!parallaxEffect);
    console.log('normalRenderer available:', !!normalRenderer);
    
    // 3D scene is always ready after initialization
    if (!scene || !camera || !controls) {
        console.error('3D components missing');
        return;
    }
    
    // Update button text immediately for visual feedback
    const toggle3DBtn = document.getElementById('toggle-3d');
    if (toggle3DBtn) {
        toggle3DBtn.style.opacity = '0.5';
        setTimeout(() => {
            toggle3DBtn.style.opacity = '1';
        }, 200);
    }
    
    // Toggle between parallax barrier effect and normal view
    if (!parallaxBarrierEnabled) {
        console.log('🌟 Enabling ParallaxBarrier...');
        
        // Enable ParallaxBarrierEffect
        enableParallaxBarrier();
        
        // Switch to parallax renderer
        if (parallaxEffect && parallaxEffect !== normalRenderer) {
            renderer = parallaxEffect;
            console.log('✅ Switched to ParallaxBarrierEffect renderer');
        } else {
            console.warn('⚠️ ParallaxBarrierEffect not available, using normal renderer');
            renderer = normalRenderer;
        }
        
        // Enable auto-rotate for better parallax effect
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        
        // Position camera for optimal parallax viewing
        camera.position.set(0, 0, 50);
        controls.target.set(0, 0, 0);
        
        showNotification('3D Parallax Barrier Effect Active! Look for depth separation in the TODO spheres and panel.', 'success');
        
        if (toggle3DBtn) {
            toggle3DBtn.innerHTML = '<span class="btn-icon">2D</span><span>NORMAL VIEW</span>';
        }
    } else {
        console.log('🔄 Disabling ParallaxBarrier...');
        
        // Disable ParallaxBarrierEffect
        disableParallaxBarrier();
        
        // Switch back to normal renderer
        renderer = normalRenderer;
        console.log('✅ Switched back to normal renderer');
        
        // Disable auto-rotate
        controls.autoRotate = false;
        camera.position.set(0, 10, 30);
        
        showNotification('Normal 3D View Mode', 'success');
        
        if (toggle3DBtn) {
            toggle3DBtn.innerHTML = '<span class="btn-icon">3D</span><span>3D VIEW</span>';
        }
    }
    controls.update();
}

// Add visual indicator for parallax mode
function updateParallaxIndicator() {
    // Remove existing indicator
    const existingIndicator = document.getElementById('parallax-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    if (parallaxBarrierEnabled) {
        const indicator = document.createElement('div');
        indicator.id = 'parallax-indicator';
        indicator.innerHTML = '3D PARALLAX BARRIER ACTIVE';
        indicator.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0, 255, 255, 0.2);
            border: 2px solid #00ffff;
            color: #00ffff;
            padding: 10px 20px;
            border-radius: 8px;
            font-family: inherit;
            font-weight: bold;
            z-index: 1000;
            backdrop-filter: blur(10px);
            animation: pulse 2s infinite;
        `;
        
        // Add pulsing animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% { opacity: 0.7; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(indicator);
    }
}

function showNotification(message, type = 'info') {
    // Create and show a notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: rgba(0,0,0,0.8);
        border: 1px solid ${type === 'error' ? '#ff6666' : type === 'success' ? '#66ff66' : type === 'warning' ? '#ffaa00' : '#00ffff'};
        color: ${type === 'error' ? '#ff6666' : type === 'success' ? '#66ff66' : type === 'warning' ? '#ffaa00' : '#00ffff'};
        border-radius: 8px;
        z-index: 1000;
        font-family: inherit;
        backdrop-filter: blur(10px);
        box-shadow: 0 0 20px ${type === 'error' ? 'rgba(255,102,102,0.3)' : type === 'success' ? 'rgba(102,255,102,0.3)' : type === 'warning' ? 'rgba(255,170,0,0.3)' : 'rgba(0,255,255,0.3)'};
        animation: slideIn 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

function loadUserData() {
    const savedData = localStorage.getItem('3d-todo-universe-data');
    if (savedData) {
        users = JSON.parse(savedData);
    } else {
        // Create demo accounts
        users = {
            'demo': {
                password: 'demo',
                email: 'demo@3dtodo.com',
                todos: [
                    {
                        id: 1,
                        text: 'Explore the 3D Universe',
                        completed: false,
                        createdAt: new Date().toISOString()
                    },
                    {
                        id: 2,
                        text: 'Test floating spheres',
                        completed: true,
                        createdAt: new Date().toISOString()
                    },
                    {
                        id: 3,
                        text: 'Click 3D VIEW button',
                        completed: false,
                        createdAt: new Date().toISOString()
                    },
                    {
                        id: 4,
                        text: 'Navigate with mouse',
                        completed: false,
                        createdAt: new Date().toISOString()
                    },
                    {
                        id: 5,
                        text: 'Complete this mission',
                        completed: true,
                        createdAt: new Date().toISOString()
                    }
                ],
                createdAt: new Date().toISOString()
            },
            'tuba': {
                password: 'password',
                email: 'tuba@3dtodo.com',
                todos: [],
                createdAt: new Date().toISOString()
            }
        };
        saveUserData();
    }
}

function saveUserData() {
    localStorage.setItem('3d-todo-universe-data', JSON.stringify(users));
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    // Update both renderers
    if (normalRenderer) {
        normalRenderer.setSize(window.innerWidth, window.innerHeight);
    }
    if (parallaxEffect) {
        parallaxEffect.setSize(window.innerWidth, window.innerHeight);
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    // Track performance
    trackPerformance();
    
    const time = Date.now() * 0.001;
    
    // Only animate if objects exist (performance optimization)
    if (planets.length > 0) {
        planets.forEach(planet => {
            planet.angle += planet.speed;
            planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
            planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
            planet.mesh.rotation.y += 0.01;
        });
    }
    
    // Animate space station only if it exists
    if (spaceStation) {
        spaceStation.rotation.y += 0.005;
        spaceStation.children.forEach((child, index) => {
            if (child.geometry instanceof THREE.TorusGeometry) {
                child.rotation.z += 0.01 * (index + 1);
            }
        });
    }
    
    // Animate star field (always exists)
    if (starField) {
        starField.rotation.y += 0.0002;
        starField.rotation.x += 0.0001;
    }
    
    // Animate todo spheres with enhanced floating motion
    if (todoSpheres.length > 0) {
        todoSpheres.forEach((sphere, index) => {
            // Rotate the entire sphere group
            sphere.rotation.y += 0.02;
            sphere.rotation.x += 0.01;
            
            // Complex floating motion
            const floatSpeed = 0.5 + (index * 0.1);
            const floatHeight = 2 + (index * 0.5);
            const circleRadius = 3;
            
            sphere.position.y += Math.sin(time * floatSpeed + index) * floatHeight;
            sphere.position.x += Math.cos(time * floatSpeed * 0.7 + index) * circleRadius;
            sphere.position.z += Math.sin(time * floatSpeed * 0.5 + index) * circleRadius;
            
            // Animate internal components
            if (sphere.children.length > 0) {
                // Animate the main sphere (first child)
                if (sphere.children[0]) {
                    sphere.children[0].rotation.y += 0.03;
                    sphere.children[0].rotation.z += 0.02;
                }
                
                // Animate the ring (second child)
                if (sphere.children[1]) {
                    sphere.children[1].rotation.z += 0.05;
                    const pulseScale = 1 + Math.sin(time * 2 + index) * 0.2;
                    sphere.children[1].scale.setScalar(pulseScale);
                }
                
                // Animate wireframe (third child)
                if (sphere.children[2]) {
                    sphere.children[2].rotation.x += 0.04;
                    sphere.children[2].rotation.y -= 0.03;
                }
                
                // Animate particles (fourth child)
                if (sphere.children[3] && sphere.children[3].geometry) {
                    const positions = sphere.children[3].geometry.attributes.position.array;
                    for (let i = 0; i < positions.length; i += 3) {
                        positions[i] += Math.sin(time * 3 + i) * 0.1; // x
                        positions[i + 1] += Math.cos(time * 2 + i) * 0.1; // y
                        positions[i + 2] += Math.sin(time * 4 + i) * 0.1; // z
                    }
                    sphere.children[3].geometry.attributes.position.needsUpdate = true;
                }
            }
        });
    }
    
    // Track performance
    trackPerformance();
    
    // Update controls
    controls.update();
    
    // Render scene
    renderer.render(scene, camera);
}

// Track performance
function trackPerformance() {
    performanceStats.frameCount++;
    const now = performance.now();
    const delta = now - performanceStats.lastFrameTime;
    
    if (delta >= 1000) { // Update FPS every second
        performanceStats.fps = Math.round((performanceStats.frameCount * 1000) / delta);
        performanceStats.frameCount = 0;
        performanceStats.lastFrameTime = now;
        
        // Automatically adjust quality based on performance
        if (performanceStats.fps < 30 && renderer) {
            // Reduce quality for better performance
            renderer.setPixelRatio(Math.min(window.devicePixelRatio * 0.5, 1));
            if (controls) {
                controls.autoRotateSpeed = 0.2; // Slower rotation
            }
        }
    }
}

// Advanced 3D Effects System
let stereoscopicRenderer = null;
let effectComposer = null;

function enableAdvanced3DEffects() {
    if (is3DEffectsEnabled) return;
    
    console.log('✨ Enabling Ultra-Advanced 3D Effects...');
    is3DEffectsEnabled = true;
    
    // Enable advanced renderer settings
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Add spectacular lighting effects
    addSpectacularLighting();
    
    // Add professional 3D models
    addProfessional3DModels();
    
    // Enhanced camera controls
    enhanceCameraControls();
    
    showNotification('🚀 Professional 3D Mode Activated!', 'success');
}

function enableParallaxBarrier() {
    if (parallaxBarrierEnabled) return;
    
    console.log('🎯 Enabling True ParallaxBarrierEffect...');
    parallaxBarrierEnabled = true;
    
    // Configure the parallax barrier effect
    if (parallaxEffect && parallaxEffect.setEyeSeparation) {
        // Set up the parallax parameters for optimal 3D effect
        parallaxEffect.setEyeSeparation(0.064); // 64mm average human eye separation
        parallaxEffect.setFocalLength(0.5); // Adjust for comfortable viewing
        console.log('✅ ParallaxBarrier parameters configured');
    } else {
        console.warn('⚠️ ParallaxBarrier parameters not available');
    }
    
    // Add depth to existing elements
    addDepthToTodoElements();
    
    // Add special lighting for 3D effect
    addDepthLighting();
    
    // Make the effect more visible by enhancing scene elements
    enhanceSceneFor3D();
    
    // Update visual indicator
    updateParallaxIndicator();
    
    showNotification('ParallaxBarrier 3D Mode Active!', 'success');
}

function disableParallaxBarrier() {
    if (!parallaxBarrierEnabled) return;
    
    console.log('🔄 Disabling ParallaxBarrierEffect...');
    parallaxBarrierEnabled = false;
    
    // Reset todo elements to normal positions
    resetTodoElementsDepth();
    
    // Reset scene enhancements
    resetSceneFrom3D();
    
    // Update visual indicator
    updateParallaxIndicator();
    
    showNotification('Normal View Mode Active', 'info');
}

function addDepthToTodoElements() {
    // Add depth to TODO spheres for better 3D effect
    todoSpheres.forEach((sphere, index) => {
        // Create a more dramatic depth layout
        const depthOffset = ((index % 5) - 2) * 15; // Spread across 5 depth levels
        const horizontalOffset = ((index % 3) - 1) * 8; // Horizontal spacing
        const verticalOffset = Math.sin(index * 0.8) * 10; // Vertical variation
        
        sphere.position.z = depthOffset;
        sphere.position.x = 20 + horizontalOffset; // Position near the todo panel
        sphere.position.y = verticalOffset;
        
        // Scale spheres based on depth for better 3D effect
        const scaleBasedOnDepth = 1 + (depthOffset * 0.01);
        sphere.scale.setScalar(Math.max(0.5, scaleBasedOnDepth));
    });
    
    // Add depth to the todo container if it exists
    const todoContainer = scene.getObjectByName('todoContainer');
    if (todoContainer) {
        todoContainer.position.z = -5;
        
        // Animate the container for dynamic 3D effect
        const animate3DContainer = () => {
            if (parallaxBarrierEnabled && todoContainer) {
                todoContainer.rotation.y += 0.005;
                // Gentle floating motion
                todoContainer.position.y = Math.sin(Date.now() * 0.001) * 2;
                requestAnimationFrame(animate3DContainer);
            }
        };
        animate3DContainer();
    }
}

function resetTodoElementsDepth() {
    // Reset TODO spheres to original positions
    todoSpheres.forEach((sphere, index) => {
        // Return to normal floating positions
        const angle = Math.random() * Math.PI * 2;
        const radius = 50 + Math.random() * 100;
        const height = (Math.random() - 0.5) * 100;
        
        sphere.position.set(
            Math.cos(angle) * radius,
            height,
            Math.sin(angle) * radius
        );
        sphere.scale.setScalar(1); // Reset scale
    });
    
    // Reset the todo container
    const todoContainer = scene.getObjectByName('todoContainer');
    if (todoContainer) {
        todoContainer.position.set(20, 0, 0);
        todoContainer.rotation.y = 0;
    }
}

function addDepthLighting() {
    // Add lights that enhance the 3D parallax effect
    const frontLight = new THREE.DirectionalLight(0x00ffff, 0.5);
    frontLight.position.set(0, 0, 50);
    frontLight.name = 'parallaxFrontLight';
    scene.add(frontLight);
    
    const backLight = new THREE.DirectionalLight(0xff4444, 0.3);
    backLight.position.set(0, 0, -50);
    backLight.name = 'parallaxBackLight';
    scene.add(backLight);
}

function addSpectacularLighting() {
    // Remove old lights first
    const lightsToRemove = [];
    scene.traverse((object) => {
        if (object.isLight && object !== scene.children.find(c => c.type === 'AmbientLight')) {
            lightsToRemove.push(object);
        }
    });
    lightsToRemove.forEach(light => scene.remove(light));
    
    // Add dramatic directional light
    const sunLight = new THREE.DirectionalLight(0xffffff, 2);
    sunLight.position.set(200, 200, 100);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);
    
    // Add colored rim lighting
    const rimLight1 = new THREE.DirectionalLight(0x00ffff, 1);
    rimLight1.position.set(-100, 50, -100);
    scene.add(rimLight1);
    
    const rimLight2 = new THREE.DirectionalLight(0xff00ff, 0.8);
    rimLight2.position.set(100, -50, 100);
    scene.add(rimLight2);
    
    // Add dynamic point lights that move
    for (let i = 0; i < 5; i++) {
        const dynamicLight = new THREE.PointLight(
            new THREE.Color().setHSL(Math.random(), 1, 0.5), 
            2, 
            300
        );
        dynamicLight.position.set(
            (Math.random() - 0.5) * 400,
            (Math.random() - 0.5) * 200,
            (Math.random() - 0.5) * 400
        );
        scene.add(dynamicLight);
        
        // Animate the lights
        const originalPos = dynamicLight.position.clone();
        setInterval(() => {
            const time = Date.now() * 0.001 + i;
            dynamicLight.position.x = originalPos.x + Math.sin(time) * 50;
            dynamicLight.position.y = originalPos.y + Math.cos(time * 0.7) * 30;
            dynamicLight.position.z = originalPos.z + Math.sin(time * 0.5) * 40;
        }, 50);
    }
}

function addProfessional3DModels() {
    // Create a futuristic command center
    createCommandCenter();
    
    // Add floating data cubes
    createDataCubes();
    
    // Add holographic displays
    createHolographicDisplays();
    
    // Add energy fields
    createEnergyFields();
}

function createCommandCenter() {
    const centerGroup = new THREE.Group();
    
    // Main platform
    const platformGeometry = new THREE.CylinderGeometry(30, 35, 5, 16);
    const platformMaterial = new THREE.MeshPhongMaterial({
        color: 0x1a1a2e,
        shininess: 100,
        emissive: 0x0f0f1a
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = -20;
    centerGroup.add(platform);
    
    // Add glowing ring around platform
    const ringGeometry = new THREE.TorusGeometry(32, 2, 8, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.y = -18;
    ring.rotation.x = Math.PI / 2;
    centerGroup.add(ring);
    
    // Add control pillars
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const pillarGeometry = new THREE.BoxGeometry(2, 15, 2);
        const pillarMaterial = new THREE.MeshPhongMaterial({
            color: 0x16213e,
            emissive: 0x001122
        });
        const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
        pillar.position.set(
            Math.cos(angle) * 25,
            -10,
            Math.sin(angle) * 25
        );
        centerGroup.add(pillar);
        
        // Add glowing top to each pillar
        const topGeometry = new THREE.SphereGeometry(1.5, 8, 8);
        const topMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff88,
            transparent: true,
            opacity: 0.9
        });
        const top = new THREE.Mesh(topGeometry, topMaterial);
        top.position.set(
            Math.cos(angle) * 25,
            -3,
            Math.sin(angle) * 25
        );
        centerGroup.add(top);
    }
    
    scene.add(centerGroup);
}

function createDataCubes() {
    for (let i = 0; i < 15; i++) {
        const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        const cubeMaterial = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6),
            transparent: true,
            opacity: 0.7,
            emissive: new THREE.Color().setHSL(Math.random(), 0.5, 0.1)
        });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        
        cube.position.set(
            (Math.random() - 0.5) * 300,
            Math.random() * 100 + 20,
            (Math.random() - 0.5) * 300
        );
        
        // Add wireframe outline
        const wireframeGeometry = new THREE.EdgesGeometry(cubeGeometry);
        const wireframeMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.6
        });
        const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
        cube.add(wireframe);
        
        scene.add(cube);
        
        // Animate the cubes
        const rotationSpeed = (Math.random() + 0.5) * 0.02;
        const floatSpeed = (Math.random() + 0.5) * 0.003;
        const originalY = cube.position.y;
        
        setInterval(() => {
            const time = Date.now() * 0.001;
            cube.rotation.x += rotationSpeed;
            cube.rotation.y += rotationSpeed * 0.7;
            cube.rotation.z += rotationSpeed * 0.3;
            cube.position.y = originalY + Math.sin(time * floatSpeed + i) * 10;
        }, 16);
    }
}

function createHolographicDisplays() {
    for (let i = 0; i < 6; i++) {
        const displayGroup = new THREE.Group();
        
        // Main screen
        const screenGeometry = new THREE.PlaneGeometry(20, 15);
        const screenMaterial = new THREE.MeshBasicMaterial({
            color: 0x001155,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        displayGroup.add(screen);
        
        // Screen border
        const borderGeometry = new THREE.EdgesGeometry(screenGeometry);
        const borderMaterial = new THREE.LineBasicMaterial({
            color: 0x00ffff,
            linewidth: 2
        });
        const border = new THREE.LineSegments(borderGeometry, borderMaterial);
        displayGroup.add(border);
        
        // Add scanning line effect
        const lineGeometry = new THREE.PlaneGeometry(20, 0.5);
        const lineMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0.8
        });
        const scanLine = new THREE.Mesh(lineGeometry, lineMaterial);
        displayGroup.add(scanLine);
        
        // Position the display
        const angle = (i / 6) * Math.PI * 2;
        displayGroup.position.set(
            Math.cos(angle) * 80,
            Math.random() * 40 + 10,
            Math.sin(angle) * 80
        );
        displayGroup.lookAt(0, displayGroup.position.y, 0);
        
        scene.add(displayGroup);
        
        // Animate scanning line
        let scanPosition = -7.5;
        setInterval(() => {
            scanPosition += 0.5;
            if (scanPosition > 7.5) scanPosition = -7.5;
            scanLine.position.y = scanPosition;
        }, 100);
    }
}

function createEnergyFields() {
    // Create energy field around the center
    const fieldGeometry = new THREE.SphereGeometry(150, 32, 16);
    const fieldMaterial = new THREE.MeshBasicMaterial({
        color: 0x0066ff,
        transparent: true,
        opacity: 0.1,
        wireframe: true
    });
    const energyField = new THREE.Mesh(fieldGeometry, fieldMaterial);
    scene.add(energyField);
    
    // Animate energy field
    setInterval(() => {
        energyField.rotation.y += 0.002;
        energyField.rotation.x += 0.001;
        
        const time = Date.now() * 0.001;
        const scale = 1 + Math.sin(time) * 0.1;
        energyField.scale.setScalar(scale);
    }, 16);
}

function enhanceCameraControls() {
    // Make camera controls more responsive
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 10;
    controls.maxDistance = 1000;
    controls.maxPolarAngle = Math.PI;
    
    // Add smooth zoom
    controls.enableZoom = true;
    controls.zoomSpeed = 1.2;
    
    // Add smooth pan
    controls.enablePan = true;
    controls.panSpeed = 0.8;
}

function enhanceSceneFor3D() {
    console.log('🌟 Enhancing scene for 3D visibility...');
    
    // Make TODO spheres larger and more spread out for better 3D effect
    todoSpheres.forEach((sphere, index) => {
        sphere.scale.setScalar(1.5);
        
        // More dramatic positioning
        const angle = (index / todoSpheres.length) * Math.PI * 2;
        const radius = 30 + (index % 3) * 15;
        const height = (index % 5 - 2) * 15;
        
        sphere.position.set(
            Math.cos(angle) * radius,
            height,
            Math.sin(angle) * radius
        );
        
        // Add glow effect
        if (sphere.children[0] && sphere.children[0].material) {
            sphere.children[0].material.emissive.setHex(0x002244);
            sphere.children[0].material.emissiveIntensity = 0.3;
        }
    });
    
    // Enhance starfield for better depth perception
    if (starField && starField.material) {
        starField.material.size = 3;
        starField.material.opacity = 1;
    }
    
    // Add more dramatic lighting
    const dramaticLight = new THREE.PointLight(0x00ffff, 2, 100);
    dramaticLight.position.set(0, 50, 50);
    dramaticLight.name = 'dramaticLight';
    scene.add(dramaticLight);
}

function resetSceneFrom3D() {
    console.log('🔄 Resetting scene from 3D...');
    
    // Reset TODO spheres
    todoSpheres.forEach((sphere, index) => {
        sphere.scale.setScalar(1);
        
        // Reset to original floating positions
        const angle = Math.random() * Math.PI * 2;
        const radius = 50 + Math.random() * 100;
        const height = (Math.random() - 0.5) * 100;
        
        sphere.position.set(
            Math.cos(angle) * radius,
            height,
            Math.sin(angle) * radius
        );
        
        // Reset glow
        if (sphere.children[0] && sphere.children[0].material) {
            sphere.children[0].material.emissive.setHex(0x002222);
            sphere.children[0].material.emissiveIntensity = 0.1;
        }
    });
    
    // Reset starfield
    if (starField && starField.material) {
        starField.material.size = 2;
        starField.material.opacity = 0.8;
    }
    
    // Remove dramatic lighting
    const dramaticLight = scene.getObjectByName('dramaticLight');
    if (dramaticLight) {
        scene.remove(dramaticLight);
    }
}

// Legacy functions removed - using actual ParallaxBarrierEffect now

function addProfessionalParticles() {
    // Create multiple particle systems for different effects
    
    // Floating data particles
    const dataParticles = createDataParticleSystem();
    scene.add(dataParticles);
    
    // Energy sparks
    const energySparks = createEnergySparkSystem();
    scene.add(energySparks);
    
    // Ambient light particles
    const lightParticles = createLightParticleSystem();
    scene.add(lightParticles);
}

function createDataParticleSystem() {
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 400;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 400;
        
        const color = new THREE.Color();
        color.setHSL(0.6 + Math.random() * 0.4, 1, 0.5);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        sizes[i] = Math.random() * 3 + 1;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });
    
    const particles = new THREE.Points(geometry, material);
    
    // Animate particles
    setInterval(() => {
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3 + 1] += 0.2; // Move upward
            if (positions[i * 3 + 1] > 100) {
                positions[i * 3 + 1] = -100; // Reset to bottom
            }
        }
        particles.geometry.attributes.position.needsUpdate = true;
    }, 50);
    
    return particles;
}

function createEnergySparkSystem() {
    const sparkCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(sparkCount * 3);
    const colors = new Float32Array(sparkCount * 3);
    
    for (let i = 0; i < sparkCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
        
        colors[i * 3] = 1; // R
        colors[i * 3 + 1] = Math.random(); // G
        colors[i * 3 + 2] = 0; // B
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions,  3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 4,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
    });
    
    return new THREE.Points(geometry, material);
}

function createLightParticleSystem() {
    const lightCount = 50;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(lightCount * 3);
    const colors = new Float32Array(lightCount * 3);
    
    for (let i = 0; i < lightCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 300;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 150;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 300;
        
        colors[i * 3] = 0.8; // R
        colors[i * 3 + 1] = 0.9; // G
        colors[i * 3 + 2] = 1; // B
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.6
    });
    
    return new THREE.Points(geometry, material);
}

function create3DTodoListStructure() {
    // Create a 3D container for the TODO list
    const todoContainer = new THREE.Group();
    todoContainer.name = 'todoContainer';
    
    // Create a holographic panel background with more depth
    const panelGeometry = new THREE.PlaneGeometry(25, 35);
    const panelMaterial = new THREE.MeshBasicMaterial({
        color: 0x001133,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
    });
    const todoPanel = new THREE.Mesh(panelGeometry, panelMaterial);
    todoPanel.position.set(0, 0, -15);
    todoContainer.add(todoPanel);
    
    // Create multiple depth layers for better 3D effect
    for (let i = 0; i < 3; i++) {
        const layerGeometry = new THREE.PlaneGeometry(23 - i * 2, 33 - i * 2);
        const layerMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(0.6, 0.8, 0.3 + i * 0.1),
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide
        });
        const layer = new THREE.Mesh(layerGeometry, layerMaterial);
        layer.position.set(0, 0, -10 - i * 5);
        todoContainer.add(layer);
    }
    
    // Create a border frame with depth
    const frameGeometry = new THREE.EdgesGeometry(panelGeometry);
    const frameMaterial = new THREE.LineBasicMaterial({ 
        color: 0x00ffff,
        linewidth: 2
    });
    const frame = new THREE.LineSegments(frameGeometry, frameMaterial);
    frame.position.set(0, 0, -14);
    todoContainer.add(frame);
    
    // Add corner markers for better 3D reference
    const corners = [
        [-12, 17, -13], [12, 17, -13], 
        [-12, -17, -13], [12, -17, -13]
    ];
    
    corners.forEach(corner => {
        const markerGeometry = new THREE.SphereGeometry(0.5, 8, 8);
        const markerMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            emissive: 0x002222
        });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.set(corner[0], corner[1], corner[2]);
        todoContainer.add(marker);
    });
    
    // Position the container slightly to the side for better parallax effect
    todoContainer.position.set(20, 0, 0);
    scene.add(todoContainer);
    
    return todoContainer;
}

// Removed old broken functions - they are replaced with working versions above

// All old functions removed and replaced with working professional 3D system above

// Enhanced TODO panel creation with 3D effects

// Make functions globally available
window.toggleTodo = toggleTodo;
window.editTodo = editTodo;
window.saveTodoFromInput = saveTodoFromInput;
window.cancelEdit = cancelEdit;
window.deleteTodo = deleteTodo;

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
