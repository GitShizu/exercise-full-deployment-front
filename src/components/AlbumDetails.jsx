import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
const { VITE_API_URL } = import.meta.env;

export default () => {

    const { id } = useParams()
    const [album, setAlbum] = useState()

    useEffect(() => {
        axios.get(`${VITE_API_URL}/albums/${id}`)
            .then(obj=>setAlbum(obj.data))
    }, [])

    return (
       <>
        {album===undefined?
        <h1>Loading...</h1>    
        :
        <section>
            <h1>{album.title}</h1>
            <h2>{album.musician.stageName}</h2>
            <h3>{album.duration_seconds}</h3>
            <figure>
                <img src={`${album.cover}${album.title}`} alt="album_cover" />
            </figure>
            
        </section>
    }
       </>
        
    )
}