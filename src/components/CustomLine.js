const CustomLine = ({onClick, title, field1, field2}) => { 
  return (
    <button 
      style={{
         width: 1089,
         height: 70,
         border: 0
      }}
      onClick={onClick}
    >
      <span style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        <h3>{title}</h3>
        <h4>{field1}</h4>
        <h4>{field2}</h4>
      </span>
    </button>
  );
}

export default CustomLine;