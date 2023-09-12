import './App.css';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';
import { useState } from 'react';

function App() {
  const [crop, setCrop] = useState({
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50
  });
  const [imgSrc, setImgSrc] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [newImgae, setNewImage] = useState(null);

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      // setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }
  return (
    <>
      <input type="file" accept="image/*" onChange={onSelectFile} /> <br />
      <ReactCrop crop={crop} onChange={c => setCrop(c)} onComplete={(c) => setCompletedCrop(c)}>
        <img src={imgSrc} id='img' />
      </ReactCrop>
      {completedCrop &&
        <PreviewImg crop={crop} />
      }
    </>
  );
}
function PreviewImg({ crop }) {
  let img = document.getElementById('img');
  const [url, setUrl] = useState('');
  console.log(img.naturalWidth);
  console.log(img.naturalHeight);
  function getImage() {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    let scaleX = img.naturalWidth / img.width;
    let scaleY = img.naturalHeight / img.height;

    let w = crop.width * scaleX;
    let h = crop.height * scaleY;
    if ((w > 1000 && w < 2000) || (h > 1000 && h < 2000)) {
      w *= 0.8;
      h *= 0.8;
    }
    if ((w > 2000 && w < 3000) || (h > 2000 && h < 3000)) {
      w *= 0.6;
      h *= 0.6;
    }
    if ((w > 3000 && w < 4000) || (h > 3000 && h < 4000)) {
      w *= 0.3;
      h *= 0.3;
    }

    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(img,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0, 0,
      w,
      h
    );
    let u = canvas.toDataURL('image/jpeg', 0.5);
    setUrl(u)
  }
  return (
    <>
      <button onClick={getImage}>Show Image</button>
      <img src={url} id='previewImg' />
    </>
  )
}

export default App;
