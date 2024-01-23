import { render, screen } from "@testing-library/react";
import ProductCard, { PromotedCard } from "../Components/ProductCard";
import ProductCardProps from "./Mocks/ProductCartProps.json";
import "@testing-library/jest-dom";

test(" should render the product card on the home page", () => {
  render(
    <ProductCard
      title={ProductCardProps.title}
      category={ProductCardProps.category}
      price={ProductCardProps.price}
      brand={ProductCardProps.brand}
      rating={ProductCardProps.rating}
      thumbnail={ProductCardProps.thumbnail}
    />
  );

  const productTitle = screen.getByText("iPhone 9");
  expect(productTitle).toBeInTheDocument();
});

test("should rednder the product card on the home page with the promoted label on it ", () => {
  const PromotedProductCard = PromotedCard(ProductCard);
  render(
    <PromotedProductCard
      title={ProductCardProps.title}
      category={ProductCardProps.category}
      price={ProductCardProps.price}
      brand={ProductCardProps.brand}
      rating={ProductCardProps.rating}
      thumbnail={ProductCardProps.thumbnail}
    />
  );
  const promotedButton = screen.getByRole("button", { value: "promoted" });
  expect(promotedButton).toBeInTheDocument();
});
