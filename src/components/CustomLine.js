const CustomLine = ({onClick, title, curriculo, cursos}) => { 
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
        <h4>{curriculo}</h4>
        <h4>{cursos}</h4>
      </span>
    </button>
  );
}

export default CustomLine;