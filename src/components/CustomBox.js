const CustomBox = ({onClick, title, description}) => { 
  return (
    <button 
      style={{
         width: 347,
         height: 115,
         marginTop: 8,
         marginLeft: 8,
         border: 0
      }}
      onClick={onClick}
    >
    <h3
      style={{
        textAlign: "left",
        marginTop:0,
        padding: 0,
      }}
    >{title}</h3>

    <p style={{
      // width:347,
      paddingTop:30,
      textAlign: "left",
      color: "#FF0000"
    }}>
      {description}
    </p>
    </button>
  );
}

export default CustomBox;