using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace LabTestWeb.Helpers
{
    public class BlobStorageConnectionString
    {
        public string UploadPhotoToStorage(Stream fileStream, string fileName)
        {

            string accountname = "esenderstorage";
            string imagecontainer = "upload/photo";

            Uri blobUri = new Uri("https://" + accountname + ".blob.core.windows.net/" + imagecontainer +
                                  "/" + fileName);

            var _blobServiceClient = new BlobServiceClient("DefaultEndpointsProtocol=https;AccountName=esenderstorage;AccountKey=nUybe4VnuEYaR9g9kriB5YRXVyMRJFMcIVLlWFFslr07/sNObyT1EdG3gQKfKhYuSmMaIyJ5BheXRbFBn+/Pwg==;EndpointSuffix=core.windows.net");

            var containerClient = _blobServiceClient.GetBlobContainerClient(imagecontainer);

            var blob = containerClient.GetBlobClient(fileName);

            var blobHttpHeader = new BlobHttpHeaders();

            blobHttpHeader.ContentType = "image/jpg";

            var uploadedBlob = blob.Upload(fileStream, blobHttpHeader);
            return blobUri.ToString();

        }
        public string UploadVideoToStorage(Stream fileStream, string fileName)
        {

            string accountname = "esenderstorage";
            string imagecontainer = "upload/video";

            Uri blobUri = new Uri("https://" + accountname + ".blob.core.windows.net/" + imagecontainer +
                                  "/" + fileName);

            var _blobServiceClient = new BlobServiceClient("DefaultEndpointsProtocol=https;AccountName=esenderstorage;AccountKey=nUybe4VnuEYaR9g9kriB5YRXVyMRJFMcIVLlWFFslr07/sNObyT1EdG3gQKfKhYuSmMaIyJ5BheXRbFBn+/Pwg==;EndpointSuffix=core.windows.net");

            var containerClient = _blobServiceClient.GetBlobContainerClient(imagecontainer);

            var blob = containerClient.GetBlobClient(fileName);

            var blobHttpHeader = new BlobHttpHeaders();

            //blobHttpHeader.ContentType = "image/mp4";

            var uploadedBlob = blob.Upload(fileStream, blobHttpHeader);
            return blobUri.ToString();

        }
    }
}
