/* eslint-disable react/no-unknown-property */
import React, { forwardRef, useMemo, useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Color, Mesh, ShaderMaterial, Uniform } from 'three';

type NormalizedRGB = [number, number, number];

const hexToNormalizedRGB = (hex: string): NormalizedRGB => {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return [r, g, b];
};

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;
uniform float uTime;
uniform vec3 uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2 r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2 rot = mat2(c, -s, s, c);
  return rot * (uv - 0.5) + 0.5;
}

void main() {
  float rnd = noise(gl_FragCoord.xy);
  vec2 uv = rotateUvs(vUv, uRotation);
  vec2 tex = uv * uScale;
  float tOffset = uSpeed * uTime * 0.1;
  
  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);
  
  float pattern = 0.6 + 0.4 * sin(
    5.0 * (
      tex.x + tex.y + 
      cos(3.0 * tex.x + 5.0 * tex.y) + 
      0.02 * tOffset
    ) + 
    sin(20.0 * (tex.x + tex.y - 0.1 * tOffset))
  );
  
  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

import type { IUniform } from 'three';

interface SilkPlaneProps {
  uniforms: {
    uSpeed: IUniform;
    uScale: IUniform;
    uNoiseIntensity: IUniform;
    uColor: IUniform;
    uRotation: IUniform;
    uTime: IUniform;
  };
}

const SilkPlane = forwardRef<Mesh, SilkPlaneProps>(function SilkPlane({ uniforms }, ref) {
  const { viewport } = useThree();

  useLayoutEffect(() => {
    if (ref && typeof ref === 'object' && ref.current) {
      ref.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [ref, viewport.width, viewport.height]);

  useFrame((_state, delta: number) => {
    if (ref && typeof ref === 'object' && ref.current) {
      const material = ref.current.material as ShaderMaterial;
      if (material && material.uniforms && material.uniforms.uTime) {
        material.uniforms.uTime.value += delta;
      }
    }
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={{
          uSpeed: uniforms.uSpeed,
          uScale: uniforms.uScale,
          uNoiseIntensity: uniforms.uNoiseIntensity,
          uColor: uniforms.uColor,
          uRotation: uniforms.uRotation,
          uTime: uniforms.uTime,
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={false}
      />
    </mesh>
  );
});

SilkPlane.displayName = 'SilkPlane';

export interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
}

const Silk: React.FC<SilkProps> = ({
  speed = 5,
  scale = 1,
  color = '#7B7481',
  noiseIntensity = 1.5,
  rotation = 0
}) => {
  const meshRef = useRef<Mesh>(null);

  const uniforms = useMemo(() => {
    return {
      uSpeed: new Uniform(speed),
      uScale: new Uniform(scale),
      uNoiseIntensity: new Uniform(noiseIntensity),
      uColor: new Uniform(new Color(...hexToNormalizedRGB(color))),
      uRotation: new Uniform(rotation),
      uTime: new Uniform(0)
    };
  }, [speed, scale, noiseIntensity, color, rotation]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas
        dpr={[1, 2]}
        frameloop="always"
        gl={{ antialias: false, alpha: false }}
        camera={{ position: [0, 0, 1] }}
        style={{ width: '100%', height: '100%' }}
      >
        <SilkPlane ref={meshRef} uniforms={uniforms} />
      </Canvas>
    </div>
  );
};

export default Silk;
