import {useState, useEffect, use} from 'react'

export default function Main() {
    const [memeImageUrlArr, setMemeImageUrlArr] = useState([])

    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText:"Walk into Mordor",
        imgUrl:"http://i.imgflip.com/1bij.jpg"
    })

    useEffect(()=>{
        fetch('https://api.imgflip.com/get_memes')
            .then(res=>res.json())
            .then(data=>setMemeImageUrlArr(data.data.memes.map((memeObj)=>{
                return memeObj.url
            })))
    }, [])

    function handleChange(event){
        const {value, name} = event.currentTarget
        setMeme((prevMeme)=>{
            return {...prevMeme, [name]: value}
        })
    }

    function handleClick(){
        const randomIndex = Math.floor( Math.random() * memeImageUrlArr.length )
        setMeme((prevMeme)=>{
            return {
                ...prevMeme,
                imgUrl: memeImageUrlArr[randomIndex]
            }
        })
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder={meme.topText}
                        name="topText"
                        onChange={handleChange}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder={meme.bottomText}
                        name="bottomText"
                        onChange={handleChange}
                    />
                </label>
                <button onClick={handleClick}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imgUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}