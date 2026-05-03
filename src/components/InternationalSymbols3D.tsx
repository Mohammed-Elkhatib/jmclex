import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

interface Symbol3DProps {
  name: string;
  createGeometry: () => THREE.BufferGeometry;
  color: string;
  onClick: () => void;
}

const Symbol3D: React.FC<Symbol3DProps> = ({ name, createGeometry, color, onClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const rotationSpeedRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0xffffff, 100, 1000);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xC8A96A, 0.5);
    pointLight.position.set(-5, 3, 5);
    scene.add(pointLight);

    // Create geometry and mesh
    const geometry = createGeometry();
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      metalness: 0.4,
      roughness: 0.6,
      emissive: new THREE.Color(color),
      emissiveIntensity: 0.1,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    meshRef.current = mesh;

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Mouse/Touch interaction
    const handlePointerEnter = () => {
      setIsRotating(true);
      rotationSpeedRef.current = 0.08;
    };

    const handlePointerLeave = () => {
      setIsRotating(false);
      rotationSpeedRef.current = 0.005;
    };

    const handleClick = () => {
      onClick();
    };

    containerRef.current.addEventListener('pointerenter', handlePointerEnter);
    containerRef.current.addEventListener('pointerleave', handlePointerLeave);
    containerRef.current.addEventListener('click', handleClick);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (meshRef.current) {
        // Continuous subtle rotation
        meshRef.current.rotation.y += rotationSpeedRef.current;
        meshRef.current.rotation.x += rotationSpeedRef.current * 0.3;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Set initial slow rotation
    rotationSpeedRef.current = 0.005;

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener('pointerenter', handlePointerEnter);
        containerRef.current.removeEventListener('pointerleave', handlePointerLeave);
        containerRef.current.removeEventListener('click', handleClick);
      }
      cancelAnimationFrame(animationId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [createGeometry, color, onClick]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-pointer transition-transform duration-300 hover:scale-110"
      style={{ touchAction: 'none' }}
    />
  );
};

// Geometry creators for each symbol
const createBaalbek = () => {
  const group = new THREE.Group();

  // Roman columns
  for (let i = 0; i < 4; i++) {
    const cylinderGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.2, 16);
    const column = new THREE.Mesh(cylinderGeometry);
    column.position.x = (i - 1.5) * 0.4;
    column.position.y = -0.2;
    group.add(column);

    // Capital
    const capitalGeometry = new THREE.BoxGeometry(0.35, 0.15, 0.35);
    const capital = new THREE.Mesh(capitalGeometry);
    capital.position.copy(column.position);
    capital.position.y = 0.75;
    group.add(capital);
  }

  // Entablature
  const entablatureGeometry = new THREE.BoxGeometry(2, 0.2, 0.3);
  const entablature = new THREE.Mesh(entablatureGeometry);
  entablature.position.y = 0.95;
  group.add(entablature);

  // Convert group to geometry
  const geometry = new THREE.BufferGeometry();
  const positions: number[] = [];
  const indices: number[] = [];

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const childGeometry = (child.geometry as THREE.BufferGeometry).clone();
      childGeometry.applyMatrix4(child.matrixWorld);
      const pos = childGeometry.getAttribute('position');
      const idx = childGeometry.getIndex();

      const posArray = Array.from((pos as THREE.BufferAttribute).array as ArrayLike<number>);
      const startIndex = positions.length / 3;

      positions.push(...posArray);

      if (idx) {
        const idxArray = Array.from((idx.array as ArrayLike<number>));
        indices.push(...idxArray.map((i) => i + startIndex));
      }
    }
  });

  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  if (indices.length > 0) {
    geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
  }
  geometry.computeVertexNormals();

  return geometry;
};

