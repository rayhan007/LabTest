using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace LabTest.Data.Models
{
    [Table("Reading")]
    public class Reading
    {
        [Key]
        public Int16 BuildingId { get; set; }
        public Byte ObjectId { get; set; }
        public Byte DatafieldId { get; set; }
        public decimal Value { get; set; }
        public DateTime Timestamp { get; set; }

    }
}
