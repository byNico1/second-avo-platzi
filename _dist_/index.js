/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";
const appNode = document.querySelector("#container");

const container = document.createElement("div");
container.classList.add(
  "mt-6",
  "grid",
  "grid-cols-1",
  "gap-y-10",
  "gap-x-6",
  "sm:grid-cols-2",
  "lg:grid-cols-4",
  "xl:gap-x-8"
);

const formatPrice = (price) => {
  const newPrice = new window.Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return newPrice;
};

window
  .fetch(`${baseUrl}/api/avo`)
  .then((respuesta) => respuesta.json())
  .then((response) => {
    const everyItem = [];
    response.data.forEach((item) => {
      //* imagen
      const imagen = document.createElement("img");
      imagen.src = `${baseUrl}${item.image}`;

      const title = document.createElement("h2");
      title.textContent = item.name;
      title.className = "text-xl";

      const price = document.createElement("div");
      price.textContent = formatPrice(item.price);

      const relativeGroup = document.createElement("div");
      relativeGroup.className = "group relative";

      const ImageDiv = document.createElement("div");
      ImageDiv.className =
        "min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80";

      const innerContainer = document.createElement("div");
      innerContainer.className = "mt-4 flex justify-between";

      const innerDivContainer = document.createElement("div");

      innerContainer.append(innerDivContainer, price);
      innerDivContainer.append(title);
      ImageDiv.append(imagen);
      relativeGroup.append(ImageDiv, innerContainer);
      container.append(relativeGroup);
      everyItem.push(container);
    });

    appNode.append(...everyItem);
  });
