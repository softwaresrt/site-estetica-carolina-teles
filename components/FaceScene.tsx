'use client';
import {useRef,useMemo} from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import {OrbitControls,PerformanceMonitor,AdaptiveDpr,shaderMaterial,useGLTF} from '@react-three/drei';
import * as THREE from 'three';
import {treatmentZones} from '@/content/site';

const ScannerShader=shaderMaterial(
 {uTime:0},
 `varying vec3 vCoord; void main(){vCoord=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
 `uniform float uTime; varying vec3 vCoord; void main(){ float line=1.0-smoothstep(0.0,0.065,abs(sin(vCoord.y*14.0-uTime*1.2)));float vertical=pow(max(0.0,sin(vCoord.y*3.0-uTime)),16.0);float a=line*0.13+vertical*0.25;gl_FragColor=vec4(0.98,0.75,0.58,a);}`
);
function FaceSculpture({selected,onSelect}:{selected:string;onSelect:(id:string)=>void}){
 const group=useRef<THREE.Group>(null);
 const scanMaterial=useMemo(()=>new ScannerShader(),[]);
 const material=useMemo(()=>new THREE.MeshPhysicalMaterial({color:'#e3c1a6',metalness:.28,roughness:.34,clearcoat:.8,clearcoatRoughness:.23,transparent:true,opacity:.84,side:THREE.DoubleSide}),[]);
 useFrame(({clock},delta)=>{scanMaterial.uniforms.uTime.value=clock.elapsedTime; if(group.current){group.current.rotation.y=THREE.MathUtils.damp(group.current.rotation.y,.06,1.5,delta);group.current.position.y=Math.sin(clock.elapsedTime*.5)*.018}});
 return <group ref={group} rotation={[0,-.06,0]}>
  <mesh material={material} scale={[.9,1.17,.74]}><sphereGeometry args={[1,64,64]}/></mesh>
  <mesh position={[0,-1.13,-.07]} scale={[.51,.55,.48]} material={material}><cylinderGeometry args={[.85,.99,1,48]}/></mesh>
  <mesh position={[0,.11,.66]} scale={[.17,.34,.22]} material={material}><sphereGeometry args={[1,32,32]}/></mesh>
  <mesh position={[0,-.34,.702]} rotation={[0,0,0]} scale={[.26,.045,.06]}><sphereGeometry args={[1,32,16]}/><meshStandardMaterial color="#a77a6e" metalness={.2} roughness={.5}/></mesh>
  {[-1,1].map(side=><group key={side}>
   <mesh position={[side*.36,.28,.56]} rotation={[0,side*.11,0]} scale={[.215,.075,.075]}><sphereGeometry args={[1,24,16]}/><meshStandardMaterial color="#8c6a5d" roughness={.65}/></mesh>
   <mesh position={[side*.36,.305,.625]} scale={[.075,.045,.015]}><sphereGeometry args={[1,20,12]}/><meshStandardMaterial color="#3a2823" roughness={.5}/></mesh>
   <mesh position={[side*.36,.43,.56]} rotation={[0,0,side*.13]} scale={[.23,.029,.035]}><sphereGeometry args={[1,24,16]}/><meshStandardMaterial color="#ac8973" roughness={.48}/></mesh>
   <mesh position={[side*.91,-.03,-.03]} scale={[.16,.3,.18]} material={material}><sphereGeometry args={[1,20,20]}/></mesh>
  </group>)}
  <mesh material={scanMaterial} scale={[.918,1.19,.765]}><sphereGeometry args={[1,48,40]}/></mesh>
  <mesh scale={[.914,1.183,.756]}><sphereGeometry args={[1,24,18]}/><meshBasicMaterial color="#e7bd95" wireframe transparent opacity={.19} depthWrite={false}/></mesh>
  {treatmentZones.map(zone=><group key={zone.id} position={[zone.x,zone.y,zone.z]}>
   <mesh onClick={(event)=>{event.stopPropagation();onSelect(zone.id)}} scale={selected===zone.id?1.4:1}>
    <sphereGeometry args={[.055,16,16]}/><meshBasicMaterial color={selected===zone.id?'#fff1d0':'#c99b7b'}/>
   </mesh><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[selected===zone.id ? .12 : .082,.007,8,40]}/><meshBasicMaterial color={selected===zone.id?'#ffe7c6':'#b9957b'} transparent opacity={.9}/></mesh>
  </group>)}
 </group>
}
function ImportedFace(){
 const {scene}=useGLTF('/media/rosto.glb');
 return <primitive object={scene.clone()} scale={1} position={[0,-.15,0]}/>;
}
export default function FaceScene({selected,onSelect}:{selected:string;onSelect:(id:string)=>void}){
 return <Canvas className="face-canvas" camera={{position:[0,.03,4.4],fov:41}} dpr={[1,1.6]} gl={{alpha:true,antialias:true,powerPreference:'low-power'}} frameloop="always">
  <PerformanceMonitor><AdaptiveDpr pixelated/></PerformanceMonitor><ambientLight intensity={1.1}/><directionalLight position={[-3,4,5]} intensity={3.3} color="#ffe3c9"/><pointLight position={[3,-1,2]} intensity={28} color="#ae795e" distance={9}/><pointLight position={[-3,3,-4]} intensity={16} color="#d7ac8c" distance={10}/>{process.env.NEXT_PUBLIC_FACE_GLB_READY==='true'?<ImportedFace/>:<FaceSculpture selected={selected} onSelect={onSelect}/>}<OrbitControls enablePan={false} enableZoom minDistance={3.5} maxDistance={5.1} minPolarAngle={.65} maxPolarAngle={2.32} rotateSpeed={.65} target={[0,-.05,0]}/>
 </Canvas>
}
