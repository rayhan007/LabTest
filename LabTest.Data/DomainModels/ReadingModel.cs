using LabTest.Data.Models;
using System;
using System.ComponentModel.DataAnnotations.Schema;


namespace LabTest.Data.DomainModels
{
    [NotMapped]
    public class ReadingModel : Reading
    {

        public DateTime TimestampFrom { get; set; }
        public DateTime TimestampTo { get; set; }

    }
}
