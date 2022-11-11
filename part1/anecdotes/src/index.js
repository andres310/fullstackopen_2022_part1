import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [ selected, setSelected ] = useState(0)
  const [ points, setPoints ] = useState( new Array(anecdotes.length).fill(0) )
  const [ mostVoted, setVoted ] = useState(0)

  const updatePoints = () => {
    const updated = [...points]
    updated[selected] += 1
    setPoints(updated)
    updateMostVoted()
  }

  const updateMostVoted = () => {
    const i = points.indexOf( Math.max(...points) )
    if (i)
      setVoted(i)
    else
      setVoted(0)
  }

  const randomAnecdote = () => setSelected( Math.floor(Math.random() * 7) )

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      <p>has {points[selected]} votes</p>
      <Button text='vote' handleClick={updatePoints} />
      <Button text='next anecdote' handleClick={randomAnecdote} />
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVoted]}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')).render(<App />)
