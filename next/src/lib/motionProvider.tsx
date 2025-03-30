import { LazyMotion, domMax } from 'motion/react'

export default function Motion({ children }: { children: React.ReactNode }) {
	return <LazyMotion features={domMax}>{children}</LazyMotion>
}
