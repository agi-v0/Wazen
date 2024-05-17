import { CiGlobe } from 'react-icons/ci'

function LangSelect() {
	return (
		<div className="flex items-center">
			<CiGlobe />

			<select>
				<option value='ar'>Arabic</option>
				<option value='en'>English</option>
			</select>
		</div>
	)
}

export default LangSelect
