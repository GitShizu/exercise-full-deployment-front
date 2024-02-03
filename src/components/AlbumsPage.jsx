import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useUser } from "../../context/UserContext"
import { axiosHeaders } from "../../libraries/utilities"
const { VITE_API_URL } = import.meta.env

export default () => {

    const { token } = useUser();

    const [albums, setAlbums] = useState()
    const [error, setError] = useState()
    const [musicians, setMusicians] = useState()
    const [formData, setFormData] = useState({
        title: '',
        musician: '',
        duration_seconds: 0
    })

    let isFormValid = formData.title.trim().length > 0 && formData.musician !== '' && formData.duration_seconds > 1;

    const blankFormData = {
        title: '',
        musician: '',
        duration_seconds: 0
    }
    const [feedback, setFeedback] = useState();
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        axios.get(`${VITE_API_URL}/albums`, axiosHeaders(token))
            .then(obj => {
                setAlbums(obj.data)
            })
            .catch(e => {
                setError(e)
                console.error(e)
            })
    }, [refresh])

    useEffect(() => {
        axios.get(`${VITE_API_URL}/musicians`, axiosHeaders(token))
            .then(obj => setMusicians(obj.data)
            )
            .catch(e => {
                setError(e)
                console.error(e)
            })
    }, [])

    const addAlbum = (body) => {
        axios.post(`${VITE_API_URL}/albums`, body, axiosHeaders(token))
            .then((obj) => {
                setRefresh(!refresh)
                setFeedback('Album added successfully')

            })
            .catch(e => {
                setFeedback('Please insert a valid musician stage name')
                setError(e)
                console.error(e.message)
            })
    }

    const deleteAlbum = (slug) => {
        axios.delete(`${VITE_API_URL}/albums/${slug}`, axiosHeaders(token))
            .then(() => {
                setFeedback('Album deleted successfully')

                setRefresh(!refresh)
            }).catch(e => {
                setError(e)
                console.error(e.message)
            })
    }
    // console.log(albums, musicians);
    // console.log(error);
    return (
        <section >
            <section className="page">
                {error ?
                    <p>{error}</p>
                    :
                    <>
                        {(albums === undefined || musicians === undefined) ?
                            <p>Loading...</p>
                            :
                            <>
                                {albums?.length < 1 ?
                                    <p>No albums were found</p>
                                    :
                                    <div className="list">
                                        <h2>Albums list</h2>
                                        <ul>
                                            {albums.map((a, i) => {
                                                return (
                                                    <li key={i}>
                                                        <Link
                                                            to={`/albums/${a.slug}`}
                                                            className={'link'}>
                                                            {`Title: ${a.title}, Author: ${a.musician && a.musician.stageName}, duration: ${a.duration_seconds}s`}
                                                        </Link>
                                                        <button
                                                            className="remove_btn"
                                                            onClick={() => {
                                                                deleteAlbum(a.slug)
                                                            }}
                                                        >Remove</button>
                                                    </li>
                                                )

                                            })}
                                        </ul>
                                    </div>
                                }

                                <div className="add-new">
                                    <h2>Add new album</h2>
                                    <label> <b>Title</b>
                                        <input
                                            value={formData.title}
                                            onChange={e => setFormData({
                                                ...formData,
                                                title: e.target.value
                                            })}
                                            type="text" />
                                    </label>
                                    <label ><b>Musician</b>
                                        <select
                                            value={formData.musician}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    musician: e.target.value
                                                })
                                            }}
                                        >
                                            <option value="">Select musician</option>
                                            {musicians?.map(m => {
                                                return (
                                                    <option
                                                        key={m._id}
                                                        value={m._id}
                                                    >{m.stageName}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </label>
                                    <label ><b>Duration (sec)</b>
                                        <input
                                            onChange={e => setFormData({
                                                ...formData,
                                                duration_seconds: e.target.value
                                            })}
                                            value={formData.duration_seconds}
                                            type="number" />
                                    </label>

                                    <button
                                        disabled={!isFormValid}
                                        onClick={() => {
                                            addAlbum(formData)
                                            setFormData(blankFormData)
                                        }}
                                    >Add</button>
                                    <div>
                                        {feedback}
                                    </div>
                                </div>
                            </>}
                    </>}
            </section>
        </section>

    )
}

