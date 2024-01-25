import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
const { VITE_API_URL } = import.meta.env
export default () => {

    const [musicians, setMusicians] = useState([])
    const [formData, setFormData] = useState({
        stageName: '',
        firstName: '',
        lastName: '',
        birthDate: ''
    })

    const [feedback, setFeedback] = useState();
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        axios.get(`${VITE_API_URL}/musicians`)
            .then(obj => setMusicians(obj.data)
            )
            .catch(e => console.error(e))
    }, [refresh])

    const addMusician = (body) => {
        axios.post(`${VITE_API_URL}/musicians`, body)
            .then(() => {
                setRefresh(!refresh)
                setFeedback('Musician added successfully')
            })
            .catch(e => {
                setFeedback('Please insert valid data')
                console.error(e.message)
            })
    }

    const deleteMusician = (slug) => {
        axios.delete(`${VITE_API_URL}/musicians/${slug}`)
            .then(() => {
                setFeedback('Musician deleted successfully')
                setRefresh(!refresh)
            }).catch(e => console.error(e.message))
    }

    return (
        <section >
            <section className="page">
                {musicians === undefined && <p>Loading...</p>}
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
                                            {`${m.stageName} | ${m.albums.map(a => a.title)}`}
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
                            value={formData.duration_seconds}
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
                        onClick={() => { addMusician(formData) }}
                    >Add</button>
                    <div>
                        {feedback}
                    </div>
                </div>
            </section>
        </section>

    )
}

