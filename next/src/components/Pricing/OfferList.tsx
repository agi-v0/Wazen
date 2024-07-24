import { FiCheck } from 'react-icons/fi'
import { RxCross2 } from 'react-icons/rx'

const OfferList = ({
	text,
	status,
}: {
	text: string
	status: 'active' | 'inactive'
}) => {
	return (
		<div className="mb-3 flex gap-x-4 items-center">
			<span className="bg-primary text-primary flex h-[18px] w-full max-w-[18px] items-center justify-center rounded-full bg-opacity-10">
				{status === 'active' ? (
					<FiCheck className="text-green-600" />
				) : (
					<RxCross2 className="text-red-600" />
				)}
			</span>
			<p className="text-body-color m-0 text-base font-medium">{text}</p>
		</div>
	)
}

export default OfferList
