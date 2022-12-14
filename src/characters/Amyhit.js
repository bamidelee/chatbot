/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function AmyHit(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/amyhit.glb')
  const { actions } = useAnimations(animations, group)
  useEffect(() => {
    actions['Armature|mixamo.com|Layer0.011'].play();
  }); 
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Girl_Body_Geo" geometry={nodes.Girl_Body_Geo.geometry} material={materials['Girl01_Body_MAT1.005']} skeleton={nodes.Girl_Body_Geo.skeleton} />
          <skinnedMesh name="Girl_Brows_Geo" geometry={nodes.Girl_Brows_Geo.geometry} material={materials['Girl01_Brows_MAT1.005']} skeleton={nodes.Girl_Brows_Geo.skeleton} />
          <skinnedMesh name="Girl_Eyes_Geo" geometry={nodes.Girl_Eyes_Geo.geometry} material={materials['Girl01_Eyes_MAT1.005']} skeleton={nodes.Girl_Eyes_Geo.skeleton} />
          <skinnedMesh name="Girl_Mouth_Geo" geometry={nodes.Girl_Mouth_Geo.geometry} material={materials['Girl01_Mouth_MAT1.005']} skeleton={nodes.Girl_Mouth_Geo.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/amyhit.glb')
