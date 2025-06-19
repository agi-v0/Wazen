import { draftMode } from 'next/headers'
import { fetchSanityLive, SanityLive } from '@/sanity/lib/fetch'
import { groq, VisualEditing } from 'next-sanity'
import DraftModeControls from './DraftModeControls'
import { Icon } from '@iconify-icon/react/dist/iconify.mjs'

export default async function VisualEditingControls() {
	// const globalModules = await fetchSanityLive({
	// 	query: groq`*[_type == 'global-module']{
	// 		_id,
	// 		path,
	// 		excludePaths[]
	// 	}`,
	// })

	return (
		<>
			<SanityLive />
			{(await draftMode()).isEnabled && (
				<>
					<VisualEditing />
					{/* <DraftModeControls globalModules={globalModules} /> */}

					<a
						href="/api/disable-draft"
						className="fixed bottom-7 left-0 right-0 z-10 mx-auto flex w-fit flex-row items-center gap-1 rounded-full bg-amber-200 px-3 py-1.5 text-sm font-medium uppercase text-amber-950/60 shadow-sm transition-colors hover:bg-amber-300"
					>
						<Icon
							icon="ph:pencil-simple-slash-bold"
							className="shrink-0 text-amber-950/60"
						/>
						Disable Draft Mode
					</a>
				</>
			)}
		</>
	)
}
