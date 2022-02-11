import path from "path";
import fs from "fs/promises";
import Link from "next/link";

export default function Home(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          <Link href={`/products/${p.id}`}>{p.title}</Link>
        </li>
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
