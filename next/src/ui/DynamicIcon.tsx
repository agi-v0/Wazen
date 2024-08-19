import * as piIcons from 'react-icons/pi'
import { IconType } from 'react-icons'

interface IconProps {
	icon: string
	className: string
}

const Icon = ({ icon, className }: IconProps) => {
	const DynamicIcon = (iconName: string) => {
		const iconsMap = new Map()
		iconsMap.set('Pi', piIcons)

		return iconsMap.get(iconName.substring(0, 2))
	}

	const icons: any = DynamicIcon(icon)
	const TheIcon: IconType = icons[icon]

	return <TheIcon className={className} />
}

export default Icon
