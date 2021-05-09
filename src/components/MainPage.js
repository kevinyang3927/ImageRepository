import "firebase/storage";
import DisplayImg from './DisplayImg'
import React from "react";
import { storage } from "../firebase";


class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      imageArray: [],
      index: 0,
      userFilePath: this.props.userFile
    };
    console.log(this.state.userFilePath)
  }
  componentDidMount() {
    const tempImageArray = [];
    storage.ref(`${this.state.userFilePath}`).listAll().then((res) => {
      res.items.forEach(img => {
        img.getDownloadURL().then((url) => {
          tempImageArray.push({
            id: img.fullPath,
            name: url
          });
          this.setState({imageArray: tempImageArray})
        });
      });
    });
  }
  render () {
    const increment = () => {
      if ((this.state.index + 1) > (this.state.imageArray.length - 1)) {
        this.setState({index: 0});
      }
      else {
        this.setState({index: this.state.index + 1});
      }
  }

  const decrement = () => {
      if (this.state.index === 0) {
        this.setState({index: this.state.imageArray.length - 1});
      }
      else {
        this.setState({index: this.state.index - 1});
      }
  }

    const newImageHandler = event => {
      if (event.target.files[0]) {
        this.setState({ image: event.target.files[0] });
      }
    };

    const fileUploadHandler = () => {
      if (this.state.image == null) {
        return;
      }
      const uploadImg = storage.ref(`${this.state.userFilePath}/${this.state.image.name}`).put(this.state.image); //uploads image into the online storage
      uploadImg.on (
        "state_changed",
        snapshot => {},
        //if error
        error => {
            console.log(error);
        },
        //if no error and is successful execute below
        ()=> {
          storage 
            .ref(`${this.state.userFilePath}`)
            .child(this.state.image.name)
            .getDownloadURL()
            .then(url => {
              this.setState({ 
                imageArray: 
                [...this.state.imageArray,
                {
                  id: `${this.state.userFilePath}/${this.state.image.name}`,
                  name: url
                }] 
              });
            });
        }
      );
    };

    const removeImageHandler = () => {
      //check if empty
      if (this.state.imageArray.length == 0) {
        return;
      }
      //check if removing the index will result in index out of bounds
      const tempIndex = this.state.index;
      const tempImagePath = this.state.imageArray[tempIndex].id;
      if ((this.state.index + 1) > (this.state.imageArray.length - 1)) {
        this.setState({index: 0});
        this.state.imageArray.splice(tempIndex, 1);
        this.setState({imageArray: this.state.imageArray});
      }
      else {
        this.state.imageArray.splice(tempIndex, 1);
        this.setState({imageArray: this.state.imageArray});
      }
      storage.ref(tempImagePath).delete().then(() => {
        // File deleted successfully
      }).catch((error) => {
        console.log(error);
      });
    };

    return (
      <>
        <div >
            <button className="buttonPrev" onClick={decrement}>Prev Image</button>
            <button className="buttonNext" onClick={increment}>Next Image</button>
        </div>
        <DisplayImg  images = {this.state.imageArray} index = {this.state.index}/>
        <div >
          <input className="chooseFile"
            type="file"
            onChange={newImageHandler}
          />
          <button className="buttonUpload" onClick={fileUploadHandler}>Upload Image</button>
        </div>
        <div >
          <button className="buttonRemove" onClick={removeImageHandler}>Remove Current Image</button>
        </div>

      </>
    );
  }
}

export default MainPage;
