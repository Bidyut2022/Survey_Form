import React from 'react';
import SurveyForm from './components/SurveyForm';

function App() {
  return (
    <div className="App">
      <header className="bg-indigo-600 text-white py-4">
        <h1 className="text-center text-3xl">Survey Form</h1>
      </header>
      <main className="mt-8">
        <SurveyForm />
      </main>
    </div>
  );
}

export default App;
