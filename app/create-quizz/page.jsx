"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db, storage } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Select from 'react-select';
import { CategoriesArray } from '../lib/utils/helper';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function QuizForm() {
  const [quizzName, setQuizzName] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? currentUser : null);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      alert("Please select a category");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;

      // Upload the image if a file is selected
      if (file) {
        const storageRef = ref(storage, `uploads/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        imageUrl = await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            null,
            reject,
            () => getDownloadURL(uploadTask.snapshot.ref).then(resolve)
          );
        });
      }

      // Create the quiz document in Firestore with the image URL
      const quizz = await addDoc(collection(db, 'quizz'), {
        username: user ? user.displayName : 'unknown',
        quizzName,
        category: selectedCategory.value,
        imageUrl, // Save the image URL in Firestore
        timestamp: serverTimestamp(),
      });

      router.push(`/create-quizz/Question?step=1&quizId=${quizz.id}`);
    } catch (error) {
      console.error("Error creating quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle file input and image preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  // Handle click on image to remove it
  const handleImageClick = () => {
    setFile(null);
    setSelectedFile(null);
  };

  // Transform `CategoriesArray` (string array) to options for `react-select`
  const categoryOptions = CategoriesArray.map((category) => ({
    value: category,
    label: category,
  }));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <h2 className="text-center text-2xl font-bold mb-6">Create Your Quiz</h2>

          <div className="mb-4">
            <div className="flex items-center justify-center mb-3 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
              <div className="text-center">
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    alt="Quiz image"
                    className="w-full object-contain"
                    onClick={handleImageClick} // Remove image on click
                  />
                ) : (
                  <>
                    <input
                      className="hidden"
                      id="fileUpload"
                      type="file"
                      onChange={handleFileChange}
                    />
                    <label className="mt-2 inline-block text-blue-600 cursor-pointer" htmlFor="fileUpload">
                      Choose a file (optional)
                    </label>
                  </>
                )}
              </div>
            </div>

            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="quizzName"
              placeholder="Name of quiz"
              onChange={(e) => setQuizzName(e.target.value)}
              value={quizzName}
              required
              autoFocus
            />
          </div>

          <div className="mb-4">
            <Select
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="Select a category"
              isClearable
            />
          </div>

          <button
            className={`${loading ? 'bg-gray-200 text-gray-700' : 'bg-purple-600 text-white'} font-semibold w-full max-w-md h-10
              border-none rounded-lg hover:brightness-100 hover:scale-105 transition-transform
              duration-200`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
}
