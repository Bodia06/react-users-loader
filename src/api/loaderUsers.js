export default function loaderUsers(parametersUsers, gender = 'all') {
	return fetch(
		`https://randomuser.me/api/?inc=${parametersUsers}&results=5&gender=${gender}`
	).then((response) => {
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		return response.json()
	})
}
