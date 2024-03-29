import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import NotFound from "./NotFound";
import { useUser } from "../../context/UserContext";
import { axiosHeaders } from "../../libraries/utilities";
const { VITE_API_URL } = import.meta.env;

export default () => {

    const {token} = useUser();

    const { slug } = useParams()
    const [musician, setMusician] = useState()
    const blankFormData = {
        stageName: '',
        firstName: '',
        lastName: '',
        birthDate: ''
    }
    const [formData, setFormData] = useState(blankFormData)
    const [feedback, setFeedback] = useState()
    const [refresh, setRefresh] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${VITE_API_URL}/musicians/${slug}`, axiosHeaders(token))
            .then(obj => {
                setMusician(obj.data)
                console.log(obj)
            })
            .catch((e)=>{
                console.error(e.message)
                setError(true)
            })
            }, [refresh])

    const editMusician = (newProps) => {
        const validProps = {}
        Object.entries(newProps).forEach(([key, value]) => {
            if (value !== '' && value !== undefined) {
                validProps[key] = value
            }
        })
        if (Object.keys(validProps).length > 0) {

            axios.patch(`${VITE_API_URL}/musicians/${slug}`, validProps, axiosHeaders(token))
                .then((obj) => {
                    setFeedback('Musician updated successfully')
                    setMusician(obj.data)
                    navigate(`/musicians/${obj.data.slug}`)
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
            {error? 
            <NotFound/>
            :
             <>
             {
            musician === undefined ?
                <h1>Loading...</h1>
                :
                <>
                    <section>
                        <h1>{musician.stageName}</h1>
                        <h2>{musician.firstName}</h2>
                        <h2>{musician.lastName}</h2>
                        <h2>{dayjs(musician.birthDate).format('DD-MM-YYYY')}</h2>
                        <figure className="details-img">
                            <img src={`${musician.img}`} alt="musician's headshot" />
                        </figure>
                        <ul>{musician.albums?.map((a, i) => {
                            return (
                                <li key={`album_${i}`}>
                                    {a.title}
                                </li>
                            )
                        })}</ul>
                    </section>
                    <section>
                        <div className="add-new">
                            <h2>Edit musician</h2>
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
                                onClick={() => {
                                    editMusician(formData)
                                    setFormData(blankFormData)
                                }}
                            >Edit</button>
                            <div>
                                {feedback}
                            </div>
                        </div>
                    </section>
                </>
            }
             </> 
        }
            
        </>

    )
}