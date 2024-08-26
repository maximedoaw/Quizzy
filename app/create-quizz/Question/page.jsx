"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast, Toaster } from 'react-hot-toast';

export default function QuizForm() {
  const [question, setQuestion] = useState('');
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState(['']);
  const stepParams = useSearchParams()
  const quizzParams = useSearchParams();
  const router = useRouter();

  const handleAddAnswer = () => setAnswers([...answers, '']);

  const handleRemoveAnswer = (index) => setAnswers(answers.filter((_, i) => i !== index));
  
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSuccess = () => {
    toast.success('Question added with successfully in this quizz !');
  };

  const handleInit = () =>{
    setAnswers([''])
    setSelectedFile(null)
    setQuestion('')
    setFile(null)
  }

  const handleError = () => {
    toast.error('Error please try again');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const uploadImage = async () => {
      const storageRef = ref(storage, `uploads/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          null,
          reject,
          () => getDownloadURL(uploadTask.snapshot.ref).then(resolve)
        );
      });
    };

    try {
      const downloadURL = file ? await uploadImage() : null;
      const quizzRef = await doc(db,"quizz",quizzParams.get('quizId'))
      const questionRef = await addDoc(collection(quizzRef, "question"),{
        question,
        imageUrl: downloadURL || null,
        answers,
      })

      setLoading(false);

      handleSuccess()
      handleInit()
    } catch (error) {
      console.error("Error adding quiz:", error);
      setLoading(false);

      handleError()
      handleInit()
    }
  };

  const handleAddAnotherQuestion = () => {
    setQuestion('');
    setFile(null);
    setSelectedFile(null);
    setAnswers(['']);
    setQuizSubmitted(false);
    router.replace(`?step=1`); // Reset to the first step for a new question
  };

  const handleGoBackToEdit = () => {
    setQuizSubmitted(false);
    router.replace(`?step=1`); // Go back to the first step to edit the question
  };

  useEffect(() => {
    if (file) setSelectedFile(URL.createObjectURL(file));
  }, [file]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
         
          <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <h2 className="text-center text-2xl font-bold mb-6">Create Your Question</h2>

           
              <div className="mb-4">
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="question"
                  placeholder="Type your question"
                  onChange={(e) => setQuestion(e.target.value)}
                  value={question}
                  required
                  autoFocus
                />
              </div>

              <div className="bg-white shadow rounded-md p-6 mb-4">
                <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
                  <div className="text-center">
                    {selectedFile ? (
                      <img
                        src={selectedFile}
                        alt="Quiz image"
                        className="w-full object-contain"
                        onClick={(e) => setSelectedFile(null)}
                      />
                    ) : (
                      <>
                        <input
                          className="hidden"
                          id="fileUpload"
                          type="file"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label className="mt-2 inline-block text-blue-600 cursor-pointer" htmlFor="fileUpload">
                          Choose a file
                        </label>
                      </>
                    )}
                  </div>
                </div>
              </div>

            
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Answers:</label>
                <div className="max-h-48 overflow-y-auto space-y-4">
                  {answers.map((answer, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder={`Answer ${index + 1}`}
                        value={answer}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                      />
                      {answers.length > 1 && (
                        <button
                          type="button"
                          className="text-red-500 font-bold text-xl"
                          onClick={() => handleRemoveAnswer(index)}
                        >
                          -
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleAddAnswer}
                  >
                    +
                  </button>
                </div>
              </div>
            

            
              <div className="flex items-center justify-between">

               <button
                  className={`${
                    loading ? "bg-gray-200 text-gray-500" : "bg-blue-500 hover:bg-blue-700 brightness-125 text-white"
                  }  font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline`}
                  type="submit"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? 'loading...' : 'Add'}
                </button>
              </div>

          </form>
         { stepParams.get('step') === 'done' ? (
          <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 text-center">
            <h2 className="text-2xl font-bold mb-6">Your Question has been Submitted!</h2>
            <p className="mb-4">What would you like to do next?</p>
            <div className="flex flex-col space-y-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddAnotherQuestion}
              >
                Add Another Question
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleGoBackToEdit}
              >
                Go Back to Edit
              </button>
            </div>
          </div>
        ) : ''}
      </div>
      <Toaster />
    </div>
  );
}
