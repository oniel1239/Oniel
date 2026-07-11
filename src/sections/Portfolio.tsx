import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'SecureNet PenTest Suite',
    category: 'Ethical Hacking',
    description: 'Automated penetration testing framework with real-time vulnerability scanning and comprehensive reporting.',
    image: '/portfolio-1.jpg',
    tags: ['Python', 'Metasploit', 'Nmap', 'Docker'],
  },
  {
    id: 2,
    title: 'AutoFlow Enterprise',
    category: 'Workflow Automation',
    description: 'End-to-end business process automation platform handling 10,000+ daily operations with zero downtime.',
    image: '/portfolio-2.jpg',
    tags: ['Node.js', 'Redis', 'Kubernetes', 'GraphQL'],
  },
  {
    id: 3,
    title: 'CipherVault Dashboard',
    category: 'Web Development',
    description: 'Real-time cybersecurity monitoring dashboard with threat visualization and instant alert systems.',
    image: '/portfolio-5.jpg',
    tags: ['React', 'D3.js', 'WebSocket', 'TypeScript'],
  },
  {
    id: 4,
    title: 'NeuralSync API',
    category: 'App Development',
    description: 'High-performance microservices architecture processing 50M+ requests daily with sub-10ms latency.',
    image: '/portfolio-4.jpg',
    tags: ['Go', 'gRPC', 'PostgreSQL', 'AWS'],
  },
  {
    id: 5,
    title: 'PhishGuard AI',
    category: 'Ethical Hacking',
    description: 'AI-powered phishing detection system with 99.7% accuracy in identifying social engineering attempts.',
    image: '/portfolio-6.jpg',
    tags: ['Python', 'TensorFlow', 'NLP', 'ElasticSearch'],
  },
  {
    id: 6,
    title: 'DevOps Pipeline Pro',
    category: 'Workflow Automation',
    description: 'Complete CI/CD automation suite reducing deployment time by 85% while maintaining 100% security compliance.',
    image: '/portfolio-3.jpg',
    tags: ['Jenkins', 'Terraform', 'Ansible', 'Prometheus'],
  },
];

const topologyVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  attribute vec3 random;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    float angleX = uTime * 0.2 * random.y;
    mat3 rotX = mat3(
      1.0, 0.0, 0.0,
      0.0, cos(angleX), sin(angleX),
      0.0, -sin(angleX), cos(angleX)
    );
    pos = rotX * pos;
    float angleY = uTime * 0.2 * random.x;
    mat3 rotY = mat3(
      cos(angleY), 0.0, -sin(angleY),
      0.0, 1.0, 0.0,
      sin(angleY), 0.0, cos(angleY)
    );
    pos = rotY * pos;
    vec3 viewPos = (modelViewMatrix * vec4(pos, 1.0)).xyz;
    float cs = -viewPos.z / 1000.0;
    vAlpha = smoothstep(0.0, 0.3, cs);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 4.0 * (200.0 / -viewPos.z);
  }
`;

const topologyFragmentShader = `
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - 0.5);
    if (dist > 0.5) discard;
    gl_FragColor = vec4(vec3(0.0, 1.0, 0.8), (1.0 - dist * 2.0) * vAlpha);
  }
`;

export default function Portfolio() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const groupRef = useRef<THREE.Group | null>(null);

  // Three.js Data-Link Topology
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.offsetWidth / container.offsetHeight, 0.1, 2000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create sphere of points
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const randoms = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const spherical = new THREE.Spherical(150, Math.random() * Math.PI, Math.random() * Math.PI * 2);
      const vec = new THREE.Vector3().setFromSpherical(spherical);
      positions[i * 3] = vec.x;
      positions[i * 3 + 1] = vec.y;
      positions[i * 3 + 2] = vec.z;
      randoms[i * 3] = Math.random();
      randoms[i * 3 + 1] = Math.random();
      randoms[i * 3 + 2] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('random', new THREE.BufferAttribute(randoms, 3));

    const material = new THREE.ShaderMaterial({
      vertexShader: topologyVertexShader,
      fragmentShader: topologyFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);
    groupRef.current = group;

    // Lines connecting nearby points
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffcc,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    const posArray = geometry.attributes.position.array as Float32Array;
    const threshold = 25;

    for (let i = 0; i < Math.min(particleCount, 300); i++) {
      for (let j = i + 1; j < Math.min(particleCount, 300); j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < threshold) {
          linePositions.push(
            posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2],
            posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2]
          );
        }
      }
    }

    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lines);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    container.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    };
    window.addEventListener('resize', onResize);

    let rafId: number;
    const clock = new THREE.Clock();
    const animate = () => {
      material.uniforms.uTime.value = clock.getElapsedTime();
      group.rotation.y += 0.001;
      group.rotation.x += (mouseRef.current.y * 0.1 - group.rotation.x) * 0.02;
      group.rotation.z += (mouseRef.current.x * 0.1 - group.rotation.z) * 0.02;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // GSAP entrance animations
  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header.querySelectorAll('.reveal-item'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[var(--bg-primary)] py-[10vh]"
      style={{ isolation: 'isolate' }}
    >
      {/* 3D Globe Background */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Content */}
      <div className="relative z-10 px-[5vw]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="mb-16">
            <span className="reveal-item text-[var(--accent)] text-sm tracking-[0.3em] uppercase font-body block">
              // Archive
            </span>
            <h2
              className="reveal-item font-display font-bold text-[var(--text-primary)] mt-2"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              PORTFOLIO
            </h2>
            <p className="reveal-item font-body text-[var(--text-secondary)] mt-4 max-w-2xl text-lg">
              Selected works across security, automation, and development.
              Each project represents a unique challenge conquered.
            </p>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className={`group relative glass-card overflow-hidden transition-all duration-500 hover:border-[var(--accent)] ${
                  i === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                onMouseEnter={() => setActiveProject(i)}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={`Screenshot of ${project.title} project`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-80" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[var(--accent)] text-xs tracking-wider uppercase font-mono">
                    {project.category}
                  </span>
                  <h3 className="font-display font-bold text-[var(--text-primary)] text-xl mt-1 group-hover:text-[var(--accent)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-body text-[var(--text-secondary)] text-sm mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2 py-1 border border-[rgba(158,255,0,0.2)] text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Active indicator */}
                <div
                  className={`absolute top-4 right-4 w-2 h-2 rounded-full transition-all duration-300 ${
                    activeProject === i ? 'bg-[var(--accent)]' : 'bg-[rgba(255,255,255,0.2)]'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
