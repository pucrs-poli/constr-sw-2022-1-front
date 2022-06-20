import Button from "../components/CustomButtonComponent";
// import "../styles/reservations.css"

export default function Reservations() {
    return (
      <>
        <div className="full-screenable-node" />
        <h1>Colorful Custom Button Components</h1>
        <Button 
          border="none"
          color="pink"
          height = "200px"
          onClick={() => alert("You clicked on the pink circle!")}
          radius = "50%"
          width = "200px"
          children = "I'm a pink circle!"
        />
      </>
    );
}
