import { Button, Card, Flex, Inline, Spinner, Stack, Text } from '@sanity/ui'
import { CloseIcon, GenerateIcon, DownloadIcon } from '@sanity/icons'
import { DialogLabels, EditorLayout, SanityDocument } from './types'
import * as React from 'react'

import EditorField from './EditorField'
import LayoutsPicker from './LayoutsPicker'
import useEditorLogic from './useEditorLogic'

export interface EditorProps {
	layouts: EditorLayout[]
	onSelect?: (...props: any) => void
	onClose?: () => void
	document: SanityDocument
	dialog?: DialogLabels
	scheme?: 'dark' | 'light'
}

const DEFAULT_DIMENSIONS = {
	width: 1200,
	height: 630,
}

const Editor: React.FC<EditorProps> = (props) => {
	const {
		activeLayout,
		setActiveLayout,
		generateImage,
		downloadImage,
		disabled,
		captureRef,
		data,
		setData,
	} = useEditorLogic(props)
	const { dialog, onClose, layouts, scheme } = props
	const LayoutComponent = activeLayout.component as any
	const fields = activeLayout.fields || []
	const width = activeLayout.dimensions?.width || DEFAULT_DIMENSIONS.width
	const height = activeLayout.dimensions?.height || DEFAULT_DIMENSIONS.height

	return (
		<Card
			scheme={scheme}
			height="fill"
			sizing="border"
			display="flex"
			style={{ flexDirection: 'column' }}
		>
			<Card
				scheme={scheme}
				tone="default"
				padding={4}
				marginBottom={[4, 0]}
				borderBottom
				style={{ textAlign: 'right' }}
			>
				<Flex justify="space-between" align="center">
					<Inline space={3}>
						<Text size={3} weight="semibold">
							{dialog?.title || 'Create image'}
						</Text>
						{onClose && (
							<Button
								icon={disabled ? Spinner : GenerateIcon}
								tone="positive"
								text={dialog?.finishCta || 'Generate'}
								onClick={generateImage}
								disabled={disabled}
							/>
						)}
						<Button
							icon={disabled ? Spinner : DownloadIcon}
							tone="default"
							text={dialog?.finishCta || 'Download'}
							onClick={downloadImage}
							disabled={disabled}
						/>
					</Inline>
					{/* If onClose is defined, we're in an assetSource, where we should provide a header with a close button */}
					{onClose && (
						<Button
							onClick={onClose}
							icon={CloseIcon}
							mode="bleed"
							tone="critical"
							title={dialog?.ariaClose || 'close'}
						/>
					)}
				</Flex>
			</Card>
			<Flex
				justify="flex-start"
				align="flex-start"
				wrap="wrap"
				overflow="auto"
				style={{ width: '100%', height: 'auto', minHeight: '0' }}
				sizing="border"
				padding={3}
			>
				<Card
					scheme={scheme}
					padding={3}
					marginRight={4}
					style={{ maxWidth: '350px', flex: '1 0 200px' }}
					sizing="border"
				>
					<Stack space={4}>
						{fields.map((field) => (
							<EditorField
								key={field.name}
								field={field}
								updateData={(newData) => setData(newData)}
								data={data}
								disabled={disabled}
							/>
						))}
					</Stack>
				</Card>
				<Card
					scheme={scheme}
					height="fill"
					overflow="auto"
					style={{
						padding: '20px 10px',
						maxWidth: `${width + 10 * 2}px`,
					}}
					shadow={3}
					sizing="border"
				>
					<Stack space={3}>
						<LayoutsPicker
							layouts={layouts}
							activeLayout={activeLayout}
							disabled={disabled}
							setActiveLayout={setActiveLayout}
						/>

						<div
							style={{
								width: `${width}px`,
								height: `${height}px`,
								boxSizing: 'border-box',
							}}
							ref={captureRef}
						>
							<LayoutComponent {...data} />
						</div>
					</Stack>
				</Card>
			</Flex>
		</Card>
	)
}

export default Editor
