import axios from "axios"
import { useEffect, useState } from "react"
const { VITE_PORT } = import.meta.env
export default () => {

    const [albums, setAlbums] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        musician: '',
        duration_seconds: 0
    })
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        axios.get(`${VITE_PORT}/albums`)
            .then(obj =>setAlbums(obj.data)
            )
            .catch(e => console.error(e))
    }, [refresh])

    const addAlbum = (body) => {
        axios.post(`${VITE_PORT}/albums`, body)
            .then(() => {
                setRefresh(!refresh)
            })
            .catch(e => console.error(e))
    }

    return (
        <section className="page">

            {albums.length === 0 ?
                <h1>Loading...</h1>
                :
                <section >
                    <div className="list">
                        <h2>Albums list</h2>
                        <ul>
                            {albums.map((a, i) => {
                                return (
                                    <li key={i}>
                                        {`Title: ${a.title}, Author: ${a.musician && a.musician.stageName}, duration: ${a.duration_seconds}s`}
                                    </li>
                                )

                            })}
                        </ul>
                    </div>
                    <div className="add-new">
                        <h2>Add new album</h2>
                        <label >Title__
                            <input
                                value={formData.title}
                                onChange={e => setFormData({
                                    ...formData,
                                    title: e.target.value
                                })}
                                type="text" />
                        </label>
                        <label >Author__
                            <input
                                value={formData.musician}
                                onChange={e => setFormData({
                                    ...formData,
                                    musician: e.target.value
                                })}
                                type="text" />
                        </label>
                        <label >Duration (sec)__
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
                    </div>
                </section>
            }

        </section>

    )
}