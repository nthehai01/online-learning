import GoogleLogin from "react-google-login";
import localStorageUtils from "../../utils/LocalStorageUtils";
import { post } from "../../utils/ApiCaller";

const GoogleSignIn = () => {
    const googleSuccess = async (res) => {
        const user = {
            username: res.profileObj.email.split('@')[0],
            password: res.profileObj.googleId,
            fullName: res.profileObj.name,
            picture: res.profileObj.imageUrl,
            email: res.profileObj.email
        }

        try {
            // login if user already exists
            const existingUser = await post('/api/user/login', user)
            if (existingUser) {
                localStorageUtils.setToken(existingUser.data.content.accessToken)
                localStorageUtils.setUser(existingUser.data.content)
            }
        } catch (e) {
            // signup if user does not exist
            try {
                const newUser = await post('/api/user/signup', user)
                if (newUser) {
                    localStorageUtils.setToken(newUser.data.content.accessToken)
                    localStorageUtils.setUser(newUser.data.content)
                }
            } catch (e) { }
        }
    }

    const googleFailure = () => {
        console.log('Google failure')
    }

    return <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy={"single_host_origin"}
    />
}
export default GoogleSignIn;
