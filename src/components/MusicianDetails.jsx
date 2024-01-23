import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
const { VITE_API_URL } = import.meta.env;

export default () => {

    const { id } = useParams()
    const [musician, setMusician] = useState()

    useEffect(() => {
        axios.get(`${VITE_API_URL}/musicians/${id}`)
            .then(obj => setMusician(obj.data))
    }, [])

    return (
        <>
            {musician === undefined ?
                <h1>Loading...</h1>
                :
                <section>
                    <h1>{musician.stageName}</h1>
                    <h2>{musician.firstName}</h2>
                    <h2>{musician.lastName}</h2>
                    <h2>{dayjs(musician.birthDate).format('DD-MM-YYYY')}</h2>
                    <figure>
                        <img src={`${musician.img}`} alt="musician's headshot" />
                    </figure>

                </section>
            }
        </>

    )
}