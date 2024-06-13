const Test = () => {
  // async function downloadImage(url) {
  //   // Extract filename from URL
  //   var filename = url.substring(url.lastIndexOf("/") + 1);

  //   fetch(url)
  //     .then((response) => {
  //       console.log(response);
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.blob();
  //     })
  //     .then(async (blob) => {
  //       // Create a temporary URL for the blob
  //       var blobUrl = window.URL.createObjectURL(blob);

  //       // Create a link element and set its attributes
  //       var link = document.createElement("a");
  //       link.href = blobUrl;

  //       // Set the download attribute to the extracted filename
  //       link.download = `/pages/${filename}`;

  //       // Append the link to the document body and trigger a click event
  //       document.body.appendChild(link);
  //       link.click();

  //       // Cleanup: remove the link and revoke the blob URL
  //       await document.body.removeChild(link);
  //       await window.URL.revokeObjectURL(blobUrl);
  //       return 1;
  //     })
  //     .catch((error) => {
  //       console.error("Error downloading image:", error);
  //       return 0;
  //     });
  // }

  // // Example usage
  // var imageUrl = "";
  // // downloadImage(imageUrl);

  // async function incrementWithPadding() {
  //   for (let i = 0; i < 5; i++) {
  //     var numberString = i.toString();

  //     // Calculate the padding length (3 digits maximum)
  //     var paddingLength = Math.max(0, 3 - numberString.length);

  //     // Generate the padded string
  //     var paddedString = "0".repeat(paddingLength) + numberString;
  //     await downloadImage(
  //       `https://app.quranflash.com/book/Urdu15/epub/EPUB/imgs/${paddedString}.png`
  //     );
  //   }
  // }

  return (
    <>
      <div className=""></div>
    </>
  );
};

export default Test;
