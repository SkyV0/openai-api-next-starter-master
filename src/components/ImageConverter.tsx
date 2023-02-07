import { useRef, useState} from 'react';
import Tesseract from 'tesseract.js';

function preprocessImage({canvas} : {canvas: HTMLCanvasElement}) {
  const ctx = canvas.getContext('2d');
  const image = ctx.getImageData(0,0,canvas.width, canvas.height);
  return image;
 }
 

function ImageConverter() {
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
 
  const handleChange = (event: any) => {
    setImage(URL.createObjectURL(event.target.files[0]))
  }
 
    const handleClick = (event: any) => {
    
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
 
        ctx.drawImage(imageRef.current, 0, 0);
        ctx.putImageData(preprocessImage(canvas), 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg");
  
        Tesseract.recognize(
            dataUrl,
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            setText(text);
        })
    }

    const imagePath = image;
 
 
  return (
      <div>
          <input type="file" onChange={handleChange} />
          <button onClick={handleClick}>Convert</button>
          <canvas ref={canvasRef} />
          <img ref={imageRef} src={imagePath} />
          <p>{text}</p>
      </div>
  )
}
export default ImageConverter;