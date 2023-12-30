import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images coming from server
  // NOTE: instead screen.getAllByRole, use findAllByRole() because images are not initially in the DOM
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i }); // name ends with scoop
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
