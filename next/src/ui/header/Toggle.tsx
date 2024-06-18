import { PiList } from 'react-icons/pi'

export default function Toggle() {
	return (
		<label className="mt-1 [grid-area:toggle] md:hidden">
			<input id="header-open" type="checkbox" hidden />
			<span className="header-closed:hidden">
				<PiList />
			</span>
			<span className="hidden header-closed:block">
				<PiList />
			</span>
		</label>
	)
}
