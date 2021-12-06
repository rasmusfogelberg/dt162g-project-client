const Set: React.FC<any> = ({ weight, reps, ...rest }) => {
  return (
    <div className="set">
      <p>Weight: {weight}kg - Reps: {reps}</p>
    </div>
  )
};

export default Set;