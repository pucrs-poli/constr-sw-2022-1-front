import Button from "../components/CustomButtonComponent";

export default function Reservations() {
    return (
      <>
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
