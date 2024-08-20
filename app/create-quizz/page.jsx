"use client"

import { useEffect, useState } from "react"
import { db, storage } from "../firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"

function Quizz() {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Vérifiez si un fichier est sélectionné avant de continuer
    if (file) {
      const storageRef = ref(storage, `uploads/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progrès de l'upload ici (optionnel)
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done');

        },
        (error) => {
          console.error("Upload failed:", error)
        },
        () => {
          // Lorsque l'upload est terminé
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=> {
            setFile(downloadURL)
          })
          console.log("Upload successful!")
        }
      )
    }

    // Ajoutez ensuite d'autres actions (comme l'ajout du titre à Firestore)
    await addDoc(collection(db, "quizz"), {
      title: title,
      imageUrl: file ? `uploads/${file.name}` : null,
      timestamp : serverTimestamp()
    })
  }

  useEffect(() => {
    if (file) setSelectedFile(URL.createObjectURL(file))
  }, [file])

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <h2 className="text-center text-2xl font-bold mb-6">Create Your quizz</h2>
          <div className="mb-4">
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="Title of quizz"
              placeholder="Title of quizz"
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="bg-white shadow rounded-md p-6">
            <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
              <div className="text-center">
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    alt="Quizz image"
                    className="w-full object-contain"
                    onClick={() => setSelectedFile(null)}
                  />
                ) : (
                  <>
                    <input
                      className="hidden"
                      id="fileUpload"
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label className="mt-2 inline-block text-blue-600 cursor-pointer" htmlFor="fileUpload">Choose a file</label>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4"></div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Quizz