const createEiffelTower = () => {
  const group = new THREE.Group();

  // Base
  const baseGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.8);
  const base = new THREE.Mesh(baseGeometry);
  base.position.y = -0.5;
  group.add(base);

  // Main tower legs
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const legGeometry = new THREE.ConeGeometry(0.08, 1.2, 8);
    const leg = new THREE.Mesh(legGeometry);
    leg.position.x = Math.cos(angle) * 0.3;
    leg.position.z = Math.sin(angle) * 0.3;
    leg.position.y = 0.1;
    group.add(leg);
  }

  // Tower shaft
  const shaftGeometry = new THREE.CylinderGeometry(0.06, 0.08, 1.5, 8);
  const shaft = new THREE.Mesh(shaftGeometry);
  shaft.position.y = 0.5;
  group.add(shaft);

  // Top spire
  const spireGeometry = new THREE.ConeGeometry(0.04, 0.5, 8);
  const spire = new THREE.Mesh(spireGeometry);
  spire.position.y = 1.35;
  group.add(spire);

  const geometry = new THREE.BufferGeometry();
  const positions: number[] = [];
  const indices: number[] = [];

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const childGeometry = (child.geometry as THREE.BufferGeometry).clone();
      childGeometry.applyMatrix4(child.matrixWorld);
      const pos = childGeometry.getAttribute('position');
      const idx = childGeometry.getIndex();

      const posArray = Array.from((pos as THREE.BufferAttribute).array as ArrayLike<number>);
      const startIndex = positions.length / 3;

      positions.push(...posArray);

      if (idx) {
        const idxArray = Array.from((idx.array as ArrayLike<number>));
        indices.push(...idxArray.map((i) => i + startIndex));
      }
    }
  });

  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  if (indices.length > 0) {
    geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
  }
  geometry.computeVertexNormals();

  return geometry;
};

const createBurjKhalifa = () => {
  const group = new THREE.Group();

  // Base platform
  const baseGeometry = new THREE.BoxGeometry(0.6, 0.1, 0.6);
  const base = new THREE.Mesh(baseGeometry);
  base.position.y = -0.5;
  group.add(base);

  // Main tower
  const towerGeometry = new THREE.CylinderGeometry(0.15, 0.2, 1.6, 16);
  const tower = new THREE.Mesh(towerGeometry);
  tower.position.y = 0.3;
  group.add(tower);

  // Spire
  const spireGeometry = new THREE.ConeGeometry(0.08, 0.6, 16);
  const spire = new THREE.Mesh(spireGeometry);
  spire.position.y = 1.2;
  group.add(spire);

  // Antenna
  const antennaGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8);
  const antenna = new THREE.Mesh(antennaGeometry);
  antenna.position.y = 1.5;
  group.add(antenna);

  const geometry = new THREE.BufferGeometry();
  const positions: number[] = [];
  const indices: number[] = [];

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const childGeometry = (child.geometry as THREE.BufferGeometry).clone();
      childGeometry.applyMatrix4(child.matrixWorld);
      const pos = childGeometry.getAttribute('position');
      const idx = childGeometry.getIndex();

      const posArray = Array.from((pos as THREE.BufferAttribute).array as ArrayLike<number>);
      const startIndex = positions.length / 3;

      positions.push(...posArray);

      if (idx) {
        const idxArray = Array.from((idx.array as ArrayLike<number>));
        indices.push(...idxArray.map((i) => i + startIndex));
      }
    }
  });

  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  if (indices.length > 0) {
    geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
  }
  geometry.computeVertexNormals();

  return geometry;
};

const createSaudiSymbol = () => {
  const group = new THREE.Group();

  // Palm tree trunk
  const trunkGeometry = new THREE.CylinderGeometry(0.08, 0.12, 0.8, 8);
  const trunk = new THREE.Mesh(trunkGeometry);
  trunk.position.y = -0.1;
  group.add(trunk);

  // Palm fronds
  for (let i = 0; i < 5; i++) {
    const angle = (i * Math.PI * 2) / 5;
    const frondGeometry = new THREE.ConeGeometry(0.05, 0.6, 8);
    const frond = new THREE.Mesh(frondGeometry);
    frond.position.x = Math.cos(angle) * 0.15;
    frond.position.z = Math.sin(angle) * 0.15;
    frond.position.y = 0.4;
    frond.rotation.z = angle;
    group.add(frond);
  }

  // Crossed swords (abstract)
  const sword1Geometry = new THREE.BoxGeometry(0.02, 0.6, 0.02);
  const sword1 = new THREE.Mesh(sword1Geometry);
  sword1.rotation.z = Math.PI / 4;
  sword1.position.y = -0.3;
  group.add(sword1);

  const sword2Geometry = new THREE.BoxGeometry(0.02, 0.6, 0.02);
  const sword2 = new THREE.Mesh(sword2Geometry);
  sword2.rotation.z = -Math.PI / 4;
  sword2.position.y = -0.3;
  group.add(sword2);

  const geometry = new THREE.BufferGeometry();
  const positions: number[] = [];
  const indices: number[] = [];

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const childGeometry = (child.geometry as THREE.BufferGeometry).clone();
      childGeometry.applyMatrix4(child.matrixWorld);
      const pos = childGeometry.getAttribute('position');
      const idx = childGeometry.getIndex();

      const posArray = Array.from((pos as THREE.BufferAttribute).array as ArrayLike<number>);
      const startIndex = positions.length / 3;

      positions.push(...posArray);

      if (idx) {
        const idxArray = Array.from((idx.array as ArrayLike<number>));
        indices.push(...idxArray.map((i) => i + startIndex));
      }
    }
  });

  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  if (indices.length > 0) {
    geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
  }
  geometry.computeVertexNormals();

  return geometry;
};

