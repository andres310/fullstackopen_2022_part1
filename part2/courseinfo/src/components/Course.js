const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <strong>Total of exercises {
    sum.map(p => p.exercises)
      .reduce((x, y) => x + y, 0)
  }</strong>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(p => <Part key={p.id} part={p}/>)}
  </>

const Course = ({ courses }) => {
  console.log('courses is: ', courses);
  return (
    <>
      {courses.map(c => 
        <div key={c.id}>
        <Header course={c.name} />
        <Content parts={c.parts} />
        <Total sum={c.parts} />
        </div>)}
    </>
  )
}

export default Course