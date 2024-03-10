const { removeBackgroundFromImageFile } = require("remove.bg");
const removeBg = async (req, res, next) => {
  console.log(req.uniqueSuffix);
  const localFile = `public/images/doctors/${req.uniqueSuffix}`;
  const outputFile = `out/${req.uniqueSuffix}`;

  await removeBackgroundFromImageFile({
    path: localFile,
    apiKey: "VM1Xn4BZkdvHteJJ6P9hfxvw",
    size: "regular",
    type: "auto",
    scale: "50%",
    outputFile,
  })
    .then((result) => {
      console.log(`File saved to ${outputFile}`);
      const base64img = result.base64img;
      next();
    })
    .catch((errors) => {
      console.log(JSON.stringify(errors));
    });
};
module.exports = removeBg;
