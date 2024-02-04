import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import NotFound from "./NotFound";
import { axiosHeaders } from "../../libraries/utilities";
import { useUser } from "../../context/UserContext";
const { VITE_API_URL } = import.meta.env;
export default () => {

    const { token } = useUser()

    const { slug } = useParams()
    const [album, setAlbum] = useState()
    const [relatedAlbums, setRelatedAlbums] = useState();
    const blankFormData = {
        title: '',
        musician: '',
        duration_seconds: ''
    }
    const [musicians, setMusicians] = useState([])
    const [formData, setFormData] = useState(blankFormData)
    const [feedback, setFeedback] = useState()
    const [error, setError] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${VITE_API_URL}/albums/${slug}`, axiosHeaders(token))
            .then(obj => {
                // console.log(obj);
                setAlbum(obj.data)
            })
            .catch((e) => {
                console.log(e.message)
                setError(true)
            })
    }, [refresh])


    useEffect(() => {
        if (album) {
            axios.get(`${VITE_API_URL}/musicians/${album.musician.slug}`, axiosHeaders(token))
                .then((obj) => {
                    console.log(obj.data)
                    setRelatedAlbums(obj.data.albums)
                }
                )
        }

    }, [album])

    useEffect(() => {
        axios.get(`${VITE_API_URL}/musicians`, axiosHeaders(token))
            .then(obj => setMusicians(obj.data))
            .catch(e => console.error(e))
    }, [])

    const editAlbum = (newProps) => {
        const validProps = {}
        Object.entries(newProps).forEach(([key, value]) => {
            if (value !== '' && value !== undefined) {
                validProps[key] = value
            }
        })
        if (Object.keys(validProps).length > 0) {

            axios.patch(`${VITE_API_URL}/albums/${slug}`, validProps, axiosHeaders(token))
                .then((obj) => {
                    setFeedback('Album updated successfully')
                    setAlbum(obj.data)
                    navigate(`/albums/${obj.data.slug}`)
                    setRefresh(!refresh)
                })
                .catch(e => {
                    setFeedback('Please insert valid data')
                    console.error(e.message)
                })

        }
    }


    return (
        <>
            {error ?
                <NotFound />
                :
                <>
                    {album === undefined ?
                        <h1>Loading...</h1>
                        :
                        <>
                            <section>
                                <h1>{album.title}</h1>
                                <h2>{album.musician.stageName}</h2>
                                <h3>{album.duration_seconds}</h3>
                                <figure>
                                    <img className="details-img" src={`${album.cover}${album.title}`} alt="album_cover" />
                                </figure>
                            </section>
                            <div className="add-new">
                                <h2>Edit album</h2>
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
                                        {musicians.map(m => {
                                            return (
                                                <option
                                                    key={m._id}
                                                    value={m.slug}
                                                >{m.stageName}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </label>
                                <label ><b>duration (sec)</b>
                                    <input
                                        onChange={e => setFormData({
                                            ...formData,
                                            duration_seconds: e.target.value
                                        })}
                                        value={formData.duration_seconds}
                                        type="text" />
                                </label>
                                <button
                                    onClick={() => {
                                        editAlbum(formData)
                                        setFormData(blankFormData)
                                    }}
                                >Edit</button>
                                <div>
                                    {feedback}
                                </div>
                            </div>
                            <br />
                            <h3>Albums:</h3>
                            <ul>
                                {relatedAlbums?.map(a => {
                                    return (
                                        <Link
                                            key={a._id}
                                            to={`/albums/${a.slug}`}>
                                            <li>
                                                <p>{a.title}</p>
                                            </li>
                                        </Link>
                                    )
                                })}
                            </ul>
                        </>
                    }
                </>
            }

        </>

    )
}

