
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  ContactShadows,
  Sparkles,
} from "@react-three/drei";
import { gsap } from "gsap";
import { ArrowUpRight, Menu, X, Plus, ArrowRight } from "lucide-react";
import "./style.css";
const cfg = {
  name: "AURIX",
  title: "Drive beyond the ordinary.",
  eyebrow: "THE ART OF MOTION",
  accent: "#d9ff4f",
  bg: "#090b0d",
  kind: "car",
  image:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=85",
  tag: "THE ART OF MOTION",
  desc: "A new expression of performance. Sculpted aerodynamics, intelligent engineering and an experience built around the driver.",
};
function Object3D() {
  const r = useRef();
  useFrame((s, d) => {
    if (r.current) {
      r.current.rotation.y += d * 0.22;
      r.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.35) * 0.12;
    }
  });
  let k = cfg.kind;
  if (k === "planet")
    return (
      <Float>
        <mesh ref={r}>
          <sphereGeometry args={[1.3, 64, 64]} />
          <meshStandardMaterial color="#28618d" roughness={0.72} />
        </mesh>
      </Float>
    );
  if (k === "orb")
    return (
      <Float>
        <mesh ref={r}>
          <icosahedronGeometry args={[1.35, 5]} />
          <meshPhysicalMaterial
            color="#8878ff"
            roughness={0.16}
            metalness={0.5}
            transmission={0.2}
          />
        </mesh>
      </Float>
    );
  if (k === "bottle")
    return (
      <Float>
        <group ref={r}>
          <mesh>
            <cylinderGeometry args={[0.55, 0.62, 1.8, 48]} />
            <meshPhysicalMaterial
              color="#c99b54"
              roughness={0.15}
              metalness={0.3}
              transmission={0.3}
            />
          </mesh>
          <mesh position={[0, 1.1, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.35, 32]} />
            <meshStandardMaterial color="#c7ad7d" metalness={0.8} />
          </mesh>
        </group>
      </Float>
    );
  if (k === "watch")
    return (
      <Float>
        <group ref={r}>
          <mesh>
            <cylinderGeometry args={[0.86, 0.86, 0.18, 64]} />
            <meshStandardMaterial color="#b89a65" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.12]}>
            <cylinderGeometry args={[0.75, 0.75, 0.04, 64]} />
            <meshStandardMaterial color="#101716" metalness={0.4} />
          </mesh>
          {[0, 1, 2].map((n) => (
            <mesh key={n} position={[0, 0, 0.16]} rotation={[0, 0, -n * 2.1]}>
              <boxGeometry args={[0.025, 0.58, 0.02]} />
              <meshStandardMaterial color="#e8d5a8" />
            </mesh>
          ))}
        </group>
      </Float>
    );
  if (k === "building" || k === "interior")
    return (
      <Float>
        <group ref={r}>
          <mesh>
            <boxGeometry args={[1.5, 2.1, 1.1]} />
            <meshStandardMaterial color="#bba58d" roughness={0.35} />
          </mesh>
          {Array.from({ length: 6 }, (_, i) => (
            <mesh
              key={i}
              position={[
                -0.39 + (i % 3) * 0.39,
                0.1 + Math.floor(i / 3) * 0.72,
                0.56,
              ]}
            >
              <boxGeometry args={[0.2, 0.48, 0.025]} />
              <meshStandardMaterial color="#17232a" metalness={0.4} />
            </mesh>
          ))}
        </group>
      </Float>
    );
  return (
    <Float>
      <group ref={r}>
        <mesh>
          <torusGeometry args={[0.85, 0.18, 24, 96]} />
          <meshStandardMaterial color="#a7b1b8" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.15]}>
          <sphereGeometry args={[0.7, 48, 48]} />
          <meshStandardMaterial color="#202a30" metalness={0.8} />
        </mesh>
      </group>
    </Float>
  );
}
function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.8], fov: 42 }}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 5, 5]} intensity={2.4} />
      <pointLight position={[-4, -2, 2]} color={cfg.accent} intensity={3} />
      <Suspense fallback={null}>
        <Object3D />
        <Environment preset="city" />
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.3}
          blur={2.5}
          scale={5}
        />
      </Suspense>
      {["orb", "planet"].includes(cfg.kind) && (
        <Sparkles count={80} scale={5} color={cfg.accent} />
      )}
    </Canvas>
  );
}
export default function App() {
  const [menu, setMenu] = useState(false),
    [selected, setSelected] = useState(0),
    [message, setMessage] = useState("");
  const go = (id) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const send = (e) => {
    e.preventDefault();
    setMessage("Thanks — connect this demo form to your email or CRM.");
    e.currentTarget.reset();
  };
  return (
    <main style={{ "--accent": cfg.accent, "--page": cfg.bg }}>
      <header className="nav">
        <a className="brand" href="#top">
          {cfg.name}
          <sup>®</sup>
        </a>
        <nav className={menu ? "links open" : "links"}>
          <a href="#story">The vision</a>
          <a href="#collection">Collection</a>
          <a href="#details">Details</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="navcta" onClick={() => go("contact")}>
          Get in touch ↗
        </button>
        <button className="menubtn" onClick={() => setMenu(!menu)}>
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <section className="hero" id="top">
        <div className="copy">
          <div className="eyebrow">✳ &nbsp;{cfg.eyebrow}</div>
          <h1>
            {cfg.title.split(" ").slice(0, -1).join(" ")}{" "}
            <em>{cfg.title.split(" ").slice(-1)}</em>
          </h1>
          <p>{cfg.desc}</p>
          <div className="actions">
            <button className="primary" onClick={() => go("collection")}>
              Explore the experience <ArrowUpRight size={17} />
            </button>
            <button className="plain" onClick={() => go("story")}>
              Discover the story <ArrowRight size={16} />
            </button>
          </div>
          <div className="note">
            01 / 03 <span>{cfg.tag}</span>
          </div>
        </div>
        <div className="visual">
          <div className="glow" />
          <div className="scene">
            <Scene />
          </div>
          <div className="visual-label">
            INTERACTIVE 3D OBJECT
            <br />
            <b>{cfg.kind.toUpperCase()} / 001</b>
          </div>
          <div className="ring" />
        </div>
      </section>
      <div className="ticker">
        <span>
          {cfg.tag}　✳　{cfg.tag}　✳　{cfg.tag}　✳　{cfg.tag}
        </span>
      </div>
      <section className="section" id="story">
        <div className="kicker">01 / THE VISION</div>
        <div className="split">
          <h2>
            Less ordinary.
            <br />
            <em>More intentional.</em>
          </h2>
          <p>
            {cfg.desc} Every decision is an opportunity to make the experience
            more meaningful — from the first impression to the smallest detail.
          </p>
        </div>
        <div
          className="photo"
          style={{
            backgroundImage: `linear-gradient(0deg,#0008,transparent 55%),url(${cfg.image})`,
          }}
        >
          <span>
            {cfg.name} / {cfg.tag}
          </span>
        </div>
      </section>
      <section className="section collection" id="collection">
        <div className="kicker">02 / THE COLLECTION</div>
        <div className="split">
          <h2>
            Considered in
            <br />
            <em>every detail.</em>
          </h2>
          <p>
            A closer look at the ideas, objects and experiences that define{" "}
            {cfg.name}.
          </p>
        </div>
        <div className="cards">
          {["Signature", "Essential", "Limited"].map((n, i) => (
            <article
              className={selected === i ? "card active" : "card"}
              key={n}
              onMouseEnter={() => setSelected(i)}
              onClick={() => {
                setSelected(i);
                setMessage(
                  n +
                    " selected — connect this card to your enquiry or product flow.",
                );
              }}
            >
              <div className="art">
                <span>0{i + 1}</span>
                <div className="disc">{n.slice(0, 1)}</div>
                <button>
                  <Plus />
                </button>
              </div>
              <h3>
                {cfg.name} {n.toUpperCase()}
              </h3>
              <p>
                {
                  [
                    "A defining expression of the collection.",
                    "A considered choice for every day.",
                    "A distinctive edition, made to stand apart.",
                  ][i]
                }
              </p>
            </article>
          ))}
        </div>
        {message && (
          <div className="message" role="status">
            {message}
            <button onClick={() => setMessage("")}>Dismiss</button>
          </div>
        )}
      </section>
      <section className="section" id="details">
        <div className="kicker">03 / THE DIFFERENCE</div>
        <div className="split">
          <h2>
            Built around
            <br />
            <em>what matters.</em>
          </h2>
          <p>
            Purposeful choices. Distinctive character. An experience that stays
            with you.
          </p>
        </div>
        <div className="features">
          {[
            [
              "01",
              "Thoughtful by design",
              "A balance of form, function and feeling.",
            ],
            [
              "02",
              "Exceptional detail",
              "Carefully considered at every scale.",
            ],
            [
              "03",
              "Made to inspire",
              "A point of view that looks to what is next.",
            ],
          ].map((x) => (
            <article key={x[0]}>
              <span>{x[0]}</span>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
              <ArrowUpRight />
            </article>
          ))}
        </div>
      </section>
      <section className="section" id="contact">
        <div className="contact">
          <div>
            <div className="kicker">04 / START A CONVERSATION</div>
            <h2>
              Good things
              <br />
              <em>start here.</em>
            </h2>
            <p>Tell us what you're looking for. We'd love to hear from you.</p>
          </div>
          <form onSubmit={send}>
            <label>
              Your name
              <input required placeholder="Name" />
            </label>
            <label>
              Email address
              <input required type="email" placeholder="you@example.com" />
            </label>
            <label>
              Your message
              <textarea
                rows="3"
                placeholder="Tell us a little about your idea"
              />
            </label>
            <button className="primary">
              Send enquiry <ArrowUpRight />
            </button>
            {message && <small>{message}</small>}
          </form>
        </div>
      </section>
      <footer>
        <a className="brand" href="#top">
          {cfg.name}
          <sup>®</sup>
        </a>
        <span>
          © {new Date().getFullYear()} {cfg.name}. Concept website.
        </span>
        <button onClick={() => go("top")}>Back to top ↑</button>
      </footer>
    </main>
  );
}
