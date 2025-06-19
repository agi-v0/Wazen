'use client'

// import { useDraftModeEnvironment } from 'next-sanity/hooks'
import { usePathname } from 'next/navigation'
// import { VscSymbolField, VscBeakerStop } from 'react-icons/vsc'
import { createDataAttribute, SanityDocument, stegaClean } from 'next-sanity'
import Module from 'module'
import { Icon } from '@iconify-icon/react'

interface GlobalModule extends SanityDocument {
	path: string
	excludePaths?: string[]
	modules?: Module[]
}

export default function DraftModeControls({
	globalModules,
}: {
	globalModules?: GlobalModule[]
}) {
	// const environment = useDraftModeEnvironment()
	// if (!['live', 'unknown'].includes(environment)) return null

	const pathname = usePathname()

	const filteredGlobalModules = globalModules
		?.filter(({ path, excludePaths: ex }) => {
			const p = stegaClean(path)
			const curr = pathname.replace(/^\//, '')

			return (
				p === '*' ||
				(curr.startsWith(p) && !ex?.some((e) => curr.startsWith(e)))
			)
		})
		.sort((a, b) => a.path.localeCompare(b.path))

	return (
		<details className="fixed bottom-7 left-0 right-0 z-10 mx-auto h-10 w-fit rounded-full bg-amber-200 text-sm open:h-auto open:rounded-2xl open:opacity-100">
			<summary className="p-2">Draft Mode</summary>

			<menu className="p-2 pt-0">
				{filteredGlobalModules?.map(({ _id, path }) => {
					const attr = createDataAttribute({
						id: _id,
						type: 'global-module',
						path: 'path',
					})

					return (
						<li key={_id}>
							<button
								className="inline-flex items-center gap-1 py-0.5"
								data-sanity={attr().toString()}
							>
								<Icon
									icon="ph:globe-simple-bold"
									className="shrink-0 text-cyan-950/60"
								/>
								Global modules (<code>{path}</code>)
							</button>
						</li>
					)
				})}

				<hr className="my-1" />

				<li>
					<a
						className="inline-flex items-center gap-1 py-0.5 text-cyan-950 hover:underline"
						href="/api/disable-draft"
					>
						<Icon
							icon="ph:pencil-simple-slash-bold"
							className="shrink-0 text-cyan-950/60"
						/>
						Disable Draft Mode
					</a>
				</li>
			</menu>
		</details>
	)
}
