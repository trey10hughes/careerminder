import Firebase, { db } from '../config/Firebase.js'

// define types

export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const UPDATE_TITLE = 'UPDATE_TITLE'
export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'

// actions

export const updateEmail = email => {
	return {
		type: UPDATE_EMAIL,
		payload: email
	}
}

export const updateTitle = (title) => {
	console.log(title)
	return {
		type: UPDATE_TITLE,
		payload: title
	}
}

export const updatePassword = password => {
	return {
		type: UPDATE_PASSWORD,
		payload: password
	}
}

export const login = () => {
	return async (dispatch, getState) => {
		try {
			const { email, password } = getState().user
			const response = await Firebase.auth().signInWithEmailAndPassword(email, password)

			dispatch(getUser(response.user.uid))
		} catch (e) {
			alert(e)
		}
	}
}

export const getUser = uid => {
	return async (dispatch, getState) => {
		try {
			const user = await db
				.collection('users')
				.doc(uid)
				.get()

			dispatch({ type: LOGIN, payload: user.data() })
		} catch (e) {
			alert(e)
		}
	}
}

export const signup = () => {
	return async (dispatch, getState) => {
		try {
			//get user info from signup form and create a firebase user with it
			const { email, password } = getState().user
			const response = await Firebase.auth().createUserWithEmailAndPassword(email, password)
			//if a user is created, initialize it with info from the form, other fields left blank
			if (response.user.uid) {
				const user = {
					uid: response.user.uid,
					email: email,
					firstName: "",
					lastName: "",
					phone: "",
					summary: "",
					cerfifications: "",
					achievements: "",
					associations: "",
					volunteering: "",
					desiredSalary: "",
					industry: "",
					experience: "",
					title: "",
					highestEducation: "",
					additionalInfo: ""
				}
				//finds the user document with the matching ID from response.user.uid and initializes it in the db with the info from the user object
				db.collection('users')
					.doc(response.user.uid)
					.set(user)

				dispatch({ type: SIGNUP, payload: user })
			}
		} catch (e) {
			alert(e)
		}
	}
}

export const updateUserTitle = (uid, title) => {
	return async (dispatch, getState) => {
		try {
			console.log("testing updateUserTitle fn")
			console.log(uid)
			console.log(title)
			
			db.collection('users')
				.doc(uid)
				.update({
				title: title,
				});

		} catch (e) {
			alert(e)
		}
	}
}

export const uploadUserResume = (file) => {
	
	return async (dispatch, getState) => {
		try {
			console.log("uploadUserResume")
			console.log(file)

		} catch (e) {
			alert(e)
		}
	}
}