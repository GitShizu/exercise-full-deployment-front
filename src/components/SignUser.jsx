import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";



export default ({ type }) => {

    const { logIn, signUp, error, loading } = useUser();

    const title = type === 'login' ? 'Log In' : 'Sign Up';
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: ''
    })

    const navigate = useNavigate()

    const signUser =  (e) => {
        e.preventDefault()
        if (type == 'login') {
             logIn(formData)
        } else {
             signUp(formData)
        }
        navigate('/')
    }

    return (
        <div className="signup">

            <h1>{title}</h1>
            <form>

                <div>
                    <p>Email</p>
                    <input
                        value={formData.email}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }}
                        type='email' />
                </div>
                <div>
                    <p>Password</p>
                    <input
                        value={formData.password}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                password: e.target.value
                            })
                        }}
                        type='password' />
                </div>
                {type === 'signup' &&
                    <>
                        <div>
                            <p>Confirm password</p>
                            <input
                                value={formData.password2}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        password2: e.target.value
                                    })
                                }}
                                type='password' />
                        </div>
                    </>
                }
                <div>
                    <button
                        disabled={loading}
                        onClick={(e) => signUser(e)}
                    >
                        {title}
                    </button>
                </div>
                {loading && <div>Loading...</div>}
                {error && <div>{error.message}</div>}
            </form>
        </div>
    )
}