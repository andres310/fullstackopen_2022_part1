import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
	<div>
		<h1>{props.course}</h1>
	</div>
)

const Part = (props) => (
	<div>
		<p>{props.part} {props.exercise}</p>
	</div>
)
const Content = (props) => {
  	return (
  		<div>
  			<Part part={props.parts[0].name} exercise={props.parts[0].exercises} />
  			<Part part={props.parts[1].name} exercise={props.parts[1].exercises} />
  			<Part part={props.parts[2].name} exercise={props.parts[2].exercises} />
  		</div>
  	)
}

const Total = (props) => {
	const exercises = props.parts.map(obj => obj.exercises)
	const total = exercises.reduce( (prev, curr) => prev + curr, 0 )

	return (
		<div>
			<p>Number of exercises {total}</p>
		</div>
	)
}

const App = () => {
  	const course = {
    	name: 'Half Stack application development',
    	parts: [
      		{
        		name: 'Fundamentals of React',
        		exercises: 10
      		},
      		{
        		name: 'Using props to pass data',
        		exercises: 7
      		},
      		{
        		name: 'State of a component',
        		exercises: 14
      		}
    	]
  	}

	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'));