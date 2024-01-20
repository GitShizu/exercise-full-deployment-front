import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
const { VITE_API_URL } = import.meta.env
export default () => {

    const [albums, setAlbums] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        musician: '',
        duration_seconds: 0
    })
    const [feedback, setFeedback] = useState();
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        axios.get(`${VITE_API_URL}/albums`)
            .then(obj => setAlbums(obj.data)
            )
            .catch(e => console.error(e))
    }, [refresh])

    const addAlbum = (body) => {
        axios.post(`${VITE_API_URL}/albums`, body)
            .then(() => {
                setRefresh(!refresh)
                setFeedback('Album added successfully')
            })
            .catch(e => {
                setFeedback('Please insert a valid musician stage name')
                console.error(e.message)
            })
    }

    const deleteAlbum = (id) => {
        axios.delete(`${VITE_API_URL}/albums/${id}`)
            .then(() => {
                setFeedback('Album deleted successfully')
                setRefresh(!refresh)
            }).catch(e => console.error(e.message))
    }

    return (
        <section >

            {albums.length === 0 ?
                <h1>Loading...</h1>
                :
                <section className="page">
                    <div className="list">
                        <h2>Albums list</h2>
                        <ul>
                            {albums.map((a, i) => {
                                return (
                                    <li key={i}>
                                        <Link 
                                        to={`/albums/${a._id}`}
                                        className={'link'}>
                                            {`Title: ${a.title}, Author: ${a.musician && a.musician.stageName}, duration: ${a.duration_seconds}s`}
                                        </Link>
                                        <button
                                            className="remove_btn"
                                            onClick={() => {
                                                deleteAlbum(a._id)
                                            }}
                                        >Remove</button>
                                    </li>
                                )

                            })}
                        </ul>
                    </div>
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
                            <input
                                value={formData.musician}
                                onChange={e => setFormData({
                                    ...formData,
                                    musician: e.target.value
                                })}
                                type="text" />
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
                            onClick={() => { addAlbum(formData) }}
                        >Add</button>
                        <div>
                            {feedback}
                        </div>
                    </div>
                </section>
            }

        </section>

    )
}