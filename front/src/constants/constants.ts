const JwtSecret = import.meta.env.VITE_JWT_SECRET

const LimitCats = 15

const UserLocalStorageName = 'user'

const PORTION_OF_ITEMS = 15

const isLoggedInCookie = 'isLoggedIn'

const loggedInState = '1'
const logoutState = '0'

export {
	JwtSecret,
	LimitCats,
	PORTION_OF_ITEMS,
	UserLocalStorageName,
	isLoggedInCookie,
	loggedInState,
	logoutState,
}
