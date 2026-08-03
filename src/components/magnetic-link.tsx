'use client'
import Link from 'next/link'
import { useRef,useState } from 'react'
import { useReducedMotion } from 'motion/react'
export function MagneticLink({ href, children }: { href: string; children: React.ReactNode }) { const ref=useRef<HTMLAnchorElement>(null); const [o,setO]=useState({x:0,y:0}); const reduce=useReducedMotion(); return <Link ref={ref} href={href} onMouseMove={e=>{if(reduce||!ref.current)return;const r=ref.current.getBoundingClientRect();setO({x:((e.clientX-r.left)/r.width-.5)*28,y:((e.clientY-r.top)/r.height-.5)*28})}} onMouseLeave={()=>setO({x:0,y:0})} style={{transform:`translate(${o.x}px,${o.y}px)`}} className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-[transform,background-color] duration-200 hover:bg-[#9f4f9d] dark:bg-white dark:text-gray-900 dark:hover:bg-[#9f4f9d] dark:hover:text-white">{children}</Link> }
