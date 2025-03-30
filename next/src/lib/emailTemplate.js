import {
	Body,
	Container,
	Head,
	Html,
	Section,
	Text,
	Tailwind,
} from '@react-email/components'
import * as React from 'react'

export const EmailTemplate = ({
	firstName,
	lastName,
	companyName,
	businessField,
	contactNumber,
	email,
	message,
}) => {
	return (
		<Html>
			<Head />
			<Tailwind>
				<Body style={main}>
					<Container style={container}>
						<Section style={section}>
							<Text style={text}>
								<strong>Name: </strong>
								{firstName} {lastName}
							</Text>
							<Text style={text}>
								<strong>Email: </strong> {email}
							</Text>
							<Text style={text}>
								<strong>Company: </strong>
								{companyName}
							</Text>
							<Text style={text}>
								<strong>Business: </strong>
								{businessField}
							</Text>
							<Text style={text}>
								<strong>Phone: </strong>
								{contactNumber}
							</Text>
							<Text style={text}>
								<strong>Message: </strong>
								{message}
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}

export default EmailTemplate

const main = {
	backgroundColor: '#ffffff',
	color: '#24292e',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
}

const container = {
	maxWidth: '480px',
	margin: '0 auto',
	padding: '20px 0 48px',
}

const section = {
	padding: '24px',
	border: 'solid 1px #dedede',
	borderRadius: '5px',
	textAlign: 'center',
}

const text = {
	margin: '0 0 10px 0',
	textAlign: 'left',
}
