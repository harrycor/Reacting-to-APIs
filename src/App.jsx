import React, { useEffect, useState } from "react";
import './components/style/App.css'

const App = () => {

    const [forEffect, setForEffect] = useState('');
    const [filmData, setFilmData] = useState([]);
    const [peopleData, setPeopleData] = useState([]);

    const loadButton = (x) => {
        if (x.target.id === 'film-id'){
            setForEffect('film')
        }
        else if( x.target.id === 'people-id'){
            setForEffect('people');
        }
    }

    useEffect(() => {
        if(forEffect === '') return
        else if (forEffect === "film") {
            fetch('https://ghibliapi.herokuapp.com/films')
            .then(res => {
                return res.json();
            }).then(filmJson => {
                setFilmData(filmJson);
                setPeopleData([]);
            });
        }
        else if(forEffect === 'people') {
            fetch('https://ghibliapi.herokuapp.com/people')
            .then(res => {
                return res.json();
            }).then(peopleJson => {
                setPeopleData(peopleJson);
                setFilmData([]);
            })
        }
    }, [forEffect]);

  return (
    <div>
        <div className="btn-div">
        <button id="film-id" onClick={loadButton} className="btn btn-primary">Load Films</button>
        <button id="people-id" onClick={loadButton} className="btn btn-warning">Load People</button>
        </div>
        <div className="cards-container-div">
            {filmData.map((data) => {
                return(
                    <div key={data.id} className="card">
                        <img src={data.movie_banner} alt="" className="card-img-top" />
                        <hr />
                        <div className="card-body">
                            <h5 className="card-title">{data.title}</h5>
                            <p className="card-text">{data.description}</p>
                        </div>
                    </div>
                )
            })}
        </div>
        <div className="cards-container-div">
            {peopleData.map((data) => {
                return(
                    <div key={data.id} className="card">
                    <div className="card-body">
                        <h5 className="card-title">{data.name}</h5>
                        <p className="card-text">Age: {data.age}, {data.gender}</p>
                        <a href={"https://ghibliapi.herokuapp.com/people/" + data.id}>Check out the Json</a>
                    </div>
                </div>
                )
            })}
        </div>
    </div>
  );
};

export default App;
