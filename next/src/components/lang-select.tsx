import { PiGlobe } from 'react-icons/pi'

function LangSelect() {
	return (
		<div className="flex items-center">
			<PiGlobe />
			<select>
				<option value="ar">Arabic</option>
				<option value="en">English</option>
			</select>
		</div>
	)
}

export default LangSelect
