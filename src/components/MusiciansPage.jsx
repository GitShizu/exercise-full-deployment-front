import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useUser } from "../../context/UserContext"
import { axiosHeaders } from "../../libraries/utilities"
const { VITE_API_URL } = import.meta.env

export default () => {

    const { token } = useUser();

    const [musicians, setMusicians] = useState()
    const [error, setError] = useState()
    const blankFormData = {
        stageName: '',
        firstName: '',
        lastName: '',
        birthDate: ''
    }
    const [formData, setFormData] = useState(blankFormData)
    const [feedback, setFeedback] = useState();
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        axios.get(`${VITE_API_URL}/musicians`, axiosHeaders(token))
            .then(obj => setMusicians(obj.data)
            )
            .catch(e => {
                setError(e)
                console.error(e)
            })
    }, [refresh])

    const addMusician = (body) => {
        axios.post(`${VITE_API_URL}/musicians`, body, axiosHeaders(token))
            .then(() => {
                setRefresh(!refresh)
                setFeedback('Musician added successfully')
            })
            .catch(e => {
                setFeedback('Please insert valid data')
                console.error(e)
            })
    }

    const deleteMusician = (slug) => {
        axios.delete(`${VITE_API_URL}/musicians/${slug}`, axiosHeaders(token))
            .then(() => {
                setFeedback('Musician deleted successfully')
                setRefresh(!refresh)
            }).catch(e => console.error(e.message))
    }

    return (
        <section >
            <section className="page">
                {error ?
                    <p>{error}</p>
                    :
                    <>
                        {musicians === undefined ?
                            <p>Loading...</p>
                            :
                            <>
                                {musicians.length < 1 ?
                                    <p>No musicians found</p>
                                    :
                                    <div className="list">
                                        <h2>musicians list</h2>
                                        <ul>
                                            {musicians.map((m, i) => {
                                                return (
                                                    <li key={i}>
                                                        <Link
                                                            to={`/musicians/${m.slug}`}
                                                            className={'link'}>
                                                            {`${m.stageName} (${m.albumsCount})`}
                                                        </Link>
                                                        <button
                                                            className="remove_btn"
                                                            onClick={() => {
                                                                deleteMusician(m.slug)
                                                            }}
                                                        >Remove</button>
                                                    </li>
                                                )

                                            })}
                                        </ul>
                                    </div>
                                }
                            </>}
                        <div className="add-new">
                            <h2>Add new musician</h2>
                            <label> <b>Stage Name</b>
                                <input
                                    value={formData.stageName}
                                    onChange={e => setFormData({
                                        ...formData,
                                        stageName: e.target.value
                                    })}
                                    type="text" />
                            </label>
                            <label ><b>First Name</b>
                                <input
                                    value={formData.firstName}
                                    onChange={e => setFormData({
                                        ...formData,
                                        firstName: e.target.value
                                    })}
                                    type="text" />
                            </label>
                            <label ><b>Last Name</b>
                                <input
                                    onChange={e => setFormData({
                                        ...formData,
                                        lastName: e.target.value
                                    })}
                                    value={formData.lastName}
                                    type="text" />
                            </label>
                            <label ><b>Birth date</b>
                                <input
                                    onChange={e => setFormData({
                                        ...formData,
                                        birthDate: e.target.value
                                    })}
                                    value={formData.birthDate}
                                    type="date" />
                            </label>
                            <button
                                onClick={() => {
                                    addMusician(formData)
                                    setFormData(blankFormData)
                                }}

                            >Add</button>
                            <div>
                                {feedback}
                            </div>
                        </div>
                    </>
                }
            </section>
        </section>
    )
}

