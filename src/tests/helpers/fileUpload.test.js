// import cloudinary from "cloudinary";
import { fileUpload } from "../../helpers/fileUpload";

// cloudinary.config({
//   cloud_name: "xxxx",
//   api_key: "xxxx",
//   api_secret: "xxxx",
// });

describe("Pruebas en fileUpload", () => {

  // test("Debería de cargar el archivo y retornar el URL", async () => {

  //   const response = await fetch("https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png");
  //   const blob = await response.blob();

  //   const file = new File([blob], "picture.png");

  //   const url = await fileUpload( file );

  //   expect( typeof url ).toBe("string");

  //   // Borrar Imagen
  //   const segments = url.split("/");
  //   const imageId = segments[ segments.length - 1 ].replace(".png", "");
  //   cloudinary.v2.api.delete_resources(imageId);
  // });

  test("Debería de retornar un error", async () => {

    const file = new File([], "picture.png");
    const url = await fileUpload( file );

    expect( url ).toBe( null );

  });

});
