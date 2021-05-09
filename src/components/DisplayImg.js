import './DisplayImg.css';


const ImgToPath = ({images, index}) => {
    if (images.length != 0 ) {
        console.log(images[index].id);
        return (
            <>
                <div className="text-center">
                    <img className="rounded img" src={images[index].name} alt=""/>
                </div>
            </>
        )         
    }
    else {
        return (
            <>
                <p>Please Add an Image</p>
            </>
        )    
    }
}
  
export default ImgToPath;
  