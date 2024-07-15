// src/components/SurveyForm.js
import React, { useState, useEffect } from 'react';
import questionsData from '../Apis.json'; // Import the JSON file

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleBlur = () => {
    setErrors(validate(values));
  };

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    setValues, // Add setValues here
  };
};

const validate = (values) => {
  const errors = {};
  if (!values.fullName) errors.fullName = 'Full Name is required';
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }
  if (!values.surveyTopic) errors.surveyTopic = 'Survey Topic is required';
  if (values.surveyTopic === 'Technology') {
    if (!values.favoriteProgrammingLanguage) errors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
    if (!values.yearsOfExperience) errors.yearsOfExperience = 'Years of Experience is required';
  }
  if (values.surveyTopic === 'Health') {
    if (!values.exerciseFrequency) errors.exerciseFrequency = 'Exercise Frequency is required';
    if (!values.dietPreference) errors.dietPreference = 'Diet Preference is required';
  }
  if (values.surveyTopic === 'Education') {
    if (!values.highestQualification) errors.highestQualification = 'Highest Qualification is required';
    if (!values.fieldOfStudy) errors.fieldOfStudy = 'Field of Study is required';
  }
  if (!values.feedback || values.feedback.length < 50) errors.feedback = 'Feedback is required and must be at least 50 characters';
  return errors;
};

const SurveyForm = () => {
  const { values, errors, handleChange, handleBlur, setValues } = useForm(
    {
      fullName: '',
      email: '',
      surveyTopic: '',
      favoriteProgrammingLanguage: '',
      yearsOfExperience: '',
      exerciseFrequency: '',
      dietPreference: '',
      highestQualification: '',
      fieldOfStudy: '',
      feedback: '',
          additionalQuestions: {}
    },
    validate
  );

  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (values.surveyTopic) {
      const questions = questionsData[values.surveyTopic] || [];
      setAdditionalQuestions(questions);
    } else {
      setAdditionalQuestions([]);
    }
  }, [values.surveyTopic]);

  const handleAdditionalQuestionChange = (event, index) => {
    const { value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      additionalQuestions: {
        ...prevValues.additionalQuestions,
        [index]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    event.preventDefault();
      const validationErrors = validate(values);
      
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 px-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.fullName && <p className="mt-1  text-sm text-red-600">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 px-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Survey Topic</label>
            <select
              name="surveyTopic"
              value={values.surveyTopic}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a topic</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
            {errors.surveyTopic && <p className="mt-1 text-sm text-red-600">{errors.surveyTopic}</p>}
          </div>

          {values.surveyTopic === 'Technology' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Favorite Programming Language</label>
                <select
                  name="favoriteProgrammingLanguage"
                  value={values.favoriteProgrammingLanguage}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select a language</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                </select>
                {errors.favoriteProgrammingLanguage && <p className="mt-1 text-sm text-red-600">{errors.favoriteProgrammingLanguage}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={values.yearsOfExperience}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full px-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.yearsOfExperience && <p className="mt-1 text-sm text-red-600">{errors.yearsOfExperience}</p>}
              </div>
            </>
          )}

          {values.surveyTopic === 'Health' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Exercise Frequency</label>
                <select
                  name="exerciseFrequency"
                  value={values.exerciseFrequency}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select a frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Rarely">Rarely</option>
                </select>
                {errors.exerciseFrequency && <p className="mt-1 text-sm text-red-600">{errors.exerciseFrequency}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Diet Preference</label>
                <select
                  name="dietPreference"
                  value={values.dietPreference}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select a preference</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
                {errors.dietPreference && <p className="mt-1 text-sm text-red-600">{errors.dietPreference}</p>}
              </div>
            </>
          )}

          {values.surveyTopic === 'Education' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Highest Qualification</label>
                <select
                  name="highestQualification"
                  value={values.highestQualification}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select a qualification</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
                {errors.highestQualification && <p className="mt-1 text-sm text-red-600">{errors.highestQualification}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={values.fieldOfStudy}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 block w-full px-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.fieldOfStudy && <p className="mt-1 text-sm text-red-600">{errors.fieldOfStudy}</p>}
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Feedback</label>
            <textarea
              name="feedback"
              value={values.feedback}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 block w-full border px-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.feedback && <p className="mt-1 text-sm text-red-600">{errors.feedback}</p>}
          </div>

          {additionalQuestions.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900">Additional Questions</h3>
              {additionalQuestions.map((question, index) => (
                <div key={index} className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">{question}</label>
                  <input
                    type="text"
                    value={values.additionalQuestions[index] || ''}
                    onChange={(event) => handleAdditionalQuestionChange(event, index)}
                    className="mt-1 px-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              ))}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-6 p-4 border border-gray-300 rounded-md">
          <h2 className="text-lg font-medium text-gray-900">Form Submission Summary</h2>
          <p><strong>Full Name:</strong> {values.fullName}</p>
          <p><strong>Email:</strong> {values.email}</p>
          <p><strong>Survey Topic:</strong> {values.surveyTopic}</p>

          {values.surveyTopic === 'Technology' && (
            <>
              <p><strong>Favorite Programming Language:</strong> {values.favoriteProgrammingLanguage}</p>
              <p><strong>Years of Experience:</strong> {values.yearsOfExperience}</p>
            </>
          )}

          {values.surveyTopic === 'Health' && (
            <>
              <p><strong>Exercise Frequency:</strong> {values.exerciseFrequency}</p>
              <p><strong>Diet Preference:</strong> {values.dietPreference}</p>
            </>
          )}

          {values.surveyTopic === 'Education' && (
            <>
              <p><strong>Highest Qualification:</strong> {values.highestQualification}</p>
              <p><strong>Field of Study:</strong> {values.fieldOfStudy}</p>
            </>
          )}

          <p><strong>Feedback:</strong> {values.feedback}</p>

          {additionalQuestions.length > 0 && (
            <>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Additional Questions:</h3>
              <ul className="mt-2 list-disc list-inside">
                {additionalQuestions.map((question, index) => (
                  <li key={index}><strong>{question}:</strong> {values.additionalQuestions[index]}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
