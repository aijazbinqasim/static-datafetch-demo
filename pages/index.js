import path from "path";
import fs from "fs/promises";

export default function Home(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  console.log("Re-generating...");
  const filePath = path.join(process.cwd(), "data", "dumy-data.json");
  const json = await fs.readFile(filePath);
  const records = JSON.parse(json);

  return {
    props: {
      products: records.products,
    },

    revalidate: 5,
  };
}
