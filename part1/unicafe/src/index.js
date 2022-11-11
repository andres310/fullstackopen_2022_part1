import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const Button = ({ text, handleState }) => {
	return (
		<button onClick={handleState}>
			{text}
		</button>
	)
}

const StatisticsLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}

const Statistics = ({ good, neutral, bad }) => {
	const getTotalCount = () => good + bad + neutral

	const getAverage = () => (good - bad) / getTotalCount()

	const getPositiveAverage = () => `${good / getTotalCount() * 100} %`

	if (good < 1 && neutral < 1 && bad < 1) {
		return (
			<div>
				<p>No feedback given</p>
			</div>
		)
	}

	return (
		<table>
			<tbody>
				<StatisticsLine text="good" value={good} />
				<StatisticsLine text="neutral" value={neutral} />
				<StatisticsLine text="bad" value={bad} />
				<StatisticsLine text="all" value={getTotalCount()} />
				<StatisticsLine text="average" value={getAverage()} />
				<StatisticsLine text="positive" value={getPositiveAverage()} />
			</tbody>
		</table>
	)
}

const App = () => {
	const [ good, setGood ] = useState(0)
	const [ neutral, setNeutral ] = useState(0)
	const [ bad, setBad ] = useState(0)

	const handleGoodClicks = () => setGood(good + 1)

	const handleNeutralClicks = () => setNeutral(neutral + 1)

	const handleBadClicks = () => setBad(bad + 1)

	return (
		<div>
			<h1>give feedback</h1>
			<Button text={"good"} handleState={handleGoodClicks} />
			<Button text={"neutral"} handleState={handleNeutralClicks} />
			<Button text={"bad"} handleState={handleBadClicks} />
			<br />
			<h1>statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
