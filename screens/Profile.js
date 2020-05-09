import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Firebase from '../config/Firebase'
import { updateTitle, updateUserTitle } from '../actions/user'

class Profile extends React.Component {
	handleSignout = () => {
		Firebase.auth().signOut()
		this.props.navigation.navigate('Login')
	}

	handleTitleUpdate = () => {
		console.log(this.props.user.uid)
		this.props.updateUserTitle(this.props.user.uid, this.props.user.title)
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Profile Screen</Text>
				<Text>{this.props.user.email}</Text>
				<Button title='Logout' onPress={this.handleSignout} />
				<TextInput
					style={styles.inputBox}
					value={this.props.user.title}
					onChangeText={title => this.props.updateTitle(title)}
					placeholder='Title'
					autoCapitalize='none'
				/>
				<TouchableOpacity style={styles.button} onPress={this.handleTitleUpdate}>
					<Text style={styles.buttonText}>Update Title</Text>
				</TouchableOpacity>
			</View>
				
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputBox: {
		width: '85%',
		margin: 10,
		padding: 15,
		fontSize: 16,
		borderColor: '#d3d3d3',
		borderBottomWidth: 1,
		textAlign: 'center'
	},
	button: {
		marginTop: 30,
		marginBottom: 20,
		paddingVertical: 5,
		alignItems: 'center',
		backgroundColor: '#FFA611',
		borderColor: '#FFA611',
		borderWidth: 1,
		borderRadius: 5,
		width: 200
	},
	buttonText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff'
	},
	buttonSignup: {
		fontSize: 12
	}
})

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateTitle, updateUserTitle }, dispatch)
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile)
