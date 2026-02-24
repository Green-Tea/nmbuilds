import { validateAllData } from "../lib/schemaValidation";
import productsData from "../data/products.json";
import buildsData from "../data/builds.json";

try {
  const { products, builds } = validateAllData(
    productsData as unknown[],
    buildsData as unknown[]
  );
  console.log(`✓ Validated ${products.length} products`);
  console.log(`✓ Validated ${builds.length} builds`);
  process.exit(0);
} catch (err) {
  console.error("Data validation failed:", (err as Error).message);
  process.exit(1);
}
