import React, { Component } from 'react'
import classNames from 'classnames'
import { countries } from './../../constans'
import styles from './UserInfo.module.sass'
import PropTypes from 'prop-types'

class UserInfo extends Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	getFullName = (user) => {
		const { name } = user
		return `${name.first} ${name.last}`
	}

	render() {
		const { user } = this.props

		const { gender, email } = user

		const userStyleBorder = classNames(styles.userInfoContainer, {
			[styles.userBorderMale]: gender === 'male',
			[styles.userBorderFemale]: gender !== 'male',
		})

		const countryCode = user.nat ? user.nat.toUpperCase() : null
		const flagCountry = countries[countryCode]

		return (
			<div className={userStyleBorder}>
				<div className={styles.userInfoPicture}>
					<img
						src={user.picture.large}
						alt={`${this.getFullName(user)} photo`}
					/>
				</div>
				<h1 className={styles.userInfoName}>
					<span>{flagCountry}</span>
					{this.getFullName(user)}
				</h1>
				<div className={styles.userInfoEmail}>{email}</div>
				{user.phone && <div className={styles.userInfoPhone}>{user.phone}</div>}
			</div>
		)
	}
}

export default UserInfo

UserInfo.propTypes = {
	user: PropTypes.object.isRequired,
}
