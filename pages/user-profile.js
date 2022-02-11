export default function UserProfile(props) {
  return <h1>{props.name}</h1>;
}

export async function getServerSideProps(context) {
  console.log("getServerSideProps()");

  return {
    props: {
      name: "Aijaz Ali",
    },
  };
}
