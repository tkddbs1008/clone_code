import {createAction, handleActions} from "redux-actions"
import {produce} from "immer"
// import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

const UPLOADING = "UPLOADING"
const UPLOAD_IMAGE = "UPLOAD_IMAGE"
const SET_PREVIEW = "SET_PREVIEW"

const uploading = createAction(UPLOADING, (uploading) => ({uploading}));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({image_url}));
const setPreview = createAction(SET_PREVIEW, (preview) => ({preview}));

const initialState = {
    image_url: '',
    uploading: false,
    preview: null,
}

// const uploadImageFB = (image) => {
//     return function(dispatch, getState) {

//         dispatch(uploading(true));

//         const storageRef = ref(storage, `images/${image.name}`);
//         uploadBytes(storageRef, image).then((snapshot) => {
//             console.log(snapshot);
//         getDownloadURL(ref(storage, `images/${image.name}`))
//             .then((url) => {
//                 dispatch(uploadImage(url))
//             });
//         });
//     }
// }

export default handleActions({
    [UPLOAD_IMAGE]: (state, action) => produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
    }),
    [UPLOADING]: (state, action) => produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
    }),
    [SET_PREVIEW]: (state, action) => produce(state, (draft) => {
        draft.preview = action.payload.preview
    })
}, initialState);

const actionsCreators = {
    // uploadImageFB,
    uploadImage,
    setPreview,
}

export {actionsCreators};