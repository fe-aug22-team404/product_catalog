import { FC } from 'react';
import { Contributor } from '../../../types/Contributor';
import './Person.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';


type Props = {
	person: Contributor,
}

export const Person: FC<Props> = ({ person }) => {
	const {
		name,
		photo,
		linkedIn,
		git,
		email,
	} = person;
	return (
		<>


			<div className='person'>
				<div className="person__photo-box">
					<img src={photo} alt="creator" className="person__photo" />
				</div>

				<div className="person__data">
					<h2 className='person__name'>
						{name.split(' ')[0]} <br />
						{name.split(' ')[1]}
					</h2>

					<div className="person__work-links">
						<a
							href={`https://${linkedIn}`}
							className="person__tag"
							rel="noreferrer"
						>
							<FontAwesomeIcon icon={faLinkedin} className="person__icon" />
						</a>

						<a
							href={`https://${git}`}
							className="person__tag"
							target='_blank'
							rel="noreferrer"
						>
							<FontAwesomeIcon icon={faGithub} className="person__icon" />
						</a>
					</div>

					<div
						className="person__email-box"
					>
						<FontAwesomeIcon icon={faEnvelope} className="person__icon person__icon--margin-right"/>
						<span className="person__text">{email}</span>
					</div>
				</div>
			</div>
		</>

	)
}
