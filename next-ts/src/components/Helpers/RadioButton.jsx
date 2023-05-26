export default function RadioButton(props) {
  const { id, name, handleChange, checked, className } = props;

  return (
    <div>
      <input
        className={className}
        id={id}
        type='radio'
        name={name}
        onChange={handleChange}
        checked={checked}
      />
    </div>
  );
}
