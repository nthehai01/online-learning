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
            const temp = await post('/api/user/google-login', user)
            if (temp) {
                localStorageUtils.setToken(temp.data.content.accessToken)
                localStorageUtils.setUser(temp.data.content)
            }
        } catch (err) { }
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
