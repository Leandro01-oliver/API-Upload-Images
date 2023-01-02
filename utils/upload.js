import axios from "axios"

const reqUpload =  (img,setGetImg) => {

    let formData = new FormData(); 
    formData.append('file', img); 

     axios.post("/api/upload",formData)
     .then((res)=>{
        setGetImg(res.data.img)
    }).catch((e)=>{
        console.error(e)
    })

}

export { reqUpload }