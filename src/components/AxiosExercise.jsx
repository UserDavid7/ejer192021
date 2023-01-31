import React, { useEffect, useState } from 'react'
import getChiste from '../services/AxiosAPI'

export default function AxiosExercise() {

    const [chiste, setChiste] = useState({});
    const [likes, setLikes] = useState(0);

    const [arrJoke, setArrJoke] = useState([{}]);

    const [dislikes, setDisLikes] = useState(0);
    const [currentJokeId, setCurrentJokeId] = useState();



    useEffect(() => {
        console.log('component did mount')
    }, [])

    const generateJoke = () => {
        getChiste()
            .then((response) => {
                const { id, value } = response.data;

                const newChiste = {
                    id: id,
                    value: value,
                    like: false,
                    dislike: false
                }
                setChiste(newChiste);
                console.log(chiste)

                console.log(response)

                setCurrentJokeId(id);
                console.log(currentJokeId);

                setArrJoke([...arrJoke, newChiste])
                console.log(arrJoke);

            })
            .catch((error) => {
                alert("ocurrio algo inesperado ;P");
            })


    }

    const addLike = (chisteid) => {
        if (chiste.id === chisteid) {
            if (chiste.dislike === true) {
                setDisLikes(dislikes - 1);
                chiste.dislike = !true;
            }
            if (chiste.like === false) {
                chiste.like = !false;
                setLikes(likes + 1);
            }
        }
    }
    

    const addDislike = (chisteid) => {
        if (chiste.id === chisteid) {
            if (chiste.like === true) {
                setLikes(likes - 1); //chiste like va ser false y le resta uno 
                chiste.like = !true;
            }
            if (chiste.dislike === false) {
                chiste.dislike = !false;//va ser true y lo incrementa 
                setDisLikes(dislikes + 1);
            }
        }
    }
    

    


    return (
        <div className='cardJoke'>
            <h1>Generate jokes random</h1>
            {
                chiste ? (
                    <div className='joke'>
                        <p> {chiste.value}</p>


                        <button onClick={generateJoke}> generate joke </button>
                    </div>

                ) :
                    (
                        <button onClick={generateJoke}> generate joke </button>
                    )
            }
            {
                chiste ? (
                    <div className='btnsJoke'>
                        <div>
                            <div className='like' onClick={() => addLike(chiste.id)} > Like </div> 
                        </div>

                        <div>
                            <div className='dislike' onClick={() => addDislike(chiste.id)}> dislike </div> 
                        </div>
                    </div>
                ) : (
                    <h2> No hay chistes aun</h2>
                )
            }

            <p>Chistes que me han gustado:  {likes}</p>
            <p>Chistes que me han disgustado:  {dislikes}</p>

        </div>
    )
}
