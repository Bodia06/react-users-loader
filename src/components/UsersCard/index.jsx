import React, { Component } from 'react'
import PropTypes from 'prop-types'
import loaderUsers from '../../api/loaderUsers'
import UserInfo from './UserInfo'
import styles from './UserCard.module.sass'

export default class UsersCard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			users: [],
			isFetching: false,
			error: null,
		}
		this.isFetched = false
	}

	componentDidMount() {
		if (this.isFetched) return
		this.isFetched = true

		const parameters = ['id', 'name', 'email', 'picture', 'gender', 'nat']
		const answer = prompt('You take phone number for user (yes/no)?', 'no')

		if (answer === 'yes') {
			parameters.push('phone')
		}

		const gender = prompt(
			'Please select the gender of people you want to filter: female/male',
			'all'
		)

		this.setState({ isFetching: true })

		loaderUsers(parameters, gender)
			.then((data) => {
				this.setState({
					users: data.results,
					isFetching: false,
				})
			})
			.catch((error) => this.setState({ error: error.message }))
			.finally(() => {
				this.setState({ isFetching: false })
			})
	}

	render() {
		const { users, isFetching, error } = this.state

		return (
			<>
				{error && (
					<div className={styles.userCardContainerError}>{this.error}</div>
				)}
				{isFetching && (
					<div className={styles.userCardContainerLoading}>Loading...</div>
				)}
				{!error && !isFetching && (
					<div className={styles.userCardContainer}>
						{users.map((user) => (
							<UserInfo key={user.id} user={user} />
						))}
					</div>
				)}
			</>
		)
	}
}
