import path from "path";
import fs from "fs/promises";

export default function Product(props) {
  const { product } = props;

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const filePath = path.join(process.cwd(), "data", "dumy-data.json");
  const json = await fs.readFile(filePath);
  const records = JSON.parse(json);
  const product = records.products.find((p) => p.id === productId);

  return {
    props: {
      product: product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: "p1" } },
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
    ],
    fallback: false,
  };
}
