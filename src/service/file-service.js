
import { messageBox } from "../service/message-service"

export const readImageFile = (file) => {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {


        reader.onload = (event) => {
            resolve(event.target.result)
        }
        reader.onerror = (event) => {
            reject(event)
        }

        reader.readAsArrayBuffer(file)
    })
}
export const readImageBase64 = (file) => {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {


        reader.onload = (event) => {
            resolve(event.target.result)
        }
        reader.onerror = (event) => {
            reject(event)
        }

        reader.readAsDataURL(file)
    })
}