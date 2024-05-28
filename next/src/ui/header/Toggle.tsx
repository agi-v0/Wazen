import { AiOutlineMenu } from 'react-icons/ai'

export default function Toggle() {
	return (
		<label className="[grid-area:toggle] md:hidden mt-1">
			<input id="header-open" type="checkbox" hidden />
			<span className="header-closed:hidden">
				<AiOutlineMenu />
			</span>
			<span className="hidden header-closed:block">
				<AiOutlineMenu />
			</span>
		</label>
	)
}