const createSwissSymbol = () => {
  const group = new THREE.Group();

  // Alpine mountain
  const mountainGeometry = new THREE.ConeGeometry(0.6, 1.2, 8);
  const mountain = new THREE.Mesh(mountainGeometry);
  mountain.position.y = 0.1;
  group.add(mountain);

  // Swiss cross
  const crossVerticalGeometry = new THREE.BoxGeometry(0.08, 0.5, 0.08);
  const crossVertical = new THREE.Mesh(crossVerticalGeometry);
  crossVertical.position.y = 0.6;
  group.add(crossVertical);

  const crossHorizontalGeometry = new THREE.BoxGeometry(0.5, 0.08, 0.08);
  const crossHorizontal = new THREE.Mesh(crossHorizontalGeometry);
  crossHorizontal.position.y = 0.6;
  group.add(crossHorizontal);

  const geometry = new THREE.BufferGeometry();
  const positions: number[] = [];
  const indices: number[] = [];

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const childGeometry = (child.geometry as THREE.BufferGeometry).clone();
      childGeometry.applyMatrix4(child.matrixWorld);
      const pos = childGeometry.getAttribute('position');
      const idx = childGeometry.getIndex();

      const posArray = Array.from((pos as THREE.BufferAttribute).array as ArrayLike<number>);
      const startIndex = positions.length / 3;

      positions.push(...posArray);

      if (idx) {
        const idxArray = Array.from((idx.array as ArrayLike<number>));
        indices.push(...idxArray.map((i) => i + startIndex));
      }
    }
  });

  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  if (indices.length > 0) {
    geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1));
  }
  geometry.computeVertexNormals();

  return geometry;
};

const SYMBOLS = [
  {
    name: 'Lebanon',
    createGeometry: createBaalbek,
    color: '#A67C52',
  },
  {
    name: 'France',
    createGeometry: createEiffelTower,
    color: '#8B7355',
  },
  {
    name: 'UAE',
    createGeometry: createBurjKhalifa,
    color: '#C8A96A',
  },
  {
    name: 'Saudi Arabia',
    createGeometry: createSaudiSymbol,
    color: '#9B8B6F',
  },
  {
    name: 'Switzerland',
    createGeometry: createSwissSymbol,
    color: '#B8956A',
  },
];

export default function InternationalSymbols3D() {
  const handleSymbolClick = () => {
    window.location.href = '/consultation';
  };

  return (
    <section className="relative w-full bg-background py-16 md:py-24 border-t border-optional-navy/10">
      <div className="max-w-[120rem] mx-auto px-6 md:px-12">
        {/* Grid of 3D symbols */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {SYMBOLS.map((symbol) => (
            <motion.div
              key={symbol.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="aspect-square rounded-lg overflow-hidden bg-white border border-optional-navy/10 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Symbol3D
                name={symbol.name}
                createGeometry={symbol.createGeometry}
                color={symbol.color}
                onClick={handleSymbolClick}
              />
            </motion.div>
          ))}
        </div>

        {/* Subtle description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="font-paragraph text-sm md:text-base text-optional-navy/60 tracking-wide">
            International presence across key jurisdictions • Click any symbol to book a consultation
          </p>
        </motion.div>
      </div>
    </section>
  );
}
