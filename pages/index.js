import Image from "next/image";
import { useEffect, useState } from "react"
import { reqUpload } from "../utils/upload";

export default function Home() {

  const [img,setImg] = useState("");

  const [getImg,setGetImg] = useState("");

  return (
    <>
    {!getImg ?
            <form
            onSubmit={(e)=>{
              e.preventDefault();
        
              if(img != ""){
                reqUpload(img,setGetImg);
              }
        
            }}
            style={{
              boxShadow:'0 0 10px 0 rgba(0,0,0,.5)',
              padding:'2rem',
              borderRadius:'10px'
            }}
            >
              <div>
              <label
              htmlFor="imagem"
              style={{
                border:'2px dashed #000',
                padding:'.5rem',
                borderRadius:'5px',
                cursor:'pointer'
              }}
              >
                upload de imagem aqui
              </label>
              <input
                  type="file"
                  name="imagem"
                  id="imagem"
                  onChange={(e)=>{setImg(e.target.files[0])}}
                  style={{
                    width:'100%',
                    height: '20px',
                    display:'none'
                  }}
                  />
              </div>
              <div
              style={{
                margin:'1.5rem 0 0 0'
              }}
              >
                <button
                type="submit"
                style={{
                  width:'100%',
                  padding:'.25rem',
                  cursor:'pointer'
                }}
                >
                  Enviar
                </button>
              </div>
            </form>
        :
        <img
          src={`/files/${getImg}`}
          height={'100px'}
          width={'100px'}
        />
    }
    </>
  )
}
